# Entrega - Terceira Avaliacao

## Arquivos finais

- `docs/relatorio-validacao-preco-queuesmart.pdf`
- `docs/pitch-negocio-queuesmart.pdf`

## Arquivos fonte editaveis

- `docs/relatorio-validacao-preco-queuesmart.html`
- `docs/pitch-negocio-queuesmart.html`

## Aplicacao

URL local:

- `http://localhost:3000/`

Login de teste:

- Email: `teste@queuesmart.com`
- Senha: `123456`

## Paginas funcionais

1. Login: `/`
2. Cadastro: `/cadastro`
3. Dashboard: `/dashboard`
4. Nova fila: `/filas/nova`
5. Administracao da fila: `/filas/:id`
6. Cliente na fila: `/cliente/:filaId`
7. Painel publico: `/painel/:filaId`
8. Acessibilidade: `/acessibilidade`

## Requisito de acessibilidade contemplado

O projeto contempla uso correto de HTML, labels em formularios, foco visivel, skip link, navegacao por teclado e pagina dedicada de acessibilidade baseada em WCAG 2.2.

## Ordem sugerida de demonstracao

1. Fazer login.
2. Mostrar dashboard.
3. Criar ou abrir uma fila.
4. Abrir o link do cliente.
5. Entrar na fila.
6. Chamar o proximo cliente no painel admin.
7. Mostrar o painel publico.
8. Mostrar a pagina de acessibilidade.

## Observacoes

- O sistema usa Node.js, Express, EJS e PostgreSQL.
- O painel publico precisa do ID da fila, por exemplo: `/painel/1`.
- A rota `/painel` redireciona para o dashboard para evitar pagina sem contexto.
