import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CadastroScreen = () => {
  const [tipoUsuario, setTipoUsuario] = useState('paciente'); // Estado para o tipo de usuário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [certificadoRegistro, setCertificadoRegistro] = useState('');
  const [nomeInstituicao, setNomeInstituicao] = useState('');
  const [horariosAtendimento, setHorariosAtendimento] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [horariosFuncionamento, setHorariosFuncionamento] = useState('');

  const handleCadastro = () => {
    // Lógica de cadastro aqui
    console.log({
      tipoUsuario,
      nome,
      cpf,
      telefone,
      email,
      senha,
      dataNascimento,
      endereco,
      cep,
      certificadoRegistro,
      nomeInstituicao,
      horariosAtendimento,
      nomeFantasia,
      horariosFuncionamento,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Selecione o tipo de usuário:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoUsuario}
          style={styles.picker}
          onValueChange={(itemValue) => setTipoUsuario(itemValue)}
        >
          <Picker.Item label="Paciente" value="paciente" />
          <Picker.Item label="Assistente" value="assistente" />
          <Picker.Item label="Instituição de Saúde" value="instituicao" />
        </Picker>
      </View>

      {tipoUsuario === 'paciente' || tipoUsuario === 'assistente' ? (
        <>
          <TextInput
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Número de Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Nome da Instituição"
            value={nomeInstituicao}
            onChangeText={setNomeInstituicao}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          {tipoUsuario === 'instituicao' && (
            <>
              <TextInput
                placeholder="Certificado de Registro (Ex: CRM)"
                value={certificadoRegistro}
                onChangeText={setCertificadoRegistro}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              <TextInput
                placeholder="Horários de Atendimento Online"
                value={horariosAtendimento}
                onChangeText={setHorariosAtendimento}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              <TextInput
                placeholder="Nome Fantasia"
                value={nomeFantasia}
                onChangeText={setNomeFantasia}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              <TextInput
                placeholder="Horários de Funcionamento"
                value={horariosFuncionamento}
                onChangeText={setHorariosFuncionamento}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              <TextInput
                placeholder="Endereço"
                value={endereco}
                onChangeText={setEndereco}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
            </>
          )}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Fundo suave
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
