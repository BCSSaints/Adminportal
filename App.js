import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/config';

// Keep the splash screen visible while we load
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide the splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={COLORS.header} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
