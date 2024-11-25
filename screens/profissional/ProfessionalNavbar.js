import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importar telas
import AppointmentsScreen from '../profissional/AppointmentsProfessional' ;
import HealthTipsScreen from '../profissional/HealthTips' ;

// Configurar o Tab Navigator
const Tab = createBottomTabNavigator();

const ProfessionalNavbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Consultas') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Dicas de Saúde') {
              iconName = focused ? 'book' : 'book-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Consultas" component={AppointmentsScreen} />
        <Tab.Screen name="Dicas de Saúde" component={HealthTipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ProfessionalNavbar;
