import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import LoadingScreen from '../assets/loadingSplash/animation.js';
import atividadesAnimation from '../assets/animations/atividades.json'; // Certifique-se de importar o arquivo JSON corretamente

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
  const [loading, setLoading] = useState(true); // Estado para o carregamento

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simulando o tempo de carregamento
  }, []);

  const handleAtividadePress = (atividadeNome) => {
    alert(`Você escolheu participar de: ${atividadeNome}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleAtividadePress(item.nome)}>
      <Text style={styles.itemText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingScreen animationSource={atividadesAnimation} message="Carregando Atividades..." />;
  }

  return (
    <View style={styles.container}>

      {/* Imagem de background */}
      <ImageBackground
        source={require('../assets/home-bg.png')} // Defina o caminho da sua imagem de fundo aqui
        style={styles.background}
      />
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
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta a imagem para cobrir toda a tela
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
