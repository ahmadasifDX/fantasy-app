import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (username, password) => {
    // Hardcoded authentication for demo purposes
    if (username === 'admin' && password === 'admin') {
      const userData = { username: 'admin', name: 'Admin User' };
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (userData) => {
    // In a real app, this would make an API call to register the user
    // For the demo, we'll just pretend it worked
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};