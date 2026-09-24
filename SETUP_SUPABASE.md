# 🚀 Setup Completo do Supabase - Alcateia

## 📋 Índice
1. Criar Projeto Supabase
2. Configurar Banco de Dados PostgreSQL
3. Criar Tabelas
4. Configurar Segurança (Row Level Security)
5. Obter Credenciais
6. Configurar no .env.local
7. Testar Conexão
8. Troubleshooting

---

## 🚀 PASSO 1: Criar Projeto Supabase

### 1.1 Acessar Supabase Console
1. Ir para: **https://supabase.com**
2. Fazer login com GitHub ou email
3. Clicar em **"New Project"** ou **"Novo Projeto"**

### 1.2 Preencher Dados do Projeto
```
Nome do Projeto: Alcateia Treinão Solidário
Database Password: [Gerar uma senha forte - guardar em local seguro]
Region: South America (São Paulo) - sa-east-1
```

### 1.3 Aguardar Criação
- Leva ~2-3 minutos
- Você será redirecionado para o dashboard do projeto

---

## 📊 PASSO 2: Estrutura do Banco de Dados

O Supabase já cria automaticamente o banco PostgreSQL. Você precisa criar uma tabela `participants`:

### 2.1 Ir para SQL Editor
1. No dashboard, clique em **"SQL Editor"** (lado esquerdo)
2. Clique em **"New Query"**

### 2.2 Criar Tabela de Participantes
Cole este SQL e execute:

```sql
CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  bibNumber INTEGER UNIQUE NOT NULL,
  fullName TEXT NOT NULL,
  gender TEXT,
  birthDate TEXT,
  age INTEGER,
  city TEXT,
  state TEXT,
  team TEXT,
  phone TEXT,
  cpf TEXT,
  shirtSize TEXT,
  modality TEXT,
  price DECIMAL(10, 2),
  milkDonationAgreed BOOLEAN DEFAULT false,
  milkDelivered BOOLEAN DEFAULT false,
  isKitEligible BOOLEAN DEFAULT false,
  paymentStatus TEXT DEFAULT 'Pendente',
  paymentMethod TEXT,
  checkedIn BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Criar índice em bibNumber para buscas rápidas
CREATE INDEX idx_participants_bibNumber ON participants(bibNumber);

-- Criar índice em paymentStatus
CREATE INDEX idx_participants_paymentStatus ON participants(paymentStatus);

-- Habilitar RLS (Row Level Security)
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
```

### 2.3 Executar Query
- Clique em **"Run"** ou pressione **Ctrl+Enter**
- Você verá "Success" se tudo correu bem

---

## 🔐 PASSO 3: Configurar Row Level Security (RLS)

### 3.1 Criar Políticas de Segurança

**Política 1: Leitura Pública**
```sql
CREATE POLICY "Enable read access for all users" ON participants
  FOR SELECT
  USING (true);
```

**Política 2: Escrita para Autenticados**
```sql
CREATE POLICY "Enable write access for authenticated users" ON participants
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

**Política 3: Atualização para Autenticados**
```sql
CREATE POLICY "Enable update for authenticated users" ON participants
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

**Política 4: Deleção para Autenticados**
```sql
CREATE POLICY "Enable delete for authenticated users" ON participants
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 3.2 Executar Cada Política
- Execute uma por uma no SQL Editor
- Cada uma deve mostrar "Success"

---

## 📋 PASSO 4: Habilitar Realtime

### 4.1 Ir para Realtime
1. No menu esquerdo, clique em **"Database"** → **"Realtime"**
2. Procure pela tabela `participants`
3. Clique no toggle para **ativar Realtime**

Isso permite que o aplicativo receba atualizações em tempo real quando os dados mudam!

---

## 🔑 PASSO 5: Obter Credenciais do Supabase

### 5.1 Acessar Configurações do Projeto
1. Clique no ícone ⚙️ (engrenagem) no canto inferior esquerdo
2. Escolha **"Project Settings"** (ou "Configurações do Projeto")

### 5.2 Copiar Credenciais
1. Vá para a aba **"API"**
2. Procure por:
   - **Project URL** (https://seu-projeto.supabase.co)
   - **anon key** (chave pública)

**⚠️ Importante:**
- Nunca compartilhe a `service_role_key` (chave privada)
- A `anon key` é segura para usar no frontend
- O `Project URL` é público

---

## ⚙️ PASSO 6: Configurar .env.local

### 6.1 Abrir .env.local
```bash
cd /home/user/ALCATEIA
nano .env.local
# ou abrir com seu editor
```

### 6.2 Substituir pelos Valores do Supabase

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=seu_anon_key_aqui

# Admin Panel Password (Development only - change in production!)
VITE_ADMIN_PASSWORD=admin

# Google Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 6.3 Salvar Arquivo
- Salvar com Ctrl+S (ou File → Save)
- **NUNCA** fazer commit do .env.local!

---

## 🧪 PASSO 7: Testar Conexão

### 7.1 Parar o Servidor (se estiver rodando)
```bash
cd /home/user/ALCATEIA
# Pressionar Ctrl+C no terminal
```

### 7.2 Reiniciar em Dev Mode
```bash
npm run dev
# Abrir: http://localhost:3000
```

### 7.3 Verificar Console
1. Abrir DevTools (F12)
2. Ir para aba **"Console"**
3. Procurar por:
   - ❌ Erro vermelho sobre Supabase? → Configuração incorreta
   - ✅ Mensagem "Supabase connection successful"? → Funcionando!

---

## 📝 PASSO 8: Testar Funcionalidades

### 8.1 Registrar um Participante
1. No site, preencha o formulário de registro
2. Clique em **"Confirmar Inscrição"**
3. Vá ao Dashboard do Supabase

### 8.2 Verificar Dados no Supabase
1. Supabase Console → **"Table Editor"** (ou Editor de Tabelas)
2. Clique em **"participants"**
3. Você deve ver o novo participante!

### 8.3 Testar Realtime
1. Abra o site em duas abas diferentes (ou em outro dispositivo)
2. Registre um participante em uma aba
3. A outra aba deve atualizar automaticamente!

---

## 🆘 TROUBLESHOOTING

### Erro: "Connection refused" ou "Cannot reach Supabase"
```
❌ Problema: URL do Supabase incorreta ou sem internet
✅ Solução:
1. Verificar .env.local tem VITE_SUPABASE_URL correto
2. Verificar conectividade internet
3. Copiar URL do Supabase novamente do dashboard
```

### Erro: "Invalid API key"
```
❌ Problema: Chave (anon key) incorreta
✅ Solução:
1. Voltar ao Supabase Console
2. Settings → API
3. Copiar a `anon key` novamente
4. Colar em .env.local como VITE_SUPABASE_ANON_KEY
5. Reiniciar: npm run dev
```

### Erro: "Permission denied"
```
❌ Problema: RLS (Row Level Security) muito restritivo
✅ Solução:
1. Ir para: Database → Policies
2. Verificar se políticas foram criadas corretamente
3. Se necessário, usar SQL Editor para re-criar as políticas
```

### Dados não sincronizam em tempo real
```
❌ Problema: Realtime não ativado
✅ Solução:
1. Database → Realtime
2. Procurar tabela "participants"
3. Clicar no toggle para ATIVAR
4. Recarregar o site (F5)
```

### Erro: "Relation "participants" does not exist"
```
❌ Problema: Tabela não foi criada
✅ Solução:
1. SQL Editor → New Query
2. Copiar o SQL do Passo 2.2
3. Executar (Ctrl+Enter)
4. Verificar se mostra "Success"
```

---

## 🌐 PASSO 9: Deployment para GitHub Pages

### 9.1 Fazer Commit das Mudanças
```bash
cd /home/user/ALCATEIA
git add .
git commit -m "feat: Migrate from Firebase to Supabase

- Replace Firebase with Supabase PostgreSQL
- Update environment variables and services
- Add Supabase integration guide
- Maintain real-time data synchronization"
```

### 9.2 Push para GitHub
```bash
git push origin main
```

### 9.3 GitHub Pages Auto-Deploy
- GitHub Actions vai compilar automaticamente
- Site estará disponível em: https://lcapelete-ux.github.io/ALCATEIA/

---

## ✅ CHECKLIST FINAL

### Criação do Projeto
- [ ] Criar projeto no Supabase Console
- [ ] Salvar Database Password em local seguro
- [ ] Escolher região: South America (São Paulo)

### Configuração de Banco de Dados
- [ ] Criar tabela `participants` via SQL Editor
- [ ] Criar índices para performance
- [ ] Habilitar RLS (Row Level Security)

### Segurança
- [ ] Criar 4 políticas de RLS (Select, Insert, Update, Delete)
- [ ] Habilitar Realtime na tabela `participants`
- [ ] Copiar credenciais corretamente

### Configuração Local
- [ ] Copiar Project URL do Supabase
- [ ] Copiar anon key do Supabase
- [ ] Colar em .env.local (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY)
- [ ] Verificar .env.local está em .gitignore ✅

### Testes Locais
- [ ] npm run dev funciona
- [ ] Console sem erros (F12)
- [ ] Registrar um participante
- [ ] Ver dados aparecerem em tempo real no Supabase

### Deploy
- [ ] Build local OK: npm run build
- [ ] Push para GitHub
- [ ] GitHub Pages atualiza
- [ ] Testar site em produção

---

## 🎯 RESUMO RÁPIDO (5 MINUTOS)

```bash
# 1. Criar projeto em supabase.com
# 2. SQL Editor → New Query → Executar SQL da tabela
# 3. Database → Realtime → Ativar participants
# 4. Settings → API → Copiar URL e anon key
# 5. .env.local:

VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# 6. npm run dev
# 7. Pronto! ✅
```

---

## 📞 LINKS ÚTEIS

- Supabase Console: https://app.supabase.com
- Documentação Supabase: https://supabase.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security
- Realtime Documentation: https://supabase.com/docs/guides/realtime

---

## 🔄 Diferenças entre Firebase e Supabase

| Aspecto | Firebase | Supabase |
|---------|----------|----------|
| Banco de Dados | NoSQL (Firestore) | PostgreSQL (SQL) |
| Autenticação | Firebase Auth | Supabase Auth (built-in) |
| Realtime | Sim (Firestore Listeners) | Sim (Postgres Subscriptions) |
| Custo | Pay-as-you-go | Mais previsível |
| Escalabilidade | Ilimitada | Escalável |
| Vendor Lock-in | Alto | Baixo (PostgreSQL padrão) |

---

**Tem dúvida em algum passo? Me avisa!** 🚀
