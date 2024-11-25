import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error
    try {
      const response = await axios.get('https://amparo-api-4p3q.onrender.com/appointments');
      setAppointments(response.data);
    } catch (err) {
      console.error('Erro ao carregar consultas:', err);
      setError('Erro ao carregar consultas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  const renderAppointment = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.text}>Paciente: {item.paciente}</Text>
        <Text style={styles.text}>Hora: {item.hora}</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Marcadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAppointment}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhuma consulta marcada no momento. Verifique novamente mais tarde.
            </Text>
          }
        />
      )}
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
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AppointmentsScreen;
