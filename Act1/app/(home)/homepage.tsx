import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// --- Spotify Home Screen ---
function SpotifyHome() {
  return (
    <LinearGradient
      colors={["#121212", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/spotifylogo.webp")}
          style={styles.logo}
        />
        <Text style={styles.title}>Good Evening</Text>
      </View>

      {/* Recently Played */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album1.webp")}
              style={styles.albumArt}
            />
            <Text style={styles.cardText}>Chill Hits</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album2.webp")}
              style={styles.albumArt}
            />
            <Text style={styles.cardText}>Top 50</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album3.webp")}
              style={styles.albumArt}
            />
            <Text style={styles.cardText}>RapCaviar</Text>
          </View>
        </ScrollView>

        {/* Made for You */}
        <Text style={styles.sectionTitle}>Made for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album4 .webp")}
              style={styles.albumArt}
            />
            <Text style={styles.cardText}>Daily Mix 1</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album5.webp")}
              style={styles.albumArt}
            />
            <Text style={styles.cardText}>Daily Mix 2</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// --- Custom Drawer ---
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#000" }}>
      {/* Profile Section */}
      <View style={styles.drawerHeader}>
        <Image
          source={require("@/assets/images/album1.webp")} // avatar
          style={styles.avatar}
        />
        <Text style={styles.drawerName}>John Doe</Text>
        <Text style={styles.drawerEmail}>johndoe@email.com</Text>
      </View>

      {/* Links */}
      <View style={styles.drawerItems}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("Spotify Home")}>
          <Text style={styles.drawerText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("Playlist")}>
          <Text style={styles.drawerText}>🎵 Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("Profile")}>
          <Text style={styles.drawerText}>👤 Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate("Settings")}>
          <Text style={styles.drawerText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// --- Drawer Setup ---
const Drawer = createDrawerNavigator();

export default function HomePage() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          drawerStyle: { backgroundColor: "#000" },
        }}
      >
        <Drawer.Screen name="Spotify Home" component={SpotifyHome} />
        <Drawer.Screen name="Playlist" component={require("./playlist").default} />
        <Drawer.Screen name="Profile" component={require("./profile").default} />
        <Drawer.Screen name="Settings" component={require("./settings").default} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  logo: { width: 32, height: 32, marginRight: 10, resizeMode: "contain" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginVertical: 15 },
  card: { marginRight: 15, width: 120, alignItems: "center" },
  albumArt: { width: 120, height: 120, borderRadius: 8 },
  cardText: { color: "#fff", marginTop: 8, fontSize: 14, textAlign: "center" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  navText: { color: "#fff", fontSize: 14 },
  screenContainer: { flex: 1, backgroundColor: "#121212", alignItems: "center", justifyContent: "center" },
  screenText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  // Drawer
  drawerHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  drawerName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  drawerEmail: { color: "#aaa", fontSize: 14 },
  drawerItems: { marginTop: 20, paddingHorizontal: 15 },
  drawerItem: { paddingVertical: 12 },
  drawerText: { color: "#fff", fontSize: 16 },
});
