import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/store/store';
import { loadTheme } from '@/store/slices/themeSlice';
import { storage, StorageKeys } from '@/utils/storage';
import { ThemeState } from '@/store/types';

function ThemeLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSavedTheme = async () => {
      const saved = await storage.getItem<ThemeState>(StorageKeys.THEME);
      if (saved) {
        dispatch(loadTheme(saved));
      }
    };
    loadSavedTheme();
  }, [dispatch]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeLoader />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} />
          <Stack.Screen name="camera" options={{ headerShown: false }} />
          <Stack.Screen name="map" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
