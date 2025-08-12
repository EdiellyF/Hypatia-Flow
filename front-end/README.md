# 🌸 Hypatia-Flow: Frontend

Este diretório contém todo o código-fonte do frontend da aplicação Hypatia-Flow, construído com React, Vite e TypeScript.

---

## ✨ Tecnologias Principais

- **Framework**: [React](https://reactjs.org/) (v18.2)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn UI](https://ui.shadcn.com/)
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Requisições API**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Roteamento**: [React Router](https://reactrouter.com/)

---

## 📂 Estrutura de Pastas

```
src/
├── components/   # Componentes reutilizáveis (UI, layout, etc.)
├── hooks/        # Hooks customizados (ex: use-toast)
├── lib/          # Configurações de bibliotecas (ex: api, utils)
├── pages/        # Componentes de página (Dashboard, Login, etc.)
├── store/        # Lógica de estado global (Zustand)
└── main.tsx      # Ponto de entrada da aplicação
```

---

## 🚀 Como Executar

1.  **Instale as dependências** (se ainda não o fez):
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, se a 5173 estiver em uso).
