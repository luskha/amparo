import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const HealthTipsScreen = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState('');

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await axios.get('https://amparo-api-4p3q.onrender.com/health-tips');
      setTips(response.data);
    } catch (error) {
      console.error('Erro ao buscar dicas de saúde:', error);
    }
  };

  const addTip = async () => {
    try {
      await axios.post('https://amparo-api-4p3q.onrender.com/health-tips', { descricao: newTip });
      setNewTip('');
      fetchTips();
    } catch (error) {
      console.error('Erro ao adicionar dica:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dicas de Saúde</Text>
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.text}>{item.descricao}</Text>}
        ListEmptyComponent={<Text style={styles.text}>Nenhuma dica encontrada.</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Adicione uma nova dica"
        value={newTip}
        onChangeText={setNewTip}
      />
      <Button title="Adicionar" onPress={addTip} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HealthTipsScreen;
