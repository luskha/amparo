import React, { useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import { View, Platform, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfessionalHomeScreen from './screens/profissional/ProfessionalHomeScreen';
import ProfessionalNavbar from './screens/profissional/ProfessionalNavbar'; // Navbar do profissional
import AgendamentoScreen from './screens/AppointmentsScreen';
import MedicamentosScreen from './screens/MedicamentosScreen';
import AtividadesSociaisScreen from './screens/AtividadesSociaisScreen';
import CadastroScreen from './screens/CadastroScreen';
import TransportesScreen from './screens/TransportesScreen';
import PanicButton from './screens/PanicButton'; // Botão de pânico
import ProfileScreen from './screens/ProfileScreen'; // Tela de perfil
import LottieView from 'lottie-react-native'; // Importando Lottie para animação
import axios from 'axios'; // Adicionando a importação do Axios

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento
  const [userType, setUserType] = useState(null); // Estado para diferenciar paciente/profissional
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const initializeApp = async () => {
      // Simular um carregamento inicial
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 segundos
      setLoading(false); // Finalizar carregamento
    };

    initializeApp();

    const registerForPushNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setExpoPushToken(token);
        }
      } catch (error) {
        console.error('Erro ao registrar notificações:', error);
      }
    };

    registerForPushNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Usuário interagiu com a notificação:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (loading) {
    // Exibir tela de carregamento
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('./assets/animations/verificando.json')} // Caminho para animação
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  const renderScreens = () => {
    if (userType === 'paciente') {
      return (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Menu Principal' }} />
          <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Consulta' }} />
          <Stack.Screen name="Medicamentos" component={MedicamentosScreen} options={{ title: 'Lembretes de Medicamentos' }} />
          <Stack.Screen name="AtividadesSociais" component={AtividadesSociaisScreen} options={{ title: 'Atividades Sociais' }} />
          <Stack.Screen name="Transportes" component={TransportesScreen} options={{ title: 'Transportes' }} />
          <Stack.Screen name="PanicButton" component={PanicButton} options={{ title: 'Botão de Pânico' }} />
          <Stack.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </>
      );
    } else if (userType === 'professional') {
      return (
        <Stack.Screen name="ProfessionalNavbar" component={ProfessionalNavbar} options={{ headerShown: false }} />
      );
    } else {
      return (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Menu Principal' }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Amparo+' }} />
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUserType={setUserType} />}
          </Stack.Screen>
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastre-se' }} />
        </>
      );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        headerShown: false
      }}>
        {/* {renderScreens()} */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Menu Principal' }} />
          <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Consulta' }} />
          <Stack.Screen name="Medicamentos" component={MedicamentosScreen} options={{ title: 'Lembretes de Medicamentos' }} />
          <Stack.Screen name="AtividadesSociais" component={AtividadesSociaisScreen} options={{ title: 'Atividades Sociais' }} />
          <Stack.Screen name="Transportes" component={TransportesScreen} options={{ title: 'Transportes' }} />
          <Stack.Screen name="PanicButton" component={PanicButton} options={{ title: 'Botão de Pânico' }} />
          <Stack.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
          <Stack.Screen name="ProfessionalNavbar" component={ProfessionalNavbar} options={{ headerShown: false }} />
          <Stack.Screen name="ProfessionalHomeScreen" component={HomeScreen} options={{ title: 'Menu Principal' }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Amparo+' }} />
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUserType={setUserType} />}
          </Stack.Screen>
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastre-se' }} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

// Função para agendar notificações push
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora do remédio!",
      body: "Lembrete para tomar seu medicamento.",
    },
    trigger: { seconds: 5 },
  });
}

// Função para registrar notificações push
async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Você precisa permitir notificações para o app funcionar corretamente!');
      return;
    }
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Token de notificação:', token);
  return token;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo durante o carregamento
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default App;
