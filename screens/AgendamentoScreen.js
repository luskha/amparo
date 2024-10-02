import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const AgendamentoScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Você precisa permitir notificações para usar esse recurso.');
    }
  };

  const agendarNotificacao = async (dataConsulta) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete de Consulta',
        body: `Sua consulta está marcada para ${dataConsulta.toLocaleDateString()} às ${dataConsulta.toLocaleTimeString()}`,
      },
      trigger: {
        date: dataConsulta,
      },
    });
  };

  const handleAgendamento = () => {
    if (date && time) {
      const dataConsulta = new Date(date);
      dataConsulta.setHours(time.getHours());
      dataConsulta.setMinutes(time.getMinutes());

      const novaConsulta = {
        id: consultas.length + 1,
        data: dataConsulta,
        status: 'Marcado',
      };

      setConsultas([...consultas, novaConsulta]);
      agendarNotificacao(dataConsulta);

      Alert.alert('Agendamento Confirmado', `Consulta marcada para ${dataConsulta.toLocaleDateString()} às ${dataConsulta.toLocaleTimeString()}`);
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    }
  };

  const concluirConsulta = (id) => {
    setConsultas(consultas.map((consulta) => 
      consulta.id === id ? { ...consulta, status: 'Concluído' } : consulta
    ));
  };

  const renderConsulta = ({ item }) => (
    <View style={styles.consultaItem}>
      <Text>Consulta: {item.data.toLocaleDateString()} às {item.data.toLocaleTimeString()}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === 'Marcado' && (
        <TouchableOpacity style={styles.concluirButton} onPress={() => concluirConsulta(item.id)}>
          <Text style={styles.buttonText}>Concluir Consulta</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      {/* Botão de Selecionar Data com a data selecionada */}
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>
          {date ? `Data: ${date.toLocaleDateString()}` : 'Selecionar Data'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Botão de Selecionar Hora com a hora selecionada */}
      <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonText}>
          {time ? `Hora: ${time.toLocaleTimeString()}` : 'Selecionar Hora'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      {/* Botão de Confirmar Agendamento */}
      <TouchableOpacity style={styles.button} onPress={handleAgendamento}>
        <Text style={styles.buttonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>

      {/* Lista de Consultas */}
      <Text style={styles.subtitle}>Consultas Agendadas:</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderConsulta}
      />
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
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  consultaItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  concluirButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AgendamentoScreen;
