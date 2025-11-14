import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { DrawerActions } from "@react-navigation/native";

export default function HomePage() {
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={openDrawer}
          style={[styles.menuButton, { backgroundColor: theme.card }]}
        >
          <Ionicons name="menu" size={24} color={theme.text} />
        </TouchableOpacity>
        <Image
          source={require("@/assets/images/spotifylogo.webp")}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.text }]}>Good Evening Jose</Text>
      </View>

      {/* Recently Played */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recently Played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album1.webp")}

              style={styles.albumArt}
            />
            <Text style={[styles.cardText, { color: theme.text }]}>Chill Hits</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album2.webp")}
              style={styles.albumArt}
            />
            <Text style={[styles.cardText, { color: theme.text }]}>Top 50</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album3.webp")}
              style={styles.albumArt}
            />
            <Text style={[styles.cardText, { color: theme.text }]}>RapCaviar</Text>
          </View>
        </ScrollView>

        {/* Made for You */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Made for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album4 .webp")}
              style={styles.albumArt}
            />
            <Text style={[styles.cardText, { color: theme.text }]}>Daily Mix 1</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/album5.webp")}
              style={styles.albumArt}
            />
            <Text style={[styles.cardText, { color: theme.text }]}>Daily Mix 2</Text>
          </View>
        </ScrollView>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: theme.card }]}
            onPress={() => router.push("/camera" as any)}
          >
            <Ionicons name="camera" size={32} color={theme.primary} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: theme.card }]}
            onPress={() => router.push("/map" as any)}
          >
            <Ionicons name="map" size={32} color={theme.primary} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { borderTopColor: theme.border }]}>
        <TouchableOpacity>
          <Text style={[styles.navText, { color: theme.text }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.navText, { color: theme.text }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.navText, { color: theme.text }]}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logo: { width: 32, height: 32, marginRight: 10, resizeMode: "contain" },
  title: { fontSize: 22, fontWeight: "bold", flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  card: { marginRight: 15, width: 120, alignItems: "center" },
  albumArt: { width: 120, height: 120, borderRadius: 8 },
  cardText: { marginTop: 8, fontSize: 14, textAlign: "center" },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 15,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
  },
  navText: { fontSize: 14 },
});
