import { useAppSelector } from './useAppSelector';
import { ThemeMode, CustomTheme } from '../store/types';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  card: string;
}

const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#1DB954',
  border: '#E0E0E0',
  card: '#FFFFFF',
};

const darkTheme: ThemeColors = {
  background: '#000000',
  surface: '#121212',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  primary: '#1DB954',
  border: '#333333',
  card: '#1A1A1A',
};

const getCustomThemeColors = (customTheme: CustomTheme): ThemeColors => {
  return {
    background: customTheme.background,
    surface: customTheme.secondary,
    text: customTheme.text,
    textSecondary: customTheme.text + 'CC', // 80% opacity
    primary: customTheme.accent,
    border: customTheme.secondary,
    card: customTheme.secondary,
  };
};

export const useTheme = (): ThemeColors => {
  const themeState = useAppSelector((state) => state.theme);

  switch (themeState.mode) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'custom':
      if (themeState.customTheme) {
        return getCustomThemeColors(themeState.customTheme);
      }
      return darkTheme; // fallback
    default:
      return darkTheme;
  }
};

export const useThemeMode = (): ThemeMode => {
  const themeState = useAppSelector((state) => state.theme);
  return themeState.mode;
};

