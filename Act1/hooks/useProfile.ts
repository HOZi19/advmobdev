import { useState, useEffect, useCallback } from 'react';
import { ProfileState } from '../store/types';
import { storage, StorageKeys } from '../utils/storage';

const GENRES = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop'] as const;

export type Genre = typeof GENRES[number];

interface ValidationErrors {
  username?: string;
  email?: string;
  genre?: string;
}

export function useProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState<Genre | ''>('');
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const saved = await storage.getItem<ProfileState & { profileImageUri?: string }>(StorageKeys.PROFILE);
      if (saved && !saved.isValid) {
        setUsername(saved.username || '');
        setEmail(saved.email || '');
        setFavoriteGenre((saved.favoriteGenre as Genre) || '');
        setProfileImageUri(saved.profileImageUri || null);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const saveProfile = async () => {
      if (username || email || favoriteGenre || profileImageUri) {
        await storage.setItem<ProfileState & { profileImageUri?: string }>(StorageKeys.PROFILE, {
          username,
          email,
          favoriteGenre: favoriteGenre as string,
          isValid: false,
          profileImageUri: profileImageUri || undefined,
        });
      }
    };
    saveProfile();
  }, [username, email, favoriteGenre, profileImageUri]);

  const validateUsername = useCallback((value: string): string | undefined => {
    if (!value) return undefined;
    if (value.length < 3 || value.length > 20) {
      return 'Username must be 3-20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return undefined;
  }, []);

  const validateEmail = useCallback((value: string): string | undefined => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  }, []);

  const validateGenre = useCallback((value: string): string | undefined => {
    if (!value) return undefined;
    if (!GENRES.includes(value as Genre)) {
      return 'Please select a valid genre';
    }
    return undefined;
  }, []);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const genreError = validateGenre(favoriteGenre);

    if (usernameError) newErrors.username = usernameError;
    if (emailError) newErrors.email = emailError;
    if (genreError) newErrors.genre = genreError;

    setErrors(newErrors);
    const valid = !usernameError && !emailError && !genreError && username && email && favoriteGenre;
    setIsValid(valid);

    if (!valid) {
      triggerShake();
    }

    return valid;
  }, [username, email, favoriteGenre, validateUsername, validateEmail, validateGenre, triggerShake]);

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      await storage.setItem<ProfileState & { profileImageUri?: string }>(StorageKeys.PROFILE, {
        username,
        email,
        favoriteGenre: favoriteGenre as string,
        isValid: true,
        profileImageUri: profileImageUri || undefined,
      });
      return true;
    }
    return false;
  }, [username, email, favoriteGenre, profileImageUri, validateForm]);

  return {
    username,
    email,
    favoriteGenre,
    profileImageUri,
    errors,
    isValid,
    isShaking,
    genres: GENRES,
    setUsername,
    setEmail,
    setFavoriteGenre,
    setProfileImageUri,
    validateForm,
    handleSubmit,
  };
}

