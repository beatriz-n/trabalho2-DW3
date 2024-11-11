CREATE TABLE IF NOT EXISTS contas_pagar (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    data_vencimento DATE NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    removido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO contas_pagar (descricao, data_vencimento, valor, removido) VALUES
('Compra de material de escritório', '2024-10-20', 450.75, FALSE),
('Serviço de limpeza mensal', '2024-10-25', 300.00, FALSE),
('Consultoria de TI', '2024-11-10', 1200.00, FALSE);

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf')))
ON CONFLICT DO NOTHING;