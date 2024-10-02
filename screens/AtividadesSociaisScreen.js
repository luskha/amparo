import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const atividades = [
  { id: '1', nome: 'Caminhada' },
  { id: '2', nome: 'Hidroginástica' },
  { id: '3', nome: 'Pilates' },
  { id: '4', nome: 'Yoga' },
  { id: '5', nome: 'Grupo de Leitura' },
  { id: '6', nome: 'Jogos de Tabuleiro' },
  { id: '7', nome: 'Dança de Salão' },
];

const AtividadesSociaisScreen = () => {
  
  // Função para quando a atividade for selecionada
  const handleAtividadePress = (atividadeNome) => {
    alert(`Você escolheu participar de: ${atividadeNome}`);
  };

  // Renderiza cada item da lista de atividades
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleAtividadePress(item.nome)}>
      <Text style={styles.itemText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividades Sociais</Text>
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6babc9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AtividadesSociaisScreen;
