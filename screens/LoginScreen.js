import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://amparo-api-4p3q.onrender.com/auth/login', {
        email,
        password,
        userType: isProfessional ? 'profissional' : 'paciente',
      });

      const { data } = response;

      // Salva os dados do usuário no SecureStore
      await SecureStore.setItemAsync('user', JSON.stringify(data.user));

      // Navega para a tela correspondente ao tipo de usuário
      navigation.navigate(data.user.tipousuario === 'profissional' ? 'ProfessionalHomeScreen' : 'HomeScreen');
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao efetuar login.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupNavigation = () => {
    // Navega para a tela de cadastro
    navigation.navigate('Cadastro');
  };

  return (
    <ImageBackground 
      source={require('../assets/bg-login.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Amparo+</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <View style={styles.switchContainer}>
          <Switch
            value={isProfessional}
            onValueChange={setIsProfessional}
          />
          <Text style={styles.switchText}>
            {isProfessional ? 'Profissional de Saúde' : 'Paciente'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignupNavigation} style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? Cadastre-se aqui</Text>
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
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#338b85',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9', // Cinza para estado desabilitado
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 15,
  },
  signupText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
