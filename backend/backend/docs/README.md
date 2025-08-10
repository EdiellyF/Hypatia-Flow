# API de Gestão de Estudos

Uma API RESTful para gerenciamento de estudos, permitindo o controle de usuários, disciplinas, sessões de estudo e assuntos relacionados.

## 📋 Visão Geral

Esta API foi desenvolvida para fornecer uma plataforma robusta de gerenciamento de estudos, onde os usuários podem:
- Gerenciar suas disciplinas de estudo
- Registrar e controlar sessões de estudo
- Associar assuntos específicos às sessões
- Manter um histórico organizado de suas atividades acadêmicas

### 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução
- **Express.js**: Framework web
- **Prisma**: ORM (Object-Relational Mapping)
- **PostgreSQL**: Banco de dados
- **JWT**: Autenticação e autorização
- **Email Service**: Funcionalidades de envio de email

## 🚀 Começando

### Pré-requisitos

- Node.js (versão LTS recomendada)
- PostgreSQL instalado e em execução
- npm ou yarn

### Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone 
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` baseado no `.env-example` fornecido:
   ```env
   DATABASE_URL=postgresql://[user]:[password]@localhost:5432/[db_name]
   JWT_SECRET=seu_segredo_jwt_aqui
   JWT_EXPIRES_IN=24h
   
   EMAIL_HOST=smtp.seu-provedor.com
   EMAIL_PORT=587
   EMAIL_USER=seu-email@provedor.com
   EMAIL_PASS=sua-senha-do-email
   ```

4. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   ```

## 🔐 Autenticação

A API utiliza autenticação JWT (JSON Web Token) para proteger as rotas. O fluxo de autenticação funciona da seguinte forma:

1. **Login**: O usuário faz uma requisição POST para `/user/login` com suas credenciais
2. **Token**: Em caso de sucesso, a API retorna um token JWT
3. **Acesso**: Para acessar rotas protegidas, inclua o token no header Authorization:
   ```
   Authorization: Bearer {seu_token_jwt}
   ```

### Tempo de Expiração
- Os tokens JWT têm validade definida pela variável de ambiente `JWT_EXPIRES_IN`
- Por padrão, é configurado para 24 horas

## 📚 Documentação dos Endpoints

A documentação detalhada dos endpoints está organizada nos seguintes arquivos:

- [Autenticação e Sessões](./endpoints/autenticacao.md)
- [Gerenciamento de Usuários](./endpoints/usuarios.md)
- [Gerenciamento de Disciplinas](./endpoints/disciplinas.md)

Para informações detalhadas sobre os modelos de dados e suas relações, consulte:
- [Schemas e Modelos de Dados](./schemas.md)

## 🔄 Status Codes

A API utiliza os seguintes códigos de status HTTP:

- `200`: Sucesso
- `201`: Criado com sucesso
- `400`: Erro na requisição
- `401`: Não autorizado
- `403`: Proibido
- `404`: Não encontrado
- `500`: Erro interno do servidor

## 📝 Convenções de API

- Todas as requisições e respostas são em formato JSON
- Datas são enviadas e recebidas no formato ISO 8601
- IDs são strings UUID v4
- Paginação é baseada em limit/offset quando aplicável
- Timestamps são sempre em UTC
