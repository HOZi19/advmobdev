import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, CustomTheme } from '../types';
import { storage, StorageKeys } from '../../utils/storage';

const initialState: ThemeState = {
  mode: 'dark',
  customTheme: undefined,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeState['mode']>) => {
      state.mode = action.payload;
      storage.setItem(StorageKeys.THEME, state);
    },
    setCustomTheme: (state, action: PayloadAction<CustomTheme>) => {
      state.mode = 'custom';
      state.customTheme = action.payload;
      storage.setItem(StorageKeys.THEME, state);
    },
    loadTheme: (state, action: PayloadAction<ThemeState>) => {
      return action.payload;
    },
  },
});

export const { setThemeMode, setCustomTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;

