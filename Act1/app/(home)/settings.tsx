import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const theme = useTheme();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={openDrawer}
            style={[styles.menuButton, { backgroundColor: theme.card }]}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>⚙️ Settings</Text>
        </View>
        <ThemeSwitcher />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },
});
