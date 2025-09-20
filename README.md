# Controle de Hábitos API

API REST para registro, login, gerenciamento e histórico de hábitos do usuário. Utiliza banco de dados em memória e autenticação via JWT. Documentação disponível via Swagger.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express jsonwebtoken
   ```

## Executando a API

- Para iniciar o servidor:
  ```powershell
  node server.js
  ```
- Para importar o app em testes:
  ```javascript
  const app = require('./app');
  ```

## Endpoints

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login e obtenção de token JWT
- `POST /habits` — Cadastro de hábito (requer token)
- `DELETE /habits/:habitName` — Deletar hábito (requer token)
- `POST /habits/:habitName/complete` — Marcar hábito como concluído (requer token)
- `GET /habits/history` — Consultar histórico de hábitos concluídos (requer token)
- `GET /api-docs` — Documentação Swagger

## Regras de Negócio

- Login e senha obrigatórios para autenticação.
- Token JWT necessário para operações de hábitos.
- Não é permitido cadastrar hábitos duplicados.
- Só é possível consultar hábitos marcados como concluídos.
- É possível deletar hábitos cadastrados.

## Testes

Para testar a API, utilize ferramentas como Postman, Insomnia ou Supertest.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.
