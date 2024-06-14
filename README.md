# Cadastro de Funcionários
![image](/screenshot.png)

## Descrição

Este projeto é uma aplicação web para cadastro de funcionários. Ele permite adicionar, editar, excluir e visualizar funcionários utilizando um backend em Node.js com Express e Sequelize, e um frontend simples com HTMX e Tailwind CSS.

## Requisitos

- Node.js (versão 12 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/esscova/meus-funcionarios.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd seu-projeto
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

## Configuração

O banco de dados SQLite é configurado automaticamente. Certifique-se de que o diretório `db` existe na raiz do projeto.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Inicia o servidor em modo de desenvolvimento usando `nodemon`. O servidor será recarregado automaticamente se houver alterações nos arquivos.

### `npm run dev-css`

Inicia o Tailwind CSS em modo de observação. Ele recompilará os estilos sempre que os arquivos CSS forem alterados.

## Uso

1. Inicie o servidor:
    ```sh
    npm run dev
    ```

2. Inicie o Tailwind CSS em modo de observação:
    ```sh
    npm run dev-css
    ```

3. Acesse a aplicação no navegador:
    ```
    http://localhost:3333
    ```

## Funcionalidades

- **Cadastro de funcionários**: Adicione novos funcionários preenchendo os campos necessários.
- **Listagem de funcionários**: Visualize todos os funcionários cadastrados.
- **Atualização de informações**: Edite as informações dos funcionários.
- **Exclusão de funcionários**: Remova funcionários do sistema.
- **Busca de funcionários**: Pesquise funcionários pelo nome.

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - Sequelize
  - SQLite3
- **Frontend**:
  - HTMX
  - Tailwind CSS

## Estrutura do Projeto

```plaintext
├── db
│   └── database.sqlite  # Banco de dados SQLite
├── public               # Arquivos públicos
│   ├── index.html       # Página principal
│   ├── styles.css       # Estilos adicionais
│   └── output.css       # Estilos gerados pelo Tailwind CSS
├── server.js            # Servidor Express
├── script.js            # Script para manipulação do frontend com HTMX
└── package.json         # Configurações do projeto e dependências
```

## Rotas da API
Essas rotas gerenciam operações CRUD (Create, Read, Update, Delete).

1. **GET `/test`**
   - **Descrição:** Testa se a API está funcionando.
   - **Resposta:** Retorna a mensagem 'api rodando'.

2. **POST `/colaboradores`**
   - **Descrição:** Adiciona um novo colaborador ao banco de dados.
   - **Parâmetros:** `nome`, `email`, `cargo`, `status` no corpo da requisição.
   - **Resposta:** Mensagem indicando sucesso ou erro no cadastro do colaborador.

3. **GET `/colaboradores`**
   - **Descrição:** Retorna uma lista de todos os colaboradores.
   - **Resposta:** HTML com informações dos colaboradores, incluindo nome, email, cargo e status.

4. **PUT `/colaboradores`**
   - **Descrição:** Atualiza as informações de um colaborador existente.
   - **Parâmetros:** `id`, `nome`, `email`, `cargo`, `status` no corpo da requisição.
   - **Resposta:** Mensagem indicando sucesso ou erro na atualização dos dados do colaborador.

5. **GET `/search`**
   - **Descrição:** Busca colaboradores pelo nome.
   - **Parâmetros:** `search` na query string.
   - **Resposta:** HTML com informações dos colaboradores encontrados ou mensagem indicando que o colaborador não foi encontrado.

6. **DELETE `/colaboradores/:id`**
   - **Descrição:** Deleta um colaborador pelo ID.
   - **Parâmetros:** `id` como parâmetro de rota.
   - **Resposta:** Mensagem indicando sucesso ou erro na deleção do colaborador.
