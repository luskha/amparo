import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MedicamentosScreen = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [primeiraDose, setPrimeiraDose] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Adicionar medicamento
  const adicionarMedicamento = () => {
    if (nome && frequencia && periodo && primeiraDose) {
      const novoMedicamento = {
        id: medicamentos.length + 1,
        nome,
        frequencia,
        periodo,
        primeiraDose,
      };
      setMedicamentos([...medicamentos, novoMedicamento]);
      setNome('');
      setFrequencia('');
      setPeriodo('');
      setPrimeiraDose(new Date());
      Alert.alert('Sucesso', 'Medicamento adicionado!');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos!');
    }
  };

  // Remover medicamento
  const removerMedicamento = (id) => {
    setMedicamentos(medicamentos.filter((item) => item.id !== id));
  };

  // Renderizar item na lista de medicamentos
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.nome}</Text>
      <Text>Dose inicial: {item.primeiraDose.toLocaleDateString()} às {item.primeiraDose.toLocaleTimeString()}</Text>
      <Text>Frequência: {item.frequencia}x por dia, por {item.periodo} dias</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removerMedicamento(item.id)}>
        <Text style={styles.buttonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  // Abrir seletor de data
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPrimeiraDose(selectedDate);
    }
  };

  // Abrir seletor de hora
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updatedDate = new Date(primeiraDose);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setPrimeiraDose(updatedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome do Medicamento:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Paracetamol"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.title}>Frequência (vezes ao dia):</Text>
      <TextInput
        value={frequencia}
        onChangeText={setFrequencia}
        placeholder="Ex: 2"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.title}>Período de uso (dias):</Text>
      <TextInput
        value={periodo}
        onChangeText={setPeriodo}
        placeholder="Ex: 7"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      {/* Botão de Selecionar Data com a data selecionada */}
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>
          {primeiraDose ? `Data: ${primeiraDose.toLocaleDateString()}` : 'Selecionar Data'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={primeiraDose}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Botão de Selecionar Hora com a hora selecionada */}
      <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonText}>
          {primeiraDose ? `Hora: ${primeiraDose.toLocaleTimeString()}` : 'Selecionar Hora'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={primeiraDose}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={adicionarMedicamento}>
        <Text style={styles.buttonText}>Adicionar Medicamento</Text>
      </TouchableOpacity>

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MedicamentosScreen;
