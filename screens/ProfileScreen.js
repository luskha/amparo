import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'; // Importando o SecureStore

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  // Função para escolher a imagem da galeria ou tirar foto
  const pickImage = async () => {
    // Solicitar permissão de acesso à câmera e galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
      // Salvar a foto localmente usando SecureStore
      await SecureStore.setItemAsync('userPhoto', result.uri);
    }
  };

  // Função para salvar o nome no SecureStore
  const saveName = async () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }
    await SecureStore.setItemAsync('userName', name);
    Alert.alert('Nome salvo', `Nome salvo como ${name}`);
  };

  // Carregar foto e nome ao inicializar a tela
  const loadProfile = async () => {
    const savedName = await SecureStore.getItemAsync('userName');
    const savedPhoto = await SecureStore.getItemAsync('userPhoto');
    if (savedName) setName(savedName);
    if (savedPhoto) setPhoto(savedPhoto);
  };

  // Usar o efeito para carregar os dados quando a tela for aberta
  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {/* Foto de perfil */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={photo ? { uri: photo } : require('../assets/perfil1.png')}
        />
        <Text style={styles.changePhotoText}>Alterar foto</Text>
      </TouchableOpacity>

      {/* Nome de usuário */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveName}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Outras informações do perfil podem ser inseridas aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhotoText: {
    color: 'blue',
    marginTop: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#5dc1b9', // Cor de fundo
    paddingVertical: 12, // Altura do botão
    paddingHorizontal: 20, // Largura do botão
    borderRadius: 5, // Bordas arredondadas
    alignItems: 'center', // Centralizar o texto
    justifyContent: 'center', // Centralizar o texto
    width: '100%', // Tamanho do botão
  },
  saveButtonText: {
    color: '#fff', // Cor do texto
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Peso da fonte
  },
});

export default ProfileScreen;
