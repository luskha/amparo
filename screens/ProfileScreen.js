import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_BASE_URL = 'https://amparo-api-4p3q.onrender.com'; // Atualize com sua URL
const userId = 'usuario-id-logado'; // Substitua por lógica para obter o ID do usuário logado

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    endereco: '',
    cep: '',
    numeroEmergencia: '',
    fotoPerfil: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Função para carregar dados do usuário
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao carregar o perfil:', error);
    }
  };

  // Atualizar dados do usuário
  const saveProfileData = async () => {
    try {
      await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  // Escolher uma foto de perfil
  const pickImage = async () => {
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
      setUserData({ ...userData, fotoPerfil: result.uri });
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {/* Foto de Perfil */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={userData.fotoPerfil ? { uri: userData.fotoPerfil } : require('../assets/perfil1.png')}
        />
        <Text style={styles.changePhotoText}>Alterar foto</Text>
      </TouchableOpacity>

      {/* Dados do Usuário */}
      {Object.keys(userData).map((key) => (
        key !== 'fotoPerfil' && (
          <TextInput
            key={key}
            style={styles.input}
            editable={isEditing}
            placeholder={`Digite seu ${key}`}
            value={userData[key]}
            onChangeText={(value) => setUserData({ ...userData, [key]: value })}
          />
        )
      ))}

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <Button mode="contained" onPress={saveProfileData} style={styles.button}>
              Salvar
            </Button>
            <Button mode="text" onPress={() => setIsEditing(false)} style={styles.cancelButton}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setIsEditing(true)} style={styles.button}>
            Editar Perfil
          </Button>
        )}
        <Button mode="outlined" onPress={() => Alert.alert('Sair', 'Função de logout aqui.')} style={styles.button}>
          Sair
        </Button>
      </View>
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
  cancelButton: {
    marginBottom: 10,
    backgroundColor: '#ff6347',
  },
});

export default ProfileScreen;
