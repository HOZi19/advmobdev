import React from "react";
import { View, Text, Button, Image, ScrollView, StyleSheet, Alert } from "react-native";

export default function ComponentShowcase() {
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={true}
    >
      
      <Image
        source={require("@/assets/images/image.png")}
        style={styles.coverPhoto}
      />

      
      <Text style={styles.heading}>✨ Component Showcase ✨</Text>

      
      <Text style={styles.paragraph}>
        This screen demonstrates the use of Text, Button, ScrollView, and Image of DPWH Contractor. 
      </Text>

      
      <View style={styles.buttonContainer}>
        <Button
          title="Click here"
          color="#1E90FF"
          onPress={() => Alert.alert("✅ Success!!")}
        />
      </View>

      {/* Scrollable Items */}
      <Text style={styles.subHeading}>📜 Scroll lists below:</Text>
      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.scrollItem}>
          <Text style={styles.scrollText}>List {i + 1}</Text>
        </View>
      ))}

      {/* Giphy at bottom */}
      <Text style={styles.subHeading}> GIF:</Text>
      <Image
        source={{ uri: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzA1ZGNmMnNwZzBiNWFnMnB5NmRtdW4xbm9vcWJiNHRkMm15NDJtNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1KVboXQeiaX7FHgI/giphy.gif" }}
        style={styles.gif}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f7ff",
    padding: 16,
  },
  coverPhoto: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#003366",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#004080",
    textAlign: "left",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  scrollText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  gif: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 12,
  },
});
