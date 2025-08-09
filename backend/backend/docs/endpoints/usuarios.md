# Gerenciamento de Usuários

Este documento detalha os endpoints relacionados ao gerenciamento de usuários na plataforma.

## Endpoints

### Criar Novo Usuário

**`POST /user`**

Cria um novo usuário na plataforma e envia um email de boas-vindas.

**Autenticação:** Não requerida

**Corpo da Requisição:**
```json
{
    "nome": "João Silva",
    "email": "joao.silva@exemplo.com",
    "senha": "senhaSegura123"
}
```

**Resposta de Sucesso:**
- **Código:** `201 Created`
```json
{
    "user": "João Silva",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respostas de Erro:**
- **Código:** `400 Bad Request`
```json
{
    "error": "Bad Request: Missing required fields."
}
```

- **Código:** `400 Bad Request`
```json
{
    "error": "Bad Request: User already exists."
}
```

- **Código:** `500 Internal Server Error`
```json
{
    "error": "Internal Server Error: Unable to create user."
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@exemplo.com",
    "senha": "senhaSegura123"
  }'
```

### Observações Importantes

1. **Senha:**
   - A senha é automaticamente hasheada usando bcrypt antes de ser armazenada
   - O hash é feito com um fator de custo de 8

2. **Email de Boas-vindas:**
   - Após o cadastro bem-sucedido, um email de boas-vindas é enviado automaticamente

3. **Token JWT:**
   - O token gerado tem validade de 1 dia
   - O payload do token inclui:
     - `id`: ID do usuário
     - `email`: Email do usuário

4. **Validações:**
   - Todos os campos (nome, email, senha) são obrigatórios
   - O email deve ser único no sistema
   - A senha é validada quanto à força e segurança (recomenda-se mínimo de 8 caracteres)

5. **Formato dos Dados:**
   - `nome`: String (nome completo do usuário)
   - `email`: String (email válido)
   - `senha`: String (senha em texto plano, será hasheada pelo sistema)

6. **Headers:**
   - Content-Type: application/json (obrigatório)
