import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          drawerStyle: {
            backgroundColor: theme.card,
            width: 280,
          },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.textSecondary,
          drawerLabelStyle: {
            color: theme.text,
            fontSize: 16,
            fontWeight: "500",
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginHorizontal: 12,
            marginVertical: 4,
          },
          drawerActiveBackgroundColor: theme.surface,
          swipeEnabled: true,
          swipeEdgeWidth: 250,
          overlayColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Drawer.Screen
          name="homepage"
          options={{
            drawerLabel: "Home",
            title: "Homepage",
            drawerIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="playlist"
          options={{
            drawerLabel: "Playlists",
            title: "Your Playlists",
            drawerIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
              <Ionicons name={focused ? "musical-notes" : "musical-notes-outline"} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Your Profile",
            drawerIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "App Settings",
            drawerIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
              <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
