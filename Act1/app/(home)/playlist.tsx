import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { usePlaylist } from '@/hooks/usePlaylist';
import { SongItem } from '@/components/playlist/SongItem';
import { Song } from '@/store/types';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export default function Playlist() {
  const theme = useTheme();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const { songs, canUndo, canRedo, addSong, removeSong, clearPlaylist, undo, redo } = usePlaylist();
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');

  const handleAddSong = () => {
    if (songTitle.trim() && artistName.trim()) {
      const newSong: Song = {
        id: Date.now().toString(),
        title: songTitle.trim(),
        artist: artistName.trim(),
        duration: '3:45',
      };
      addSong(newSong);
      setSongTitle('');
      setArtistName('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={openDrawer}
            style={[styles.menuButton, { backgroundColor: theme.card }]}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.text }]}>My Playlist</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{songs.length} songs</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              placeholder="Song Title"
              placeholderTextColor={theme.textSecondary}
              value={songTitle}
              onChangeText={setSongTitle}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              placeholder="Artist"
              placeholderTextColor={theme.textSecondary}
              value={artistName}
              onChangeText={setArtistName}
            />
          </View>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={handleAddSong}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Song</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.card }, !canUndo && styles.actionButtonDisabled]}
            onPress={undo}
            disabled={!canUndo}
          >
            <Ionicons name="arrow-undo" size={20} color={canUndo ? theme.text : theme.textSecondary} />
            <Text style={[styles.actionButtonText, { color: canUndo ? theme.text : theme.textSecondary }]}>
              Undo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.card }, !canRedo && styles.actionButtonDisabled]}
            onPress={redo}
            disabled={!canRedo}
          >
            <Ionicons name="arrow-redo" size={20} color={canRedo ? theme.text : theme.textSecondary} />
            <Text style={[styles.actionButtonText, { color: canRedo ? theme.text : theme.textSecondary }]}>
              Redo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.card }]} onPress={clearPlaylist}>
            <Ionicons name="trash" size={20} color="#ff4444" />
            <Text style={[styles.actionButtonText, { color: '#ff4444' }]}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.playlistContainer} showsVerticalScrollIndicator={false}>
          {songs.length === 0 ? (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.emptyContainer}
            >
              <Ionicons name="musical-notes-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.text }]}>Your playlist is empty</Text>
              <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>Add songs to get started</Text>
            </Animated.View>
          ) : (
            songs.map((song, index) => (
              <SongItem key={song.id} song={song} onRemove={removeSong} index={index} />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  playlistContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
