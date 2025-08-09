# Gerenciamento de Disciplinas

Este documento detalha os endpoints relacionados ao gerenciamento de disciplinas na plataforma.

## Endpoints

### Criar Nova Disciplina

**`POST /disciplina`**

Cria uma nova disciplina associada ao usuário autenticado.

**Autenticação:** Requerida (Bearer Token)

**Corpo da Requisição:**
```json
{
    "nome": "Matemática Discreta",
    "descricao": "Disciplina focada em conceitos matemáticos fundamentais para computação"
}
```

**Resposta de Sucesso:**
- **Código:** `201 Created`
```json
{
    "message": "Disciplina criada com sucesso",
    "disciplina": {
        "id": "uuid-da-disciplina",
        "nome": "Matemática Discreta",
        "descricao": "Disciplina focada em conceitos matemáticos fundamentais para computação",
        "idUsuarioCriador": "uuid-do-usuario"
    }
}
```

**Respostas de Erro:**
- **Código:** `400 Bad Request`
```json
{
    "error": "Nome é obrigatório"
}
```

- **Código:** `400 Bad Request`
```json
{
    "error": "Disciplina já existe"
}
```

- **Código:** `401 Unauthorized`
```json
{
    "error": "Token não fornecido ou inválido"
}
```

- **Código:** `500 Internal Server Error`
```json
{
    "error": "Erro ao criar disciplina: [mensagem detalhada do erro]"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/disciplina \
  -H "Authorization: Bearer seu-token-jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Matemática Discreta",
    "descricao": "Disciplina focada em conceitos matemáticos fundamentais para computação"
  }'
```

### Deletar Disciplina

**`DELETE /disciplina/:id`**

Remove uma disciplina específica. Apenas o usuário que criou a disciplina pode deletá-la.

**Autenticação:** Requerida (Bearer Token)

**Parâmetros da URL:**
- `id`: UUID da disciplina a ser deletada

**Resposta de Sucesso:**
- **Código:** `204 No Content`

**Respostas de Erro:**
- **Código:** `403 Forbidden`
```json
{
    "error": "Acesso negado!!!"
}
```

- **Código:** `404 Not Found`
```json
{
    "error": "Disciplina não encontrada"
}
```

- **Código:** `500 Internal Server Error`
```json
{
    "error": "Erro ao deletar disciplina: [mensagem detalhada do erro]"
}
```

**Exemplo de Requisição (cURL):**
```bash
curl -X DELETE http://localhost:3000/disciplina/uuid-da-disciplina \
  -H "Authorization: Bearer seu-token-jwt"
```

## Observações Importantes

1. **Autenticação:**
   - Todos os endpoints de disciplinas requerem autenticação via Bearer Token
   - O token deve ser obtido através do endpoint de login

2. **Campos:**
   - `nome`: String (obrigatório) - Nome único da disciplina para o usuário
   - `descricao`: String (opcional) - Descrição detalhada da disciplina

3. **Validações:**
   - Um usuário não pode ter duas disciplinas com o mesmo nome
   - Apenas o criador da disciplina pode deletá-la
   - O campo nome é obrigatório e não pode estar vazio

4. **Relacionamentos:**
   - Cada disciplina está associada a um único usuário (criador)
   - Uma disciplina pode ter várias sessões de estudo associadas
   - Ao deletar uma disciplina, considere o impacto nas sessões de estudo relacionadas

5. **Headers Necessários:**
   - Authorization: Bearer {token}
   - Content-Type: application/json
