import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  optionText: { color: "#fff", fontSize: 16 },
});
