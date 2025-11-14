export interface Song {
  id: string;
  title: string;
  artist: string;
  duration?: string;
}

export interface PlaylistState {
  songs: Song[];
  history: {
    past: Song[][];
    future: Song[][];
  };
}

export interface ProfileState {
  username: string;
  email: string;
  favoriteGenre: string;
  isValid: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'custom';

export interface CustomTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface ThemeState {
  mode: ThemeMode;
  customTheme?: CustomTheme;
}

