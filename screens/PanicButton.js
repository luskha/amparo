import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';
import axios from 'axios';

const PanicButton = ({ userId }) => {
  const handlePanic = async () => {
  try {
    // Fazendo a requisição para obter o número de emergência do usuário
    const response = await axios.get(`https://amparo-api-4p3q.onrender.com/user/${userId}`);
    
    // Log da resposta do servidor
    console.log('Resposta do servidor:', response.data);
    console.log('Status da resposta:', response.status);
    console.log('Tipo de conteúdo:', response.headers['content-type']);

    // Verifica se o tipo de conteúdo é JSON
    if (response.headers['content-type'] === 'application/json') {
      const { numeroEmergencia } = response.data;

      if (numeroEmergencia) {
        const whatsappLink = `https://wa.me/${numeroEmergencia}?text=Emergência! Por favor, entre em contato imediatamente.`;
        Linking.openURL(whatsappLink);
      } else {
        Alert.alert('Erro', 'Número de emergência não registrado.');
      }
    } else {
      Alert.alert('Erro', 'A resposta do servidor não é um JSON válido.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    Alert.alert('Erro', 'Não foi possível acionar o botão de pânico.');
  }
};

  return (
    <TouchableOpacity onPress={handlePanic}>
      <Text style={styles.buttonText}>Botão de Pânico</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  panicButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  panicText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PanicButton;
