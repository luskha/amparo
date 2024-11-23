import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://amparo-api-4p3q.onrender.com/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Marcadas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Paciente: {item.paciente}</Text>
            <Text style={styles.text}>Hora: {item.hora}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhuma consulta encontrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default AppointmentsScreen;
