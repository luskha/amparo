import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import axios from 'axios';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;

const HomeScreen = ({ userId }) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  // Função para o Botão de Pânico
  const handlePanic = async () => {
    try {
      const response = await axios.get(`https://amparo-api-4p3q.onrender.com/user/${userId}`);
      const { numeroEmergencia } = response.data;

      if (numeroEmergencia) {
        const whatsappLink = `https://wa.me/${numeroEmergencia}?text=Emergência! Por favor, entre em contato imediatamente.`;
        Linking.openURL(whatsappLink);
      } else {
        Alert.alert('Erro', 'Número de emergência não registrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível acionar o botão de pânico.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem de background */}
      <ImageBackground
        source={require('../assets/home-bg.png')} // Defina o caminho da sua imagem de fundo aqui
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Menu Principal</Text>

          {/* Botão de perfil no canto superior direito */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
            style={styles.profileButton}
          >
            <Image
              source={require('../assets/perfil1.png')} // Defina o caminho da sua imagem de perfil aqui
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Appbar fixa na parte inferior */}
      <Appbar
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: theme.colors.elevation.level2,
          },
        ]}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Content />
        <Appbar.Action 
          icon="calendar" 
          onPress={() => navigation.navigate('Agendamento')} 
          size={35}  
          style={styles.iconSpacing} 
        />
        <Appbar.Action 
          icon="pill" 
          onPress={() => navigation.navigate('Medicamentos')} 
          size={35}  
          style={styles.iconSpacing}
        />
        <Appbar.Action 
          icon="car" 
          onPress={() => navigation.navigate('Transportes')} 
          size={35}  
          style={styles.iconSpacing}
        />
        <Appbar.Action 
          icon="run" 
          onPress={() => navigation.navigate('AtividadesSociais')} 
          size={35}  
          style={styles.iconSpacing}
        />
        <Appbar.Content />
      </Appbar>

      {/* FAB flutuante fora da Appbar */}
      <FAB
        mode="flat"
        size={42}
        icon="alert" // Ícone representando o botão de pânico
        onPress={handlePanic} // Aciona a função de pânico
        style={[
          styles.fab,
          { bottom: BOTTOM_APPBAR_HEIGHT + 16 }, // Posicionamento acima da Appbar
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta a imagem para cobrir toda a tela
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Mudança para branco para contraste com o background
    marginBottom: 30,
    textAlign: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 40, // Ajuste para posicionamento superior
    right: 20, // Ajuste para o canto superior direito
    width: 60, // Largura do botão de perfil
    height: 60, // Altura do botão de perfil
    borderRadius: 25, // Deixa a imagem circular
    overflow: 'hidden', // Garante que a imagem fique circular
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta a imagem para cobrir todo o botão
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Centraliza os botões da Appbar
    backgroundColor: 'aquamarine',
  },
  iconSpacing: {
    marginHorizontal: 15, // Espaçamento entre ícones
  },
  fab: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#d40d0d'
  },
});

export default HomeScreen;
