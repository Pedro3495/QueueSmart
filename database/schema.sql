CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS filas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'ativa',
    criada_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS senhas_fila (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fila_id INTEGER NOT NULL REFERENCES filas(id) ON DELETE CASCADE,
    posicao INTEGER NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'aguardando',
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_filas_usuario_id ON filas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_senhas_fila_fila_id ON senhas_fila(fila_id);
CREATE INDEX IF NOT EXISTS idx_senhas_fila_usuario_id ON senhas_fila(usuario_id);
