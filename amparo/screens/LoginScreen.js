import React from 'react';
import { View, Text, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Verifica se os serviços do Google Play estão disponíveis
      const userInfo = await GoogleSignin.signIn(); // Realiza o login
      console.log('User Info:', userInfo);
      navigation.navigate('Home'); // Navega para a tela "Home" após o login bem-sucedido
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login Cancelado', 'O login foi cancelado pelo usuário.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login em Progresso', 'O login já está em andamento.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Serviço Indisponível', 'Serviços do Google Play não disponíveis ou desatualizados.');
      } else {
        Alert.alert('Erro de Login', 'Algo deu errado durante o login.');
      }
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
          <Text style={styles.buttonText}>ENTRAR COM GOOGLE</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4285F4', // Azul do Google
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
