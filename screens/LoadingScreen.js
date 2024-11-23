import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await SecureStore.getItemAsync('user');
      if (user) {
        navigation.navigate('Home'); // Redireciona para Home
      } else {
        navigation.navigate('Login'); // Redireciona para Login
      }
    };

    checkUserSession();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#28a745" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default LoadingScreen;
