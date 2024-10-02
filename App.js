import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AgendamentoScreen from './screens/AgendamentoScreen';
import MedicamentosScreen from './screens/MedicamentosScreen';
import AtividadesSociaisScreen from './screens/AtividadesSociaisScreen';
import CadastroScreen from './screens/CadastroScreen';

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
  const notificationListener = useRef();
  const responseListener = useRef();

  // Solicitar permissões de notificação
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener quando uma notificação é recebida
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    // Listener quando o usuário interage com a notificação
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Usuário interagiu com a notificação:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ title: 'Amparo+' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Menu Principal' }}
        />
        <Stack.Screen 
          name="Agendamento" 
          component={AgendamentoScreen} 
          options={{ title: 'Agendar Consulta' }}
        />
        <Stack.Screen 
          name="Medicamentos" 
          component={MedicamentosScreen} 
          options={{ title: 'Lembretes de Medicamentos' }}
        />
        <Stack.Screen 
          name="AtividadesSociais" 
          component={AtividadesSociaisScreen} 
          options={{ title: 'Atividades Sociais' }}
        />
        <Stack.Screen
        name='Cadastro'
        component={CadastroScreen}
        options={{ title: 'Cadastre-se'}}
        />
      </Stack.Navigator>

      {/* Botão de exemplo para testar notificações */}
      {/* <Button
        title="Testar Notificação"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
    </NavigationContainer>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora do remédio!",
      body: "Lembrete para tomar seu medicamento.",
    },
    trigger: { seconds: 5 }, // Notificação disparada após 5 segundos
  });
}

// Solicitar permissões para notificações
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

export default App;
