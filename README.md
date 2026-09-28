# Treinão Solidário Alcateia

Site estático (index.html + app.js + images) hospedado no Netlify, com banco no Supabase.

## Banco de dados (Supabase > SQL Editor)
1. Rode `supabase/01_banco_completo.sql` (tabela, segurança e funções).
2. Edite a senha em `supabase/02_usuario_admin.sql` e rode (cria/conserta o login do organizador).
3. Rode `supabase/03_migrar_inscricoes_antigas.sql` para copiar as inscrições da tabela antiga `participants` (ela não é alterada).

Login do painel: usuário `alcateia` + a senha definida no passo 2.

## Netlify
Sem build: publica a pasta raiz (`netlify.toml`).
