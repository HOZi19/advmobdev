import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Genre } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';

interface ProfilePreviewProps {
  username: string;
  email: string;
  genre: Genre | '';
  profileImageUri?: string | null;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = React.memo(
  ({ username, email, genre, profileImageUri }) => {
    const theme = useTheme();
    if (!username && !email && !genre && !profileImageUri) {
      return null;
    }

    const imageSource = profileImageUri
      ? { uri: profileImageUri }
      : genre
      ? { uri: `https://via.placeholder.com/100?text=${encodeURIComponent(genre)}` }
      : { uri: 'https://via.placeholder.com/100?text=Profile' };

    return (
      <Animated.View entering={FadeIn.duration(300)} style={[styles.container, { backgroundColor: theme.card }]}>
        <Image source={imageSource} style={[styles.avatar, { backgroundColor: theme.border }]} />
        <Text style={[styles.name, { color: theme.text }]}>{username || 'Username'}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>{email || 'email@example.com'}</Text>
        {genre && (
          <View style={[styles.genreBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        )}
      </Animated.View>
    );
  }
);

ProfilePreview.displayName = 'ProfilePreview';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  genreBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

