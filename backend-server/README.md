# api-tcc
Projeto para conclusão de Curso - Sistemas de Informação


## 1 - Requisitos - Funcionalidade Macro

### 1.1 Recuperação de Senha

**RF - Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF - Requisitos não Funcionais**

- O envio de e-mail deve acontecer em segundo plano (background job);
- Utilizar Mailtrap  para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;

**RN - Regras de Negócio**

- O usuário precisa confirmar a nova senha ao resetar sua senha;
- O link enviado por e-mail para resetar senha, deve expirar em 2 horas;

### 1.2 Atualização do Perfil

**RF - Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;


**RN - Regras de Negócio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuário deve informa sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### 1.3 Painel Prestador - Barbeiro

**RF - Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos em dias específicos;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder listar as notifições não lidas;


**RNF - Requisitos não Funcionais**

- Os agendamentos do prstador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador deve ser enviadas em tempo real utilizando Socket.io;

**RN - Regras de Negócio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

### 1.4 Agendamento de Serviços

**RF - Requisitos Funcionais**

- O usuário deve poder listar todos os prestador de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador
- O usuário deve listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF - Requisitos não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**RN - Regras de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve esta disponveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços cosigo mesmo;
