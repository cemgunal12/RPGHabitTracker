import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, FONTS, SIZES } from '../../constants/theme'; // Previous theme file

const { width, height } = Dimensions.get('window');

export default function Login({ onLogin, onNavigateToSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Input focus states (for CSS focus effect)
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const handleSubmit = () => {
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. BACKGROUND PATTERNS (SVG) */}
      <View style={styles.backgroundPattern}>
        {/* Geometric Shapes */}
        <View style={[styles.geoShape, { top: 40, left: 40, width: 80, height: 80, borderColor: COLORS.primary, transform: [{ rotate: '45deg' }] }]} />
        <View style={[styles.geoShape, { top: 150, right: -20, width: 60, height: 60, borderColor: COLORS.secondary, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.geoShape, { bottom: 80, left: '20%', width: 100, height: 100, borderColor: COLORS.primary, transform: [{ rotate: '45deg' }] }]} />

        {/* RPG Runes SVG */}
        <View style={styles.svgContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 200 200">
            <Path
              d="M100,20 L120,80 L180,80 L130,120 L150,180 L100,140 L50,180 L70,120 L20,80 L80,80 Z"
              stroke={COLORS.primary}
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <Circle
              cx="100"
              cy="100"
              r="70"
              stroke={COLORS.secondary}
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          </Svg>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>

          {/* 2. LOGIN CARD */}
          <View style={styles.cardContainer}>
            {/* Background Glow Effect */}
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.glowEffect}
            />

            <View style={styles.cardContent}>

              {/* Logo / Header */}
              <View style={styles.headerSection}>
                <View style={styles.iconRow}>
                  <MaterialCommunityIcons name="sword" size={32} color={COLORS.primary} style={styles.headerIcon} />
                  <MaterialCommunityIcons name="shield" size={32} color={COLORS.secondary} style={styles.headerIcon} />
                </View>
                <Text style={styles.title}>QUEST TRACKER</Text>
                <Text style={styles.subtitle}>Enter the realm of productivity</Text>
              </View>

              {/* Form Section */}
              <View style={styles.formSection}>

                {/* Username Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={[
                      styles.input,
                      userFocus && styles.inputFocused
                    ]}
                    placeholder="Enter your username"
                    placeholderTextColor={COLORS.mutedForeground}
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        passFocus && styles.inputFocused,
                        { paddingRight: 50 }
                      ]}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.mutedForeground}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      onFocus={() => setPassFocus(true)}
                      onBlur={() => setPassFocus(false)}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={COLORS.mutedForeground}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={[COLORS.primary, '#9D4EDD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>LOG IN</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                </View>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>New adventurer? </Text>
                  <TouchableOpacity onPress={onNavigateToSignUp}>
                    <Text style={styles.signUpLink}>Create Account</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // #121212
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1, // Equivalent to opacity-5 on web
    zIndex: -1,
    overflow: 'hidden',
  },
  geoShape: {
    position: 'absolute',
    borderWidth: 2,
  },
  svgContainer: {
    position: 'absolute',
    top: height / 2 - 150,
    left: width / 2 - 150,
    width: 300,
    height: 300,
    opacity: 0.5,
  },
  // CARD STYLES
  cardContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 20,
    opacity: 0.5,
  },
  cardContent: {
    backgroundColor: COLORS.card, // #1E1E1E
    borderRadius: 18,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)', // Primary color opacity
  },
  // HEADER
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    color: COLORS.foreground,
    fontFamily: FONTS.bold, // Orbitron
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.mutedForeground,
    fontSize: 14,
    marginTop: 5,
  },
  // FORM
  formSection: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: COLORS.mutedForeground,
    fontSize: 14,
    fontWeight: '500',
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.inputBackground, // #2C2C2C
    color: COLORS.foreground,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3A3A3A',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: COLORS.primary, // #8A2BE2
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  // BUTTON
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  // DIVIDER
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3A3A3A',
  },
  dividerText: {
    color: '#606060',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  // FOOTER
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.mutedForeground,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.secondary, // #00F0FF
    fontWeight: 'bold',
    fontSize: 14,
  },
});