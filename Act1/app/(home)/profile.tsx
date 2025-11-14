import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from '@/hooks/useProfile';
import { ProfilePreview } from '@/components/profile/ProfilePreview';
import { AnimatedInput } from '@/components/profile/AnimatedInput';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export default function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const {
    username,
    email,
    favoriteGenre,
    profileImageUri,
    errors,
    isShaking,
    genres,
    setUsername,
    setEmail,
    setFavoriteGenre,
    setProfileImageUri,
    handleSubmit,
  } = useProfile();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'Please grant permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'Please grant permission to use the camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Remove', onPress: () => setProfileImageUri(null), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      // Show success message or navigate
      console.log('Profile saved successfully!');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={openDrawer}
              style={[styles.menuButton, { backgroundColor: theme.card }]}
            >
              <Ionicons name="menu" size={24} color={theme.text} />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={[styles.title, { color: theme.text }]}>Create Profile</Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Fill in your details</Text>
            </View>
          </View>

          <View style={styles.previewContainer}>
            <ProfilePreview
              username={username}
              email={email}
              genre={favoriteGenre}
              profileImageUri={profileImageUri}
            />
            <TouchableOpacity style={[styles.imageButton, { backgroundColor: theme.primary }]} onPress={showImageOptions}>
              <Ionicons name="camera" size={20} color="#fff" />
              <Text style={styles.imageButtonText}>
                {profileImageUri ? 'Change Photo' : 'Add Photo'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <AnimatedInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              error={errors.username}
              isShaking={isShaking && !!errors.username}
            />

            <AnimatedInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              error={errors.email}
              isShaking={isShaking && !!errors.email}
              keyboardType="email-address"
            />

            <View style={styles.genreContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Favorite Genre</Text>
              <View style={styles.genreGrid}>
                {genres.map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    style={[
                      styles.genreButton,
                      { backgroundColor: theme.card, borderColor: theme.border },
                      favoriteGenre === genre && { backgroundColor: theme.primary, borderColor: theme.primary },
                    ]}
                    onPress={() => setFavoriteGenre(genre)}
                  >
                    <Text
                      style={[
                        styles.genreButtonText,
                        { color: favoriteGenre === genre ? '#fff' : theme.textSecondary },
                      ]}
                    >
                      {genre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.genre && (
                <Animated.View entering={FadeIn} style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.genre}</Text>
                </Animated.View>
              )}
            </View>

            <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleFormSubmit}>
              <Text style={styles.submitButtonText}>Save Profile</Text>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  genreContainer: {
    marginBottom: 24,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  genreButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    marginTop: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  previewContainer: {
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    gap: 8,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
