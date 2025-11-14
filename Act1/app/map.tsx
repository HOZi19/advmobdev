import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

const { width, height } = Dimensions.get('window');

interface POI {
  id: string;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const MOCK_POIS: POI[] = [
  {
    id: '1',
    title: 'Music Store',
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
  },
  {
    id: '2',
    title: 'Concert Hall',
    coordinate: { latitude: 37.78425, longitude: -122.4094 },
  },
  {
    id: '3',
    title: 'Recording Studio',
    coordinate: { latitude: 37.79225, longitude: -122.4184 },
  },
];

const GEOFENCE_RADIUS = 100; // meters

export default function MapScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapStyle, setMapStyle] = useState<'roadmap' | 'satellite'>('roadmap');
  const [geofenceAlerts, setGeofenceAlerts] = useState<Set<string>>(new Set());
  const [showPOIs, setShowPOIs] = useState(true);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          checkGeofence(newLocation);
          updateMapLocation(newLocation);
        }
      );
    })();
  }, []);

  const updateMapLocation = (userLocation: Location.LocationObject) => {
    if (webViewRef.current && userLocation) {
      const lat = userLocation.coords.latitude;
      const lng = userLocation.coords.longitude;
      const script = `
        if (window.map && window.userMarker) {
          window.map.setView([${lat}, ${lng}], window.map.getZoom());
          window.userMarker.setLatLng([${lat}, ${lng}]);
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const checkGeofence = React.useCallback((userLocation: Location.LocationObject) => {
    MOCK_POIS.forEach((poi) => {
      const distance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        poi.coordinate.latitude,
        poi.coordinate.longitude
      );

      setGeofenceAlerts((prev) => {
        const hasAlert = prev.has(poi.id);
        if (distance <= GEOFENCE_RADIUS && !hasAlert) {
          Alert.alert('Geofence Alert', `You entered the area: ${poi.title}`);
          return new Set(prev).add(poi.id);
        } else if (distance > GEOFENCE_RADIUS && hasAlert) {
          Alert.alert('Geofence Alert', `You left the area: ${poi.title}`);
          const newSet = new Set(prev);
          newSet.delete(poi.id);
          return newSet;
        }
        return prev;
      });
    });
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const toggleMapStyle = () => {
    setMapStyle((prev) => {
      const newStyle = prev === 'roadmap' ? 'satellite' : 'roadmap';
      if (webViewRef.current) {
        // Switch between standard and satellite-like tiles
        const tileUrl = newStyle === 'satellite' 
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const script = `
          if (window.map) {
            window.map.eachLayer((layer) => {
              if (layer instanceof L.TileLayer) {
                window.map.removeLayer(layer);
              }
            });
            L.tileLayer('${tileUrl}', {
              maxZoom: 19,
              attribution: '© OpenStreetMap'
            }).addTo(window.map);
          }
        `;
        webViewRef.current.injectJavaScript(script);
      }
      return newStyle;
    });
  };

  const centerOnUser = () => {
    if (location) {
      updateMapLocation(location);
    }
  };

  const getGoogleMapsHTML = () => {
    const lat = location?.coords.latitude || 37.78825;
    const lng = location?.coords.longitude || -122.4324;
    
    // Use OpenStreetMap with Leaflet (free, no API key needed) styled like Google Maps
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body, html { width: 100%; height: 100%; overflow: hidden; }
            #map { width: 100%; height: 100vh; }
            .custom-marker {
              background-color: #1DB954;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .poi-marker {
              background-color: #ff4444;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            let map;
            let userMarker;
            let poiMarkers = [];
            
            function initMap() {
              map = L.map('map', {
                center: [${lat}, ${lng}],
                zoom: 15,
                zoomControl: true,
                attributionControl: false
              });

              // Use OpenStreetMap tiles (Google Maps-like style)
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
              }).addTo(map);

              // User location marker
              const userIcon = L.divIcon({
                className: 'custom-marker',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              });
              
              userMarker = L.marker([${lat}, ${lng}], { icon: userIcon })
                .addTo(map)
                .bindPopup('Your Location')
                .openPopup();

              // POI markers
              const pois = [
                { lat: 37.78825, lng: -122.4324, title: 'Music Store' },
                { lat: 37.78425, lng: -122.4094, title: 'Concert Hall' },
                { lat: 37.79225, lng: -122.4184, title: 'Recording Studio' }
              ];
              
              pois.forEach((poi) => {
                const poiIcon = L.divIcon({
                  className: 'poi-marker',
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                });
                
                const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
                  .addTo(map)
                  .bindPopup(poi.title);
                poiMarkers.push(marker);
              });

              // Store map reference for updates
              window.map = map;
              window.userMarker = userMarker;
            }
            
            initMap();
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.card }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Map</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.card }]} onPress={toggleMapStyle}>
            <Ionicons name="layers" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.card }]} onPress={centerOnUser}>
            <Ionicons name="locate" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: theme.card }]}
            onPress={() => setShowPOIs(!showPOIs)}
          >
            <Ionicons name={showPOIs ? 'eye' : 'eye-off'} size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapContainer}>
        {location ? (
          <WebView
            ref={webViewRef}
            source={{ html: getGoogleMapsHTML() }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        ) : (
          <View style={[styles.mapFallback, { backgroundColor: theme.card }]}>
            <Ionicons name="map-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.fallbackText, { color: theme.text }]}>Loading location...</Text>
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: theme.card }]} onPress={centerOnUser}>
          <Ionicons name="locate" size={20} color={theme.text} />
          <Text style={[styles.controlButtonText, { color: theme.text }]}>My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: theme.card }]} onPress={toggleMapStyle}>
          <Ionicons name="layers" size={20} color={theme.text} />
          <Text style={[styles.controlButtonText, { color: theme.text }]}>
            {mapStyle === 'roadmap' ? 'Satellite' : 'Map'}
          </Text>
        </TouchableOpacity>
      </View>

      {location && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.locationInfo, { backgroundColor: theme.card }]}>
          <View style={styles.locationHeader}>
            <Ionicons name="location" size={16} color={theme.primary} />
            <Text style={[styles.locationTitle, { color: theme.primary }]}>Your Location</Text>
          </View>
          <Text style={[styles.locationText, { color: theme.text }]}>
            Lat: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={[styles.locationText, { color: theme.text }]}>
            Lng: {location.coords.longitude.toFixed(6)}
          </Text>
          {location.coords.accuracy && (
            <Text style={[styles.accuracyText, { color: theme.textSecondary }]}>
              Accuracy: {Math.round(location.coords.accuracy)}m
            </Text>
          )}
        </Animated.View>
      )}

      <ScrollView style={styles.poiContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.poiTitle, { color: theme.text }]}>Points of Interest</Text>
        {MOCK_POIS.map((poi) => {
          const distance = location
            ? calculateDistance(
                location.coords.latitude,
                location.coords.longitude,
                poi.coordinate.latitude,
                poi.coordinate.longitude
              )
            : null;
          return (
            <View key={poi.id} style={[styles.poiItem, { backgroundColor: theme.card }]}>
              <Ionicons
                name={geofenceAlerts.has(poi.id) ? 'location' : 'location-outline'}
                size={20}
                color={geofenceAlerts.has(poi.id) ? theme.primary : theme.textSecondary}
              />
              <View style={styles.poiInfo}>
                <Text style={[styles.poiName, { color: theme.text }]}>{poi.title}</Text>
                {distance !== null && (
                  <Text style={[styles.poiDistance, { color: theme.textSecondary }]}>
                    {distance < 1000
                      ? `${Math.round(distance)}m away`
                      : `${(distance / 1000).toFixed(2)}km away`}
                  </Text>
                )}
              </View>
              {geofenceAlerts.has(poi.id) && (
                <View style={[styles.alertBadge, { backgroundColor: theme.primary }]}>
                  <Text style={styles.alertText}>Nearby</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  map: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  fallbackText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationInfo: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  accuracyText: {
    fontSize: 10,
    marginTop: 4,
  },
  poiContainer: {
    maxHeight: 200,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  poiTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  poiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  poiInfo: {
    flex: 1,
  },
  poiName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  poiDistance: {
    fontSize: 12,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});
