import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme, useThemeMode } from '@/hooks/useTheme';
import { setThemeMode, setCustomTheme, loadTheme } from '@/store/slices/themeSlice';
import { storage, StorageKeys } from '@/utils/storage';
import { ThemeState, CustomTheme } from '@/store/types';

const PRESET_THEMES: CustomTheme[] = [
  {
    primary: '#1DB954',
    secondary: '#191414',
    background: '#121212',
    text: '#FFFFFF',
    accent: '#1DB954',
  },
  {
    primary: '#FF6B6B',
    secondary: '#2D3436',
    background: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#FF6B6B',
  },
  {
    primary: '#4ECDC4',
    secondary: '#2C3E50',
    background: '#1E1E1E',
    text: '#FFFFFF',
    accent: '#4ECDC4',
  },
];

export const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme);
  const theme = useTheme();
  const themeMode = useThemeMode();
  const backgroundColor = useSharedValue(0);

  useEffect(() => {
    const loadSavedTheme = async () => {
      const saved = await storage.getItem<ThemeState>(StorageKeys.THEME);
      if (saved) {
        dispatch(loadTheme(saved));
      }
    };
    loadSavedTheme();
  }, [dispatch]);

  useEffect(() => {
    if (themeState.mode === 'light') {
      backgroundColor.value = withTiming(0, { duration: 500 });
    } else if (themeState.mode === 'dark') {
      backgroundColor.value = withTiming(1, { duration: 500 });
    } else if (themeState.mode === 'custom' && themeState.customTheme) {
      backgroundColor.value = withTiming(2, { duration: 500 });
    }
  }, [themeState]);

  const animatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      backgroundColor.value,
      [0, 1, 2],
      ['#FFFFFF', '#121212', themeState.customTheme?.background || '#121212']
    );
    return {
      backgroundColor: bgColor,
    };
  });

  const handleThemeChange = (mode: ThemeState['mode']) => {
    dispatch(setThemeMode(mode));
  };

  const handleCustomTheme = (customTheme: CustomTheme) => {
    dispatch(setCustomTheme(customTheme));
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Theme Settings
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Theme Mode
        </Text>
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              { backgroundColor: theme.card, borderColor: theme.border },
              themeMode === 'light' && { borderColor: theme.primary, borderWidth: 2 },
            ]}
            onPress={() => handleThemeChange('light')}
          >
            <Ionicons
              name="sunny"
              size={24}
              color={themeMode === 'light' ? theme.primary : theme.textSecondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                { color: themeMode === 'light' ? theme.primary : theme.textSecondary },
              ]}
            >
              Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              { backgroundColor: theme.card, borderColor: theme.border },
              themeMode === 'dark' && { borderColor: theme.primary, borderWidth: 2 },
            ]}
            onPress={() => handleThemeChange('dark')}
          >
            <Ionicons
              name="moon"
              size={24}
              color={themeMode === 'dark' ? theme.primary : theme.textSecondary}
            />
            <Text
              style={[
                styles.modeButtonText,
                { color: themeMode === 'dark' ? theme.primary : theme.textSecondary },
              ]}
            >
              Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Custom Themes
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsContainer}>
          {PRESET_THEMES.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.presetButton,
                { backgroundColor: theme.card, borderColor: theme.border },
                themeMode === 'custom' &&
                  themeState.customTheme?.accent === preset.accent &&
                  { borderColor: theme.primary, borderWidth: 2 },
              ]}
              onPress={() => handleCustomTheme(preset)}
            >
              <View
                style={[
                  styles.presetColor,
                  { backgroundColor: preset.accent },
                ]}
              />
              <Text
                style={[
                  styles.presetText,
                  { color: theme.text },
                ]}
              >
                Theme {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  presetsContainer: {
    marginTop: 8,
  },
  presetButton: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 100,
  },
  presetColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

