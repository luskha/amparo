import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleEnter = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={require('../assets/gifs/background.gif')} // Imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}> </Text>
        <TouchableOpacity style={styles.button} onPress={handleEnter}>
          <Text style={styles.buttonText}>INICIAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
  button: {
    position: 'absolute', // Torna a posição do botão relativa à tela
    bottom: 200, // Ajuste este valor para mover o botão para cima ou para baixo
    backgroundColor: '#ff67d0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
