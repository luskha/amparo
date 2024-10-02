import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === 'acesso@teste.com' && password === '123456') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Falhou', 'Usuário ou senha incorretos');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        {/* Botão de cadastro */}
        <TouchableOpacity 
          style={styles.cadastroButton} 
          onPress={() => navigation.navigate('Cadastro')} // Navegar para tela de cadastro
        >
          <Text style={styles.cadastroText}>Não tem uma conta? Cadastre-se aqui</Text>
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
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
  cadastroButton: {
    marginTop: 20,
  },
  cadastroText: {
    color: '#e6e9ed',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
