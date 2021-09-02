# Recuperação de senha

**RF**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao recupera-la;

# Atualização de Perfil

**RF**
- O usuário deve poder atualizar seu nome, email, senha e avatar;


**RN**
- O usuário não pode alterar seu e-mail para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O Prestador deve receber uma notificação sempre que houver um novo agendamento;
- O Prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os Agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazeanads no MongoDB(banco não relacional);
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa cotrolar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar dias com horários disponível de um prestador;
- O usuário deve poder listar horários de um dia com horários disponível de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;


**RNF**

- A listagem de prestadores deve ser armazenada em cache;
- Ao cadastrar um novo prestador limpar o cache;

**RN**

- Cada Agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponíveis entre 8 e 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar um horário no passado;
- O usuário não pode marcar um agendamento com ele mesmo (barbeiro ser cliente dele mesmo);
