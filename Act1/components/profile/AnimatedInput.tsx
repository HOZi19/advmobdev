import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface AnimatedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  isShaking: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address';
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  isShaking,
  autoCapitalize = 'none',
  keyboardType = 'default',
}) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const errorOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (isShaking) {
      translateX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 50 }), 4, true),
        withTiming(0, { duration: 50 })
      );
    }
  }, [isShaking]);

  React.useEffect(() => {
    if (error) {
      errorOpacity.value = withTiming(1, { duration: 300 });
    } else {
      errorOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const errorAnimatedStyle = useAnimatedStyle(() => ({
    opacity: errorOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: error ? '#ff4444' : theme.border,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
      </Animated.View>
      {error && (
        <Animated.View style={[styles.errorContainer, errorAnimatedStyle]}>
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
  },
});

