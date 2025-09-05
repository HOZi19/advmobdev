import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/album1.webp")}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@email.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  email: { color: "#aaa", fontSize: 16 },
});
