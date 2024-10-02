import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      {/* Navegar para Agendamento de Consultas */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agendamento')}>
        <Text style={styles.buttonText}>Agendamento de Consulta</Text>
      </TouchableOpacity>

      {/* Navegar para a tela de Lembretes de Medicamentos */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Medicamentos')}>
        <Text style={styles.buttonText}>Lembretes de Medicamentos</Text>
      </TouchableOpacity>

      {/* Botão de Transporte ainda em construção */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Em construção')}>
        <Text style={styles.buttonText}>Transporte</Text>
      </TouchableOpacity>

      {/* Navegar para a tela de Atividades Sociais */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AtividadesSociais')}>
        <Text style={styles.buttonText}>Atividades Sociais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6babc9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
