import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Fonts
import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_700Bold
} from '@expo-google-fonts/orbitron';

// Screens
import Login from './src/screens/auth/LoginScreen';
import SignUp from './src/screens/auth/SignUpScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  // ('Login' or 'SignUp')
  const [currentScreen, setCurrentScreen] = useState('Login');

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_700Bold,
  });
  const handleLogin = (username, password) => {
    Alert.alert("Success", `Welcome ${username}! You have been logged in.`);

  };

  const handleSignUp = (username, password) => {
    Alert.alert("Congratulations!", `Account created ${username}. You can now log in.`);
    setCurrentScreen('Login');
  };


  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar style="light" />

      {currentScreen === 'Login' ? (
        <Login
          onLogin={handleLogin}
          onNavigateToSignUp={() => setCurrentScreen('SignUp')}
        />
      ) : (
        <SignUp
          onSignUp={handleSignUp}
          onNavigateToLogin={() => setCurrentScreen('Login')}
        />
      )}
    </View>
  );
}