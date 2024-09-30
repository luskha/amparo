import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';

const AgendamentoScreen = ({ route }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [agendamentos, setAgendamentos] = useState(route.params?.agendamentos || []);
  const navigation = useNavigation();

  const handleAgendamento = () => {
    if (date && time) {
      // Armazena o agendamento no estado local
      const newAgendamento = { date, time };
      const updatedAgendamentos = [...agendamentos, newAgendamento];
      setAgendamentos(updatedAgendamentos);

      // Agendar notificação
      const [day, month, year] = date.split('/');
      const [hour, minute] = time.split(':');
      const agendamentoDate = new Date(year, month - 1, day, hour, minute);

      PushNotification.localNotificationSchedule({
        message: `Consulta marcada para ${date} às ${time}`,
        date: agendamentoDate, // Data e hora do lembrete
      });

      Alert.alert('Agendamento Confirmado', `Consulta marcada para ${date} às ${time}`);
      setDate('');
      setTime('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    }
  };

  const handleVerAgendamentos = () => {
    // Navega para a tela de listagem de agendamentos
    navigation.navigate('Listagem', { agendamentos });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Hora (HH:MM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleAgendamento}>
        <Text style={styles.buttonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listButton} onPress={handleVerAgendamentos}>
        <Text style={styles.buttonText}>Ver Agendamentos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745', // Verde para indicar uma ação de sucesso
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  listButton: {
    backgroundColor: '#007bff', // Azul para o botão de ver agendamentos
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

export default AgendamentoScreen;

