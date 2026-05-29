# QueueSmart

Sistema web para gerenciamento de filas. Usa Node.js, Express, EJS e PostgreSQL.

## Requisitos

- Node.js 20 ou superior
- npm
- PostgreSQL instalado e rodando
- Git

## Como rodar em outro computador

### 1. Baixar o projeto

```bash
git clone https://github.com/Pedro3495/QueueSmart.git
cd QueueSmart
```

Se o projeto ja estiver em uma pasta, apenas abra o terminal dentro dela.

### 2. Instalar dependencias

```bash
npm install
```

### 3. Criar o banco PostgreSQL

Entre no PostgreSQL com seu usuario local:

```bash
psql -U postgres
```

Crie o banco:

```sql
CREATE DATABASE queuesmart;
```

Saia do `psql`:

```sql
\q
```

### 4. Criar as tabelas

Rode o script SQL do projeto:

```bash
psql -U postgres -d queuesmart -f database/schema.sql
```

Esse script cria as tabelas:

- `usuarios`
- `filas`
- `senhas_fila`

### 5. Configurar o arquivo `.env`

Copie o exemplo:

```bash
copy .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e ajuste os dados do seu PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=queuesmart
DB_USER=postgres
DB_PASSWORD=sua_senha_do_postgres
PORT=3000
SESSION_SECRET=troque_essa_chave_por_uma_chave_grande
```

### 6. Rodar o sistema

```bash
npm start
```

Acesse no navegador:

```text
http://localhost:3000
```

## Fluxo para testar

1. Abra `http://localhost:3000`
2. Clique em cadastro
3. Crie um usuario
4. Faca login
5. Crie uma fila
6. Entre na fila como cliente
7. Use o painel para chamar o proximo cliente

## Comandos uteis

Verificar sintaxe dos arquivos principais:

```bash
npm test
```

Rodar em outra porta:

```bash
PORT=4000 npm start
```

No PowerShell:

```powershell
$env:PORT=4000; npm start
```

## Erros comuns

### `psql` nao e reconhecido

O PostgreSQL nao esta no PATH.

Solucoes:

- abrir o terminal pelo atalho "SQL Shell (psql)"
- reinstalar PostgreSQL marcando a opcao de adicionar ao PATH
- usar o caminho completo do `psql.exe`

### `password authentication failed for user`

A senha no `.env` esta diferente da senha real do PostgreSQL.

Corrija:

```env
DB_PASSWORD=sua_senha_correta
```

### `database "queuesmart" does not exist`

O banco ainda nao foi criado.

Rode:

```sql
CREATE DATABASE queuesmart;
```

### `relation "usuarios" does not exist`

As tabelas ainda nao foram criadas.

Rode:

```bash
psql -U postgres -d queuesmart -f database/schema.sql
```

### `secret option required for sessions`

Falta `SESSION_SECRET` no `.env`.

Adicione:

```env
SESSION_SECRET=troque_essa_chave_por_uma_chave_grande
```

### `EADDRINUSE: address already in use :::3000`

A porta 3000 ja esta sendo usada.

Use outra porta:

```powershell
$env:PORT=4000; npm start
```

Depois acesse:

```text
http://localhost:4000
```

### Tela abre, mas login/cadastro falha

Quase sempre e problema de banco.

Confira:

- PostgreSQL esta rodando
- `.env` esta correto
- banco `queuesmart` existe
- tabelas foram criadas com `database/schema.sql`

## Estrutura principal

```text
server.js                 entrada do sistema
server/db.js              conexao com PostgreSQL
server/routes/auth.js     login, cadastro e dashboard
server/routes/filas.js    criacao e controle de filas
views/                    telas EJS
public/css/               arquivos CSS
database/schema.sql       estrutura do banco
.env.example              exemplo de configuracao
```
