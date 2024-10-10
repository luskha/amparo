import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numeroEmergencia, setNumeroEmergencia] = useState(''); // Campo para emergência
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [nacionalidade, setNacionalidade] = useState('brasileiro'); // Nacionalidade padrão Brasil
  const [certificadoRegistro, setCertificadoRegistro] = useState('');
  const [nomeInstituicao, setNomeInstituicao] = useState('');
  const [horariosAtendimento, setHorariosAtendimento] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [horariosFuncionamento, setHorariosFuncionamento] = useState('');

  // Função para determinar o código de país
  const getPhonePrefix = () => {
    if (nacionalidade === 'brasileiro') {
      return '+55';
    }
    return ''; // Outros países podem ser adicionados se necessário
  };

  const handleCadastro = async () => {
    if (!nome || !cpf || !telefone || !email || !senha) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formattedDataNascimento = dataNascimento.split('/').reverse().join('-');
    const formatPhoneNumber = (number) => number.replace(/[^0-9]/g, ''); 

    const payload = {
      tipoUsuario,
      nome,
      cpf,
      telefone: formatPhoneNumber(`${getPhonePrefix()}${telefone}`), // Adiciona o código de país no número
      numeroEmergencia: formatPhoneNumber(`${getPhonePrefix()}${numeroEmergencia}`), // Aplica código no número de emergência
      email,
      senha,
      dataNascimento: formattedDataNascimento, // Data formatada para o banco
      endereco,
      cep,
      certificadoRegistro,
      nomeInstituicao,
      horariosAtendimento,
      nomeFantasia,
      horariosFuncionamento,
    };

    console.log(payload); // Log do payload para depuração

    try {
      const response = await axios.post('https://amparo-api-4p3q.onrender.com/cadastro', payload);
      const data = response.data;

      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        alert(data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
      }
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
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

      <Text style={styles.label}>Selecione a Nacionalidade:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={nacionalidade}
          style={styles.picker}
          onValueChange={(itemValue) => setNacionalidade(itemValue)}
        >
          <Picker.Item label="Brasileiro" value="brasileiro" />
          <Picker.Item label="Outro" value="outro" />
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
          <TextInputMask
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            type={'cpf'}
          />
          <TextInputMask
            placeholder="Número de Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            type={'custom'}
            options={{
              mask: '(99) 99999-9999', // Máscara de telefone
            }}
          />
          <TextInputMask
            placeholder="Número de Emergência"
            value={numeroEmergencia}
            onChangeText={setNumeroEmergencia}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            type={'custom'}
            options={{
              mask: '(99) 99999-9999', // Máscara de telefone
            }}
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
          <TextInputMask
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            style={styles.input}
            placeholderTextColor="#aaa"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY', // Máscara de data
            }}
          />
          <TextInput
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInputMask
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            style={styles.input}
            placeholderTextColor="#aaa"
            type={'custom'}
            options={{
              mask: '99999-999', // Máscara de CEP
            }}
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
    backgroundColor: '#f7f7f7',
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
    marginBottom: 8,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CadastroScreen;