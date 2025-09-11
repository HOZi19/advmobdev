import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
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
        <Text style={styles.title}>Good Evening Jose</Text>
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
});
