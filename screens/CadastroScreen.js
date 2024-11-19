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
  const [numeroEmergencia, setNumeroEmergencia] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [certificadoRegistro, setCertificadoRegistro] = useState('');
  const [horariosAtendimento, setHorariosAtendimento] = useState('');
  const [diasAtendimento, setDiasAtendimento] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [outrosArea, setOutrosArea] = useState('');

  const getPhonePrefix = () => '+55';

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
      telefone: formatPhoneNumber(`${getPhonePrefix()}${telefone}`),
      numeroEmergencia: formatPhoneNumber(`${getPhonePrefix()}${numeroEmergencia}`),
      email,
      senha,
      dataNascimento: formattedDataNascimento,
      endereco,
      cep,
      certificadoRegistro: tipoUsuario === 'profissional' ? certificadoRegistro : null,
      horariosAtendimento: tipoUsuario === 'profissional' ? horariosAtendimento : null,
      diasAtendimento: tipoUsuario === 'profissional' ? diasAtendimento : null,
      areaAtuacao: areaAtuacao === 'Outros' ? outrosArea : areaAtuacao,
    };

    console.log(payload);

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
          <Picker.Item label="Profissional de Saúde" value="profissional" />
        </Picker>
      </View>

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
          mask: '(99) 99999-9999',
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
          mask: '(99) 99999-9999',
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
          format: 'DD/MM/YYYY',
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
          mask: '99999-999',
        }}
      />

{tipoUsuario === 'profissional' && (
  <>
    <TextInput
      placeholder="Certificado de Registro (Ex: CRM)"
      value={certificadoRegistro}
      onChangeText={setCertificadoRegistro}
      style={styles.input}
      placeholderTextColor="#aaa"
    />
    <TextInput
      placeholder="Horários de Atendimento"
      value={horariosAtendimento}
      onChangeText={setHorariosAtendimento}
      style={styles.input}
      placeholderTextColor="#aaa"
    />
    <TextInput
      placeholder="Dias de Atendimento"
      value={diasAtendimento}
      onChangeText={setDiasAtendimento}
      style={styles.input}
      placeholderTextColor="#aaa"
    />
    
    {/* Seleção de Áreas de Atuação */}
    <Text style={styles.label}>Área de Atuação:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={areaAtuacao}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setAreaAtuacao(itemValue);
          if (itemValue !== 'Outros') setOutrosArea('');
        }}
      >
        <Picker.Item label="Médico" value="Médico" />
        <Picker.Item label="Enfermeiro" value="Enfermeiro" />
        <Picker.Item label="Odontologista" value="Odontologista" />
        <Picker.Item label="Psicólogo" value="Psicólogo" />
        <Picker.Item label="Fisioterapeuta" value="Fisioterapeuta" />
        <Picker.Item label="Farmacêutico" value="Farmacêutico" />
        <Picker.Item label="Fonoaudiólogo" value="Fonoaudiólogo" />
        <Picker.Item label="Nutricionista" value="Nutricionista" />
        <Picker.Item label="Educador físico" value="Educador físico" />
        <Picker.Item label="Terapeuta ocupacional" value="Terapeuta ocupacional" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
    </View>

    {/* Campo para especificar caso seja "Outros" */}
    {areaAtuacao === 'Outros' && (
      <TextInput
        placeholder="Informe sua área de atuação"
        value={outrosArea}
        onChangeText={setOutrosArea}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
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
    marginTop: 50,
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
