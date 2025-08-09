# Schemas e Modelos de Dados

Este documento detalha os modelos de dados utilizados na API, incluindo suas propriedades, relacionamentos e restrições.

## User (Usuário)

**Tabela:** `users`

Representa um usuário do sistema.

| Campo    | Tipo     | Obrigatório | Único | Descrição                    |
|----------|----------|-------------|-------|------------------------------|
| id       | UUID     | Sim         | Sim   | Identificador único do usuário |
| nome     | String   | Sim         | Não   | Nome completo do usuário     |
| email    | String   | Sim         | Sim   | Email do usuário (único)     |
| senha    | String   | Sim         | Não   | Senha hasheada do usuário    |

**Relacionamentos:**
- `disciplinasCriadas`: Um usuário pode criar várias disciplinas (One-to-Many)
- `sessoesFeitas`: Um usuário pode ter várias sessões de estudo (One-to-Many)

## Disciplina

**Tabela:** `disciplinas`

Representa uma disciplina ou matéria de estudo.

| Campo             | Tipo     | Obrigatório | Único | Descrição                    |
|------------------|----------|-------------|-------|------------------------------|
| id               | UUID     | Sim         | Sim   | Identificador único da disciplina |
| nome             | String   | Sim         | Não   | Nome da disciplina           |
| descricao        | String   | Não         | Não   | Descrição da disciplina      |
| idUsuarioCriador | UUID     | Sim         | Não   | ID do usuário que criou a disciplina |

**Relacionamentos:**
- `usuarioCriador`: Referência ao usuário que criou a disciplina (Many-to-One)
- `sessoesRelacionadas`: Uma disciplina pode ter várias sessões de estudo (One-to-Many)

## Assunto

**Tabela:** `assuntos`

Representa um tópico ou assunto específico de estudo.

| Campo     | Tipo     | Obrigatório | Único | Descrição                    |
|-----------|----------|-------------|-------|------------------------------|
| id        | UUID     | Sim         | Sim   | Identificador único do assunto |
| nome      | String   | Sim         | Não   | Nome do assunto              |
| descricao | String   | Não         | Não   | Descrição do assunto         |

**Relacionamentos:**
- `sessoesDeEstudo`: Um assunto pode estar presente em várias sessões de estudo (Many-to-Many através de SessaoAssunto)

## SessaoEstudo

**Tabela:** `sessoes_estudo`

Representa uma sessão de estudo realizada pelo usuário.

| Campo           | Tipo     | Obrigatório | Único | Descrição                    |
|----------------|----------|-------------|-------|------------------------------|
| id             | UUID     | Sim         | Sim   | Identificador único da sessão |
| dataHoraInicio | DateTime | Sim         | Não   | Data e hora de início da sessão |
| dataHoraFim    | DateTime | Sim         | Não   | Data e hora de fim da sessão |
| observacoes    | String   | Não         | Não   | Anotações sobre a sessão     |
| idUsuario      | UUID     | Sim         | Não   | ID do usuário que realizou a sessão |
| idDisciplina   | UUID     | Sim         | Não   | ID da disciplina estudada    |

**Relacionamentos:**
- `usuario`: Referência ao usuário que realizou a sessão (Many-to-One)
- `disciplina`: Referência à disciplina estudada (Many-to-One)
- `assuntos`: Assuntos abordados na sessão (Many-to-Many através de SessaoAssunto)

## SessaoAssunto

**Tabela:** `sessao_assunto`

Tabela de junção que relaciona sessões de estudo com assuntos.

| Campo           | Tipo     | Obrigatório | Único | Descrição                    |
|----------------|----------|-------------|-------|------------------------------|
| idSessaoEstudo | UUID     | Sim         | Não*  | ID da sessão de estudo      |
| idAssunto      | UUID     | Sim         | Não*  | ID do assunto               |

\* A combinação de `idSessaoEstudo` e `idAssunto` forma uma chave primária composta única.

**Relacionamentos:**
- `sessaoEstudo`: Referência à sessão de estudo
- `assunto`: Referência ao assunto

## Observações Importantes

1. **Chaves Primárias:**
   - Todos os IDs são UUIDs gerados automaticamente
   - SessaoAssunto usa uma chave primária composta

2. **Integridade Referencial:**
   - Todas as relações são mantidas através de chaves estrangeiras
   - A exclusão de um registro pai (ex: Disciplina) pode afetar registros filhos

3. **Campos Únicos:**
   - Email do usuário deve ser único em todo o sistema
   - IDs são únicos em suas respectivas tabelas

4. **Campos Opcionais:**
   - Campos marcados como não obrigatórios podem ser nulos
   - Descrições são geralmente opcionais

5. **Timestamps:**
   - As datas são armazenadas em formato UTC
   - São usados campos separados para início e fim de sessões
