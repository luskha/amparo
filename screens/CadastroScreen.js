import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Checkbox, Button } from 'react-native-paper';

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [tipousuario, settipousuario] = useState('paciente');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numeroemergencia, setnumeroemergencia] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [certificadoregistro, setcertificadoregistro] = useState('');
  const [horariosatendimentoinicio, sethorariosatendimentoinicio] = useState('');
  const [horariosatendimentofim, sethorariosatendimentofim] = useState('');
  const [diasatendimento, setdiasatendimento] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
  });
  const [areaatuacao, setareaatuacao] = useState('Médico');
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
      tipousuario,
      nome,
      cpf,
      telefone: formatPhoneNumber(`${getPhonePrefix()}${telefone}`),
      numeroemergencia: formatPhoneNumber(`${getPhonePrefix()}${numeroemergencia}`),
      email,
      senha,
      datanascimento: formattedDataNascimento,
      endereco,
      cep,
      certificadoregistro: tipousuario === 'profissional' ? certificadoregistro : null,
      horariosatendimentoinicio: tipousuario === 'profissional' ? horariosatendimentoinicio : null,
      horariosatendimentofim: tipousuario === 'profissional' ? horariosatendimentofim : null,
      diasatendimento: Object.keys(diasatendimento).filter(day => diasatendimento[day]),
      areaatuacao: areaatuacao === 'Outros' ? outrosArea : areaatuacao,
    };

    console.log(payload);

    try {
      const response = await axios.post('https://amparo-api-4p3q.onrender.com/users/register', payload);
      console.log(response.data)
      const data = response.data;

      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        alert(data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente. Detalhes: ' + error.message);
    }
  };

  const handleDayToggle = (day) => {
    setdiasatendimento((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
 <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Selecione o tipo de usuário:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipousuario}
          style={styles.picker}
          onValueChange={(itemValue) => settipousuario(itemValue)}
        >
          <Picker.Item label="Paciente" value="paciente" />
          <Picker.Item label="Profissional de Saúde" value="profissional" />
        </Picker>
      </View>

      <TextInput
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        label="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Número de Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Número de Emergência"
        value={numeroemergencia}
        onChangeText={setnumeroemergencia}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <TextInput
        label="Data de Nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        style={styles.input}
      />
      <TextInput
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      <TextInput
        label="CEP"
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />

      {tipousuario === 'profissional' && (
        <>
          <TextInput
            label="Certificado de Registro"
            value={certificadoregistro}
            onChangeText={setcertificadoregistro}
            style={styles.input}
          />

          <Text style={styles.label}>Selecione os dias de atendimento:</Text>
          <View style={styles.checkboxContainer}>
            {Object.keys(diasatendimento).map((day) => (
              <View key={day} style={styles.checkboxRow}>
                <Checkbox
                  status={diasatendimento[day] ? 'checked' : 'unchecked'}
                  onPress={() => handleDayToggle(day)}
                />
                <Text style={styles.checkboxLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Horário de Atendimento:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="De (HH:MM)"
              value={horariosatendimentoinicio}
              onChangeText={sethorariosatendimentoinicio}
              style={styles.inputHalf}
              keyboardType="numeric"
            />
            <TextInput
              label="Até (HH:MM)"
              value={horariosatendimentofim}
              onChangeText={sethorariosatendimentofim}
              style={styles.inputHalf}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Área de Atuação:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={areaatuacao}
              style={styles.picker}
              onValueChange={(itemValue) => setareaatuacao(itemValue)}
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
              <Picker Item label="Terapeuta ocupacional" value="Terapeuta ocupacional" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </View>
          {areaatuacao === 'Outros' && (
            <TextInput
              label="Especifique a área de atuação"
              value={outrosArea}
              onChangeText={setOutrosArea}
              style={styles.input}
            />
          )}
        </>
      )}

      <Button mode="contained" onPress={handleCadastro} style={styles.button}>
        Cadastrar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    marginBottom: 12,
  },
  inputHalf: {
    marginBottom: 12,
    width: '48%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  checkboxContainer: {
    marginVertical: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default CadastroScreen;