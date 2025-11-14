import { useReducer, useEffect, useCallback } from 'react';
import { PlaylistState, Song } from '../store/types';
import { storage, StorageKeys } from '../utils/storage';

type PlaylistAction =
  | { type: 'ADD_SONG'; payload: Song }
  | { type: 'REMOVE_SONG'; payload: string }
  | { type: 'CLEAR_PLAYLIST' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'LOAD_PLAYLIST'; payload: PlaylistState };

const initialState: PlaylistState = {
  songs: [],
  history: {
    past: [],
    future: [],
  },
};

function playlistReducer(state: PlaylistState, action: PlaylistAction): PlaylistState {
  switch (action.type) {
    case 'ADD_SONG': {
      const newSongs = [...state.songs, action.payload];
      return {
        songs: newSongs,
        history: {
          past: [...state.history.past, state.songs],
          future: [],
        },
      };
    }
    case 'REMOVE_SONG': {
      const newSongs = state.songs.filter((song) => song.id !== action.payload);
      return {
        songs: newSongs,
        history: {
          past: [...state.history.past, state.songs],
          future: [],
        },
      };
    }
    case 'CLEAR_PLAYLIST': {
      return {
        songs: [],
        history: {
          past: [...state.history.past, state.songs],
          future: [],
        },
      };
    }
    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      return {
        songs: previous,
        history: {
          past: newPast,
          future: [state.songs, ...state.history.future],
        },
      };
    }
    case 'REDO': {
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      return {
        songs: next,
        history: {
          past: [...state.history.past, state.songs],
          future: newFuture,
        },
      };
    }
    case 'LOAD_PLAYLIST': {
      return action.payload;
    }
    default:
      return state;
  }
}

export function usePlaylist() {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  useEffect(() => {
    const loadPlaylist = async () => {
      const saved = await storage.getItem<PlaylistState>(StorageKeys.PLAYLIST);
      if (saved) {
        dispatch({ type: 'LOAD_PLAYLIST', payload: saved });
      }
    };
    loadPlaylist();
  }, []);

  useEffect(() => {
    storage.setItem(StorageKeys.PLAYLIST, state);
  }, [state]);

  const addSong = useCallback((song: Song) => {
    dispatch({ type: 'ADD_SONG', payload: song });
  }, []);

  const removeSong = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_SONG', payload: id });
  }, []);

  const clearPlaylist = useCallback(() => {
    dispatch({ type: 'CLEAR_PLAYLIST' });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  return {
    songs: state.songs,
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0,
    addSong,
    removeSong,
    clearPlaylist,
    undo,
    redo,
  };
}

