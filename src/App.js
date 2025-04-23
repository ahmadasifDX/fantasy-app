import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
