import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ message, animationSource }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingScreen;
