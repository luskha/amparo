import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MedicamentosScreen = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [primeiraDose, setPrimeiraDose] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      <Text style={styles.itemText}>{item.nome}</Text>
      <Button title="Remover" onPress={() => removerMedicamento(item.id)} />
    </View>
  );

  // Abrir seletor de data
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || primeiraDose;
    setShowDatePicker(false);
    setPrimeiraDose(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Medicamento:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Paracetamol"
        style={styles.input}
      />

      <Text style={styles.label}>Frequência (vezes ao dia):</Text>
      <TextInput
        value={frequencia}
        onChangeText={setFrequencia}
        placeholder="Ex: 2"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Período de uso (dias):</Text>
      <TextInput
        value={periodo}
        onChangeText={setPeriodo}
        placeholder="Ex: 7"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Primeira Dose:</Text>
      <Button title="Escolher Horário" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={primeiraDose}
          mode="time"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Espaçamento entre os botões */}
      <View style={styles.buttonSpacing} />

      <Button title="Adicionar Medicamento" onPress={adicionarMedicamento} />

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4dfca',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  list: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 20, // Ajuste a altura conforme necessário
  },
});

export default MedicamentosScreen;
