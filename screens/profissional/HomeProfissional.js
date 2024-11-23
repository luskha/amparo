import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const ProfessionalHomeScreen = () => {
  const [nextAppointments, setNextAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNextAppointments();
    setupNotifications();
  }, []);

  const fetchNextAppointments = async () => {
    try {
      const response = await axios.get('https://amparo-api-4p3q.onrender.com/appointments/next');
      setNextAppointments(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const setupNotifications = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Próxima Consulta!',
        body: `Você tem uma consulta às ${nextAppointments[0]?.hora || 'horário não definido'} com ${nextAppointments[0]?.paciente || 'paciente não identificado'}`,
      },
      trigger: {
        seconds: 5, // Notificação de exemplo; ajuste conforme necessário
      },
    });
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.text}>Paciente: {item.paciente}</Text>
      <Text style={styles.text}>Hora: {item.hora}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Profissional!</Text>

      {/* Próximas Consultas */}
      <Text style={styles.subtitle}>Próximas Consultas:</Text>
      <FlatList
        data={nextAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        ListEmptyComponent={<Text style={styles.text}>Sem consultas agendadas.</Text>}
      />

      {/* Botões de Navegação */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DicasDeSaude')}
      >
        <Text style={styles.buttonText}>Gerenciar Dicas de Saúde</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text style={styles.buttonText}>Perfil Profissional</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfessionalHomeScreen;
