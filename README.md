# EduFlow – Gerenciamento Acadêmico

## Ideia do Projeto

O EduFlow é um sistema acadêmico que permite gerenciar tarefas, turmas, disciplinas e usuários de forma organizada.

- **Professores** podem cadastrar tarefas para suas disciplinas.
- **Alunos** podem acompanhar suas tarefas, ver prazos, status e feedback.
- **Administrador (ADM)** cadastra turmas, disciplinas e professores, garantindo que o sistema esteja organizado e atualizado.

O objetivo é facilitar o acompanhamento acadêmico e tornar a comunicação entre professores e alunos mais eficiente.

---

## Requisitos do Sistema

Antes de rodar a aplicação, certifique-se de ter instalado:

### Backend (Ruby on Rails)

- **Ruby** ≥ 3.0
- **Rails** ≥ 7.0
- **PostgreSQL** ≥ 9.3
- **Bundler**

### Frontend (Next.js + React)

- **Node.js** ≥ 16
- **NPM** ≥ 8

---

## Como Rodar a Aplicação

### Backend (Ruby on Rails)

1. Clone o repositório:

```bash
git clone https://github.com/Lusca-umaia/edu-flow.git
cd ./backend
```

2. Instale as dependências:

```bash
bundle install
```

3. Configure o .env

```bash
# Vale lembrar que é importante verificar as informações do banco de dados, para assegurar as funcionalidade do sistema

MEU_APP_DATABASE_PASSWORD=SUA_SENHA_AQUI
```

3. Configure o banco de dados:

```bash
rails db:create
rails db:migrate
rails db:seed
```

4. Rode o servidor Rails:

```bash
rails server
```

O backend estará disponível em `http://localhost:8080`.

---

### Frontend (Next.js + React)

1. Acesse a pasta do frontend:

```bash
# Importante estar na raiz do projeto
cd ./frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode a aplicação:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

> Lembre-se de configurar a URL da API no frontend (axios) para apontar para `http://localhost:8080` - Apesar de eu já ter feito isso, é bom garantir.

---

## Tecnologias Usadas

- **Backend:** Ruby on Rails, PostgreSQL
- **Frontend:** React + Next.js + Tailwind CSS
- **Validação de Formulários:** Zod
- **Requisições HTTP:** Axios
- **Controle de Estado e Contextos:** React Context API

### Vídeo com demonstração das funcionalidades:

`https://www.youtube.com/watch?v=Pg3p0kz6XwI`
