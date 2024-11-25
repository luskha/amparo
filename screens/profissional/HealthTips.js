import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const HealthTipsScreen = () => {
  const [tips, setTips] = useState([]); // Lista de dicas
  const [newTip, setNewTip] = useState(''); // Nova dica para adicionar
  const [editingTip, setEditingTip] = useState(null); // Dica em edição
  const [loading, setLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    fetchTips();
  }, []);

  // Buscar dicas de saúde do servidor
  const fetchTips = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://amparo-api-4p3q.onrender.com/health-tips');
      setTips(response.data);
    } catch (error) {
      console.error('Erro ao buscar dicas de saúde:', error);
      Alert.alert('Erro', 'Não foi possível carregar as dicas de saúde.');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova dica
  const addTip = async () => {
    if (!newTip.trim()) {
      Alert.alert('Aviso', 'A dica não pode estar vazia.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://amparo-api-4p3q.onrender.com/health-tips', { descricao: newTip });
      setNewTip('');
      fetchTips();
    } catch (error) {
      console.error('Erro ao adicionar dica:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a dica.');
    } finally {
      setLoading(false);
    }
  };

  // Editar uma dica existente
  const editTip = async (id, descricao) => {
    if (!descricao.trim()) {
      Alert.alert('Aviso', 'A dica não pode estar vazia.');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`https://amparo-api-4p3q.onrender.com/health-tips/${id}`, { descricao });
      setEditingTip(null);
      fetchTips();
    } catch (error) {
      console.error('Erro ao editar dica:', error);
      Alert.alert('Erro', 'Não foi possível editar a dica.');
    } finally {
      setLoading(false);
    }
  };

  // Excluir uma dica
  const deleteTip = async (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir esta dica?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await axios.delete(`https://amparo-api-4p3q.onrender.com/health-tips/${id}`);
            fetchTips();
          } catch (error) {
            console.error('Erro ao excluir dica:', error);
            Alert.alert('Erro', 'Não foi possível excluir a dica.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dicas de Saúde</Text>

      {/* Lista de dicas */}
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingTip?.id === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editingTip.descricao}
                  onChangeText={(text) => setEditingTip({ ...editingTip, descricao: text })}
                />
                <Button
                  title="Salvar"
                  onPress={() => editTip(editingTip.id, editingTip.descricao)}
                />
                <Button title="Cancelar" onPress={() => setEditingTip(null)} color="gray" />
              </>
            ) : (
              <>
                <Text style={styles.text}>{item.descricao}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditingTip(item)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTip(item.id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhuma dica encontrada.</Text>}
        refreshing={loading}
        onRefresh={fetchTips}
      />

      {/* Campo para adicionar nova dica */}
      <TextInput
        style={styles.input}
        placeholder="Adicione uma nova dica"
        value={newTip}
        onChangeText={setNewTip}
      />
      <Button title="Adicionar" onPress={addTip} disabled={loading} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HealthTipsScreen;
