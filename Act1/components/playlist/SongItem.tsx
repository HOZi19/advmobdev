import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import { Song } from '../../store/types';
import { useTheme } from '../../hooks/useTheme';

interface SongItemProps {
  song: Song;
  onRemove: (id: string) => void;
  index: number;
}

export const SongItem: React.FC<SongItemProps> = React.memo(({ song, onRemove, index }) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    setTimeout(() => onRemove(song.id), 150);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      exiting={FadeOutUp.duration(300)}
      style={[styles.container, { backgroundColor: theme.card }, animatedStyle]}
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={[styles.artist, { color: theme.textSecondary }]} numberOfLines={1}>
            {song.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.removeButton}>
          <Ionicons name="close-circle" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

SongItem.displayName = 'SongItem';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 4,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
  },
});

