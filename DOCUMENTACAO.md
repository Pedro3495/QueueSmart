# QueueSmart

## Resumo
Aplicacao web para gerenciamento de filas, com autenticacao de usuarios, criacao de filas por administrador e entrada de clientes em filas.

## Stack
- Backend: Node.js
- Framework web: Express `5.2.1`
- Template engine: EJS `5.0.1`
- Banco de dados: PostgreSQL
- Driver do banco: `pg` `8.20.0`
- Autenticacao/sessao: `express-session` `1.19.0`
- Hash de senha: `bcrypt` `6.0.0`
- Variaveis de ambiente: `dotenv` `17.4.1`
- Geracao de documentos: `docx` `9.6.1`

## Estrutura do projeto
- `server.js`: ponto de entrada da aplicacao
- `server/db.js`: conexao com PostgreSQL via `Pool`
- `server/routes/auth.js`: login, cadastro, dashboard, logout
- `server/routes/filas.js`: criacao e gerenciamento de filas
- `views/`: telas EJS
- `public/css/`: estilos por pagina
- `.env`: configuracoes de ambiente

## Fluxo principal
1. Usuario acessa login ou cadastro
2. Sistema autentica com sessao em memoria
3. Usuario autenticado acessa dashboard
4. Usuario cria e administra filas
5. Cliente entra em uma fila e acompanha sua posicao
6. Painel publico exibe chamada atual e proximos clientes

## Rotas principais
- `GET /`: tela de login
- `GET /cadastro`: tela de cadastro
- `POST /cadastro`: cria usuario
- `POST /login`: autentica usuario
- `GET /dashboard`: lista filas do usuario autenticado
- `GET /filas/nova`: formulario para nova fila
- `POST /filas/nova`: cria fila
- `GET /filas/:id`: painel administrativo da fila
- `POST /filas/:id/chamar`: chama proximo cliente
- `GET /cliente/:filaId`: painel do cliente na fila
- `POST /cliente/:filaId/entrar`: entra na fila
- `GET /painel/:filaId`: painel publico de chamada da fila
- `GET /sair`: encerra sessao

## Views encontradas
- `login.ejs`
- `cadastro.ejs`
- `dashboard.ejs`
- `nova-fila.ejs`
- `fila-admin.ejs`
- `cliente.ejs`
- `painel.ejs`
- `acessibilidade.ejs`

## Configuracao esperada
Variaveis no `.env`:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `PORT`
- `SESSION_SECRET`

## Testes feitos
Testes executados nesta analise:
- Leitura e validacao da estrutura do projeto
- Verificacao de sintaxe com `node --check` em:
  - `server.js`
  - `server/db.js`
  - `server/routes/auth.js`
  - `server/routes/filas.js`
- Carregamento dos modulos com:
  - `require('./server/routes/auth')`
  - `require('./server/routes/filas')`
  - `require('./server/db')`

## Resultado dos testes
- Sintaxe dos arquivos principais: OK
- Importacao dos modulos principais: OK
- Script `npm test`: nao existe suite automatizada no projeto no momento

## Observacoes
- O projeto usa `CommonJS` (`"type": "commonjs"` no `package.json`)
- As rotas de filas dependem de usuario autenticado em sessao
- Hoje nao ha testes automatizados implementados no repositorio
