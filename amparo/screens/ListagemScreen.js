import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ListagemScreen = ({ route }) => {
  const { agendamentos } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>
      <FlatList
        data={agendamentos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.agendamentoItem}>
            <Text style={styles.agendamentoText}>
              {`Consulta: ${item.date} às ${item.time}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  agendamentoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  agendamentoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ListagemScreen;
