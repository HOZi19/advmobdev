import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');

type FilterType = 'none' | 'grayscale' | 'sepia';

export default function CameraScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [filter, setFilter] = useState<FilterType>('none');
  const [filterIntensity, setFilterIntensity] = useState(1);
  const [rotation, setRotation] = useState(0);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.permissionText, { color: theme.text }]}>We need your permission to use the camera</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          let manipulatedImage = photo;

          // Apply rotation if needed
          if (rotation !== 0) {
            manipulatedImage = await ImageManipulator.manipulateAsync(
              photo.uri,
              [{ rotate: rotation }],
              { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
          }

          // Request media library permission if needed (only photos, not audio)
          try {
            if (!mediaPermission?.granted) {
              const { status } = await MediaLibrary.requestPermissionsAsync({
                accessPrivileges: 'addOnly',
                writeOnly: true,
              });
              if (status !== 'granted') {
                Alert.alert(
                  'Permission Needed',
                  'Please grant permission to save photos to your gallery.',
                  [
                    { text: 'OK' },
                    {
                      text: 'Share Instead',
                      onPress: () => {
                        if (shareAsync) {
                          shareAsync(manipulatedImage.uri);
                        }
                      },
                    },
                  ]
                );
                return;
              }
            }

            // Save to media library
            await MediaLibrary.createAssetAsync(manipulatedImage.uri);
            Alert.alert('Success', 'Photo saved to gallery!', [{ text: 'OK' }]);
          } catch (saveError) {
            // Fallback: offer to share the image
            console.log('Save error, offering share:', saveError);
            Alert.alert(
              'Save Photo',
              'Would you like to share this photo?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Share',
                  onPress: async () => {
                    try {
                      if (await shareAsync.isAvailableAsync()) {
                        await shareAsync(manipulatedImage.uri);
                      } else {
                        Alert.alert('Info', 'Photo captured! URI: ' + manipulatedImage.uri.substring(0, 50) + '...');
                      }
                    } catch (shareError) {
                      Alert.alert('Info', 'Photo captured successfully!');
                    }
                  },
                },
              ]
            );
          }
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', `Failed to take picture: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: 'None', value: 'none' },
    { label: 'Grayscale', value: 'grayscale' },
    { label: 'Sepia', value: 'sepia' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.card }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Camera</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mode="picture"
        >
          <View style={styles.overlay}>
            <View style={styles.filterContainer}>
              {filters.map((f) => (
                <TouchableOpacity
                  key={f.value}
                  style={[
                    styles.filterButton,
                    { backgroundColor: theme.card, borderColor: theme.border },
                    filter === f.value && { backgroundColor: theme.primary, borderColor: theme.primary },
                  ]}
                  onPress={() => setFilter(f.value)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      { color: filter === f.value ? '#fff' : theme.text },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </CameraView>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: theme.card }]} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={32} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={[styles.captureButtonInner, { backgroundColor: theme.primary }]} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, { backgroundColor: theme.card }]} onPress={rotateImage}>
          <Ionicons name="refresh" size={32} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.intensityContainer}>
        <Text style={[styles.intensityLabel, { color: theme.text }]}>Filter Intensity</Text>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={[styles.sliderButton, { backgroundColor: theme.card }]}
            onPress={() => setFilterIntensity(Math.max(0, filterIntensity - 0.1))}
          >
            <Ionicons name="remove" size={20} color={theme.text} />
          </TouchableOpacity>
          <View style={[styles.sliderTrack, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.sliderFill,
                { width: `${filterIntensity * 100}%`, backgroundColor: theme.primary },
              ]}
            />
          </View>
          <TouchableOpacity
            style={[styles.sliderButton, { backgroundColor: theme.card }]}
            onPress={() => setFilterIntensity(Math.min(1, filterIntensity + 0.1))}
          >
            <Ionicons name="add" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.intensityValue, { color: theme.textSecondary }]}>{Math.round(filterIntensity * 100)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  intensityContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  intensityLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
  },
  sliderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensityValue: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

