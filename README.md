# 📦 SoftStock Manager

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> **Sistema Front-end de Controle de Estoque** desenvolvido para a Pós-Graduação. O projeto apresenta uma interface moderna (Pastel UI), responsiva e arquitetada para integração fácil com API e Banco de Dados SQL.

---

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Funcionalidades](#-funcionalidades)
- [Integração Back-end (SQL)](#-integração-back-end-sql)
- [Como Rodar](#-como-rodar)
- [Autores](#-autores)

---

## 💻 Sobre o Projeto

O **SoftStock Manager** é uma aplicação SPA (Single Page Application) focada em UX (Experiência do Usuário). Diferente de tabelas administrativas comuns, o sistema utiliza um design limpo, validações em tempo real para evitar erros operacionais e feedback visual imediato.

O código foi refatorado para utilizar **Hooks personalizados**, isolando a lógica de negócios da interface visual, facilitando o trabalho da equipe de Back-end.

---

## 📂 Estrutura de Arquivos

A organização do projeto segue o padrão modular para facilitar a manutenção:

```text
src/
├── assets/          # Recursos estáticos (global.css, imagens)
├── components/      # Componentes de UI isolados
│   ├── StockForm.tsx   # Formulário com validação de inputs e conversão numérica
│   └── StockTable.tsx  # Tabela com badges de estoque e formatação de moeda
├── hooks/           # Lógica de Estado (Custom Hooks)
│   └── useStock.ts     # CRUD completo (Add, Update, Delete com confirmação)
├── services/        # Camada reservada para conexão com API (Axios/Fetch)
├── types/           # Tipagem TypeScript (Contrato de dados)
│   └── index.ts        # Interfaces Product e ProductInput
├── App.tsx          # Componente Principal (Layout)
└── main.tsx         # Ponto de entrada (React DOM)
```

---

## 🚀 Funcionalidades

* **CRUD Completo:** Cadastro, Leitura, Edição e Exclusão de itens.
* **Validações Inteligentes:**
    * Impede cadastro sem nome ou categoria.
    * Converte inputs de texto para número automaticamente (evita erro de `NaN`).
* **Gestão Visual de Estoque:**
    * 🟢 **Badge Verde:** Estoque Saudável.
    * 🔴 **Badge Vermelho:** Estoque Baixo (< 5 unidades).
* **Segurança:** Utilização de `window.confirm` nativo antes de excluir um item permanentemente.

---

## 🔗 Integração Back-end (SQL)

O Front-end foi desenhado para espelhar a estrutura do banco de dados relacional. O arquivo SQL de criação das tabelas encontra-se na raiz do projeto como `Trabalho_DB_Vendas.sql`.

### Mapeamento de Dados (De-Para)

Abaixo, a relação entre o objeto JSON enviado pelo React e a tabela do PostgreSQL:

| Campo no Front-end (JSON) | Tipo (TS) | Coluna no Banco (SQL) | Tipo (DB) |
| :--- | :--- | :--- | :--- |
| `name` | string | `nome` | VARCHAR(50) |
| `category` | string | `categoria` | VARCHAR(50) |
| `qty` | number | `estoque` | INT |
| `price` | number | `preco` | DECIMAL(10,2) |

### Exemplo de Payload JSON

```json
{
  "name": "Caneta Gel Pastel",
  "category": "Papelaria",
  "qty": 50,
  "price": 4.50
}
```

---

## ⚡ Como Rodar

Este projeto requer **Node.js** instalado.

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a aplicação:
   O terminal mostrará o link local, geralmente: `http://localhost:5173`

---

## 👥 Autores (Grupo)

| Nome | Função no Projeto |
| :--- | :--- |
| **JULIANE DIAS** | Arquitetura Front-end / UI / React |
| **NOME** | Back-end / Integração API |
| **NOME** | Banco de Dados (SQL) |
| **NOME** | Documentação / QA |

<br>
