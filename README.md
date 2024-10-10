
---

# Amparo+

**Amparo+** é um aplicativo focado em oferecer suporte para idosos, promovendo autonomia e qualidade de vida. Ele disponibiliza funcionalidades como agendamento de consultas, lembretes de medicamentos, suporte a atividades sociais, e acesso a transportes e serviços de emergência, tudo de forma acessível e sem necessidade de conexão com a internet.

## Funcionalidades Principais

1. **Agendamento de Consultas**: 
   - Permite que o usuário agende consultas médicas e as visualize em uma lista.
   - Integra uma tela de carregamento personalizada enquanto os dados são processados.

2. **Lembretes de Medicamentos**: 
   - Possibilita o cadastro de medicamentos com nome, frequência, período de uso, e horário da primeira dose.
   - Gera lembretes automáticos com base nas informações inseridas.
   - Interface de adição, edição e remoção de medicamentos.
   - Utiliza animações Lottie durante o carregamento.

3. **Atividades Sociais**:
   - Oferece uma lista de atividades leves, como caminhadas e pilates, para incentivar uma rotina ativa.

4. **Transportes**:
   - Exibe uma mensagem informando que a funcionalidade está em construção, com tela de carregamento personalizada.

5. **Botão de Pânico**:
   - Ao ser acionado, envia uma mensagem automática para o número de emergência do contato cadastrado.

6. **Cadastro de Usuários**:
   - Suporta perfis de pacientes, assistentes e instituições de saúde (farmácias, clínicas, laboratórios).
   - Integra campos como CPF, telefone, endereço e outros, com máscaras de entrada.

7. **Carregamento com Animações Lottie**:
   - Telas de carregamento com animações para consultas, medicamentos, atividades e transportes.

## Tecnologias Utilizadas

- **React Native** com **Expo** para desenvolvimento mobile.
- **Lottie** para animações nas telas de carregamento.
- **@react-native-community/datetimepicker** para seleção de datas e horas.
- **Neon.tech** como host para o banco de dados.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/luskha/amparo.git
   ```
   
2. Navegue até a pasta do projeto:
   ```bash
   cd amparo
   ```

3. Troque a branch:
    ```bash
    git checkout amparo-pro
    ```

4. Instale as dependências:
   ```bash
   npm install
   ```

5. Inicie o Expo:
   ```bash
   expo start
   ```

## Estrutura do Projeto

- **/assets/animations**: Contém os arquivos JSON das animações Lottie.
- **/screens**: Telas principais do aplicativo (Medicamentos, Consultas, Atividades, Transportes, etc.).
- **/components**: Componentes reutilizáveis como o botão de pânico, inputs com máscaras, etc.
- **/navigation**: Configurações da navegação com Appbar e FAB.
- **/assets/loadingSplash**: Componente reutilizável de animação de splash screen.

## Uso

1. A tela inicial apresenta o botão de login.
2. Navegue entre as funcionalidades usando a barra de navegação inferior (Appbar).
3. Adicione medicamentos, atividades e agendamentos diretamente pelas respectivas telas.
4. Utilize o botão de pânico para alertar um contato de emergência.
5. Para testes, use o login padrão:
   - **Email**: accesso@teste.com
   - **Senha**: 123456

## Contato

Para sugestões ou problemas, entre em contato pelo [lucas.limaacesso@gmail.com](mailto:lucas.limaacesso@gmail.com).
