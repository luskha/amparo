import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const ProfessionalHomeScreen = () => {
  const [nextAppointments, setNextAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNextAppointments();
    setupNotifications();
  }, []);

  const fetchNextAppointments = async () => {
    try {
      const response = await axios.get(
        'https://amparo-api-4p3q.onrender.com/appointments/professional'
      );
      setNextAppointments(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const setupNotifications = () => {
    if (nextAppointments.length > 0) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Próxima Consulta!',
          body: `Você tem uma consulta às ${
            nextAppointments[0]?.hora || 'horário não definido'
          } com ${nextAppointments[0]?.paciente || 'paciente não identificado'}`,
        },
        trigger: {
          seconds: 5, // Notificação de exemplo; ajuste conforme necessário
        },
      });
    }
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.text}>Paciente: {item.paciente}</Text>
      <Text style={styles.text}>Data: {item.data}</Text>
      <Text style={styles.text}>Hora: {item.hora}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Profissional!</Text>

      {/* Próximas Consultas */}
      <Text style={styles.subtitle}>Próximas Consultas:</Text>
      <FlatList
        data={nextAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        ListEmptyComponent={
          <Text style={styles.text}>Sem consultas agendadas.</Text>
        }
      />

      {/* Botão Gerenciar Dicas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DicasDeSaude')}
      >
        <Text style={styles.buttonText}>Gerenciar Dicas de Saúde</Text>
      </TouchableOpacity>
    </View>
  );
};

const DicasDeSaudeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dicas de Saúde</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddHealthTips')}
      >
        <Text style={styles.buttonText}>Adicionar Dicas de Saúde</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil Profissional</Text>
      {/* Conteúdo do perfil profissional */}
    </View>
  );
};

const ProfessionalTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'DicasDeSaude') {
            iconName = 'book';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={ProfessionalHomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DicasDeSaude"
        component={DicasDeSaudeScreen}
        options={{ title: 'Dicas de Saúde' }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfessionalTabNavigator;
