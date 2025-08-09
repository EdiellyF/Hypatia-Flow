# Autenticação e Gerenciamento de Sessões

Este documento detalha os endpoints relacionados à autenticação de usuários e gerenciamento de sessões de estudo.

## 🔐 Endpoints de Autenticação

### Login do Usuário

**`POST /user/login`**

Autentica um usuário e retorna um token JWT.

**Autenticação:** Não requerida

**Corpo da Requisição:**
```json
{
    "email": "usuario@exemplo.com",
    "senha": "senhaSegura123"
}
```

**Resposta de Sucesso:**
- **Código:** `200 OK`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "uuid-do-usuario",
        "nome": "Nome do Usuário",
        "email": "usuario@exemplo.com"
    }
}
```

**Respostas de Erro:**
- **Código:** `401 Unauthorized`
```json
{
    "error": "Credenciais inválidas"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "senha": "senhaSegura123"
  }'
```

## 📚 Endpoints de Sessões de Estudo

### Criar Nova Sessão de Estudo

**`POST /sessao`**

Cria uma nova sessão de estudo para o usuário autenticado.

**Autenticação:** Requerida (Bearer Token)

**Corpo da Requisição:**
```json
{
    "idDisciplina": "uuid-da-disciplina",
    "dataHoraInicio": "2025-08-09T14:00:00Z",
    "dataHoraFim": "2025-08-09T16:00:00Z",
    "observacoes": "Revisão para a prova de matemática"
}
```

**Resposta de Sucesso:**
- **Código:** `201 Created`
```json
{
    "id": "uuid-da-sessao",
    "idUsuario": "uuid-do-usuario",
    "idDisciplina": "uuid-da-disciplina",
    "dataHoraInicio": "2025-08-09T14:00:00Z",
    "dataHoraFim": "2025-08-09T16:00:00Z",
    "observacoes": "Revisão para a prova de matemática"
}
```

**Respostas de Erro:**
- **Código:** `400 Bad Request`
```json
{
    "error": "Data de início deve ser anterior à data de fim"
}
```
- **Código:** `401 Unauthorized`
```json
{
    "error": "Token não fornecido ou inválido"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/sessao \
  -H "Authorization: Bearer seu-token-jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "idDisciplina": "uuid-da-disciplina",
    "dataHoraInicio": "2025-08-09T14:00:00Z",
    "dataHoraFim": "2025-08-09T16:00:00Z",
    "observacoes": "Revisão para a prova de matemática"
  }'
```

### Listar Sessões do Usuário

**`GET /sessao/user/:id`**

Retorna todas as sessões de estudo de um usuário específico.

**Autenticação:** Requerida (Bearer Token)

**Parâmetros da URL:**
- `id`: UUID do usuário

**Resposta de Sucesso:**
- **Código:** `200 OK`
```json
[
    {
        "id": "uuid-da-sessao-1",
        "idUsuario": "uuid-do-usuario",
        "idDisciplina": "uuid-da-disciplina",
        "dataHoraInicio": "2025-08-09T14:00:00Z",
        "dataHoraFim": "2025-08-09T16:00:00Z",
        "observacoes": "Revisão para a prova de matemática",
        "disciplina": {
            "id": "uuid-da-disciplina",
            "nome": "Matemática"
        }
    }
]
```

**Respostas de Erro:**
- **Código:** `403 Forbidden`
```json
{
    "error": "Não autorizado: você só pode visualizar suas próprias sessões"
}
```
- **Código:** `404 Not Found`
```json
{
    "error": "Usuário não encontrado"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X GET http://localhost:3000/sessao/user/uuid-do-usuario \
  -H "Authorization: Bearer seu-token-jwt"
```

### Atualizar Sessão de Estudo

**`PUT /sessao/:id`**

Atualiza uma sessão de estudo existente.

**Autenticação:** Requerida (Bearer Token)

**Parâmetros da URL:**
- `id`: UUID da sessão

**Corpo da Requisição:**
```json
{
    "dataHoraInicio": "2025-08-09T15:00:00Z",
    "dataHoraFim": "2025-08-09T17:00:00Z",
    "observacoes": "Revisão atualizada para a prova de matemática"
}
```

**Resposta de Sucesso:**
- **Código:** `200 OK`
```json
{
    "id": "uuid-da-sessao",
    "idUsuario": "uuid-do-usuario",
    "idDisciplina": "uuid-da-disciplina",
    "dataHoraInicio": "2025-08-09T15:00:00Z",
    "dataHoraFim": "2025-08-09T17:00:00Z",
    "observacoes": "Revisão atualizada para a prova de matemática"
}
```

**Respostas de Erro:**
- **Código:** `403 Forbidden`
```json
{
    "error": "Não autorizado: você só pode atualizar suas próprias sessões"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X PUT http://localhost:3000/sessao/uuid-da-sessao \
  -H "Authorization: Bearer seu-token-jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "dataHoraInicio": "2025-08-09T15:00:00Z",
    "dataHoraFim": "2025-08-09T17:00:00Z",
    "observacoes": "Revisão atualizada para a prova de matemática"
  }'
```

### Deletar Sessão de Estudo

**`DELETE /sessao/:id`**

Remove uma sessão de estudo específica.

**Autenticação:** Requerida (Bearer Token)

**Parâmetros da URL:**
- `id`: UUID da sessão

**Resposta de Sucesso:**
- **Código:** `204 No Content`

**Respostas de Erro:**
- **Código:** `403 Forbidden`
```json
{
    "error": "Não autorizado: você só pode deletar suas próprias sessões"
}
```
- **Código:** `404 Not Found`
```json
{
    "error": "Sessão não encontrada"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X DELETE http://localhost:3000/sessao/uuid-da-sessao \
  -H "Authorization: Bearer seu-token-jwt"
```
