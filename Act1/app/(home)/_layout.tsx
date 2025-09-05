import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#000" },
        drawerLabelStyle: { color: "#fff" },
      }}
    >
      <Drawer.Screen
        name="homepage"
        options={{
          drawerLabel: "Home",
          title: "Homepage",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Your Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "App Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
