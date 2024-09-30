import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AgendamentoScreen from './screens/AgendamentoScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ListagemScreen from './screens/ListagemScreen';
import ListagemMedicamentosScreen from './screens/ListagemMedicamentosScreen';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const App = () => {
  // Configurando Google Sign-In na inicialização do app
  React.useEffect(() => {
    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        webClientId: '855590427237-8u7etnm87qladq812fpcmmm2pb07ppmi.apps.googleusercontent.com',
      });
    };
    configureGoogleSignIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Bem-vindo' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login com Google' }}
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
          name="Listagem"
          component={ListagemScreen}
          options={{ title: 'Meus Agendamentos' }}
        />
        <Stack.Screen
          name="ListagemMedicamentos"
          component={ListagemMedicamentosScreen}
          options={{ title: 'Meus Medicamentos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Registra o componente App com o nome da aplicação
AppRegistry.registerComponent(appName, () => App);

export default App;
