import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';   // ✅ added import

export default function SpotifyLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#121212', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Logo */}
      <Image 
        source={require('@/assets/images/spotifylogo.webp')} 
        style={styles.logo} 
      />

      {/* Title */}
      <Text style={styles.title}>Spotify</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social */}
      <Text style={styles.socialText}>Be Correct With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image 
            source={require('@/assets/images/fblogo.jpg')} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image 
            source={require('@/assets/images/googlelogo2.jpg')} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "} 
        <Link href="/SignUp" style={styles.signupLink}>
          Sign Up
        </Link>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },
  signInButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#1DB954',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    color: '#1DB954', 
    marginBottom: 15,
    fontSize: 15,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 30,
  },
  socialIcon: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  signupText: {
    color: '#888',
  },
  signupLink: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});
