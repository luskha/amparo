import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingScreen from '../assets/loadingSplash/animation.js'; // Importa o componente de animação
import transportesAnimation from '../assets/animations/transporte.json'; // Importa o JSON da animação
import LottieView from 'lottie-react-native'; // Importa o componente Lottie
import backgroundAnimation from '../assets/animations/bg-transportes.json'; // Importa a animação de fundo

const TransportesScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento, após o qual a animação desaparece
    setTimeout(() => setLoading(false), 5000); // Ajuste conforme necessário
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen message="Carregando..." animationSource={transportesAnimation} />
      ) : (
        <>
          <LottieView
            source={backgroundAnimation}
            autoPlay
            loop
            style={styles.backgroundAnimation}
          />
          <Text style={styles.text}>Essa funcionalidade estará disponível em breve!</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 20, // Para evitar que o texto fique muito perto das bordas
    backgroundColor: '#fff', // Fundo claro para dar contraste
    position: 'relative', // Para permitir o posicionamento absoluto da animação de fundo
  },
  backgroundAnimation: {
    position: 'relative', // Faz a animação de fundo ocupar toda a tela
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1, // Coloca a animação de fundo atrás do texto
  },
  text: {
    fontSize: 20,
    textAlign: 'flex', // Alinha o texto no centro
    marginTop: 90, // Espaçamento entre a animação e o texto
    color: '#333', // Cor do texto
  },
});

export default TransportesScreen;
