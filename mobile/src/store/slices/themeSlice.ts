import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '../../types';
import { storage } from '../../utils/storage';

interface ThemeState {
  mode: ThemeMode;
  isLoaded: boolean;
}

const initialState: ThemeState = {
  mode: 'light',
  isLoaded: false,
};

// Async thunk to load persisted theme
export const loadSavedTheme = createAsyncThunk('theme/loadSavedTheme', async () => {
  const saved = await storage.getTheme();
  return saved || 'light';
});

// Async thunk to set and persist theme
export const switchTheme = createAsyncThunk('theme/switchTheme', async (newMode: ThemeMode) => {
  await storage.setTheme(newMode);
  return newMode;
});

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const nextMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = nextMode;
      storage.setTheme(nextMode);
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      storage.setTheme(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedTheme.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.isLoaded = true;
      })
      .addCase(switchTheme.fulfilled, (state, action) => {
        state.mode = action.payload;
      });
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
