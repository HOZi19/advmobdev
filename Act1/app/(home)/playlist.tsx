import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Playlist() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎶 Your Playlists</Text>
      <Text style={styles.subText}>All your saved playlists appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  subText: { color: "#aaa", marginTop: 10 },
});
