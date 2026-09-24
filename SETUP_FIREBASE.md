# 🔥 Setup Completo do Firebase - Alcateia

## 📋 Índice
1. Criar Projeto Firebase
2. Configurar Firestore Database
3. Configurar Regras de Segurança
4. Obter Credenciais
5. Configurar no .env.local
6. Testar Conexão
7. Troubleshooting

---

## 🚀 PASSO 1: Criar Projeto Firebase

### 1.1 Acessar Firebase Console
1. Ir para: **https://console.firebase.google.com**
2. Fazer login com sua conta Google
3. Clicar em **"Criar um projeto"** (ou "Add Project")

### 1.2 Preencher Dados do Projeto
```
Nome do Projeto: Alcateia Treinão Solidário
(ou apenas: Alcateia)

ID do Projeto: alcateia-2026
(automático, você pode modificar)

Analytics: Desativar por enquanto (opcional)
Aceitar termos e criar projeto
```

### 1.3 Aguardar Criação
- Leva ~2 minutos
- Você será redirecionado para o dashboard

---

## 📊 PASSO 2: Configurar Firestore Database

### 2.1 Criar Firestore Database
1. No dashboard Firebase, lado esquerdo → **Build** → **Firestore Database**
2. Clicar em **"Criar banco de dados"**

### 2.2 Configuração do Banco
```
📍 Localização: 
   - Brasil: southamerica-east1 (São Paulo)
   - OU us-central1 (padrão rápido)
   
   ✅ Recomendado: southamerica-east1

⚙️ Modo de Segurança:
   ❌ NÃO escolher "Modo de produção" (muito restritivo)
   ✅ Escolher "Modo de teste"
   
   (Vamos configurar regras depois)

⏰ Duração: 30 dias (para teste)
```

### 2.3 Criação do Banco
- Esperar ~1 minuto
- Você verá uma interface vazia com collections

---

## 🔐 PASSO 3: Configurar Regras de Segurança (Firestore Rules)

### 3.1 Acessar Abas do Firestore
No console Firebase → Firestore Database → Aba **"Regras"**

### 3.2 Substituir Regras (Copiar e Colar)

```javascript
// Regras de Segurança para Alcateia
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ==========================================
    // 🔴 PARTICIPANTES - Collection
    // ==========================================
    match /participants/{participantId} {
      // Leitura: Pública (qualquer um pode ler)
      allow read: if true;
      
      // Escrita: Apenas admin autenticado
      allow create: if request.auth != null 
        && request.auth.uid == 'admin-uid';
      allow update: if request.auth != null 
        && request.auth.uid == 'admin-uid';
      allow delete: if request.auth != null 
        && request.auth.uid == 'admin-uid';
    }
    
    // ==========================================
    // 📊 STATS - Document para estatísticas
    // ==========================================
    match /events/{eventId}/stats/{document=**} {
      // Leitura: Pública
      allow read: if true;
      
      // Escrita: Apenas admin
      allow write: if request.auth != null 
        && request.auth.uid == 'admin-uid';
    }
    
    // ==========================================
    // 👤 ADMIN USERS - Quem pode fazer login
    // ==========================================
    match /admins/{userId} {
      // Apenas o próprio admin pode ler
      allow read: if request.auth != null 
        && request.auth.uid == userId;
      
      // Apenas admin pode escrever
      allow write: if request.auth != null 
        && request.auth.uid == userId;
    }
  }
}
```

### 3.3 Publicar Regras
1. Clicar em **"Publicar"**
2. Confirmar a ação
3. Aguardar ~30 segundos para ativar

---

## 🔑 PASSO 4: Obter Credenciais do Firebase

### 4.1 Acessar Configurações do Projeto
1. No dashboard Firebase, clicar no ⚙️ (engrenagem) → **Configurações do projeto**
2. Aba **"Geral"** (já deve estar aberta)

### 4.2 Descer até "Seus apps"
3. Procurar seção **"Seus apps"** (ou **"Your apps"**)
4. Clicar em **"</>"** (web) se ainda não criou, ou use a app existente

### 4.3 Copiar Credenciais
Se já criou um app:
1. Clicar no ícone de configuração (⚙️) do seu app web
2. Descer até **"Firebase SDK snippet"**
3. Escolher **"Config"** (não CDN)
4. Copiar o objeto que aparece

**Exemplo (valores FICTÍCIOS):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "alcateia-2026.firebaseapp.com",
  projectId: "alcateia-2026",
  storageBucket: "alcateia-2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## ⚙️ PASSO 5: Configurar .env.local

### 5.1 Abrir .env.local
```bash
cd /home/user/ALCATEIA
nano .env.local
# ou abrir com seu editor
```

### 5.2 Substituir pelos Valores do Firebase

```env
# Firebase Configuration (copiar de Firebase Console)
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=alcateia-2026.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=alcateia-2026
VITE_FIREBASE_STORAGE_BUCKET=alcateia-2026.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Admin Panel Password (mudar em produção!)
VITE_ADMIN_PASSWORD=admin

# Google Analytics (opcional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 5.3 Salvar Arquivo
- Salvar com Ctrl+S (ou File → Save)
- **NUNCA** fazer commit do .env.local!

---

## 🧪 PASSO 6: Testar Conexão

### 6.1 Parar o Servidor (se estiver rodando)
```bash
cd /home/user/ALCATEIA
# Pressionar Ctrl+C no terminal
```

### 6.2 Reiniciar em Dev Mode
```bash
npm run dev
# Abrir: http://localhost:3000
```

### 6.3 Verificar Console
1. Abrir DevTools (F12)
2. Ir para aba **"Console"**
3. Procurar por:
   - ❌ Erro vermelho? → Firebase não conectou
   - ✅ Sem erros? → Funcionando!

### 6.4 Testar Firebase Direto (Opcional)
No console do navegador (F12 → Console), digitar:
```javascript
// Teste básico
console.log("Firebase config carregado");

// Se quiser verificar conexão:
import { db } from './src/services/firebase';
console.log("Firestore connection:", db);
```

---

## 🗂️ PASSO 7: Criar Collections no Firestore

### 7.1 Criar Estrutura de Dados

**Collection 1: `participants`**
```
/participants
  ├── {participant1}
  │   ├── fullName: "João Silva"
  │   ├── gender: "Masculino"
  │   ├── birthDate: "1990-01-15"
  │   ├── city: "Laranjal Paulista"
  │   ├── phone: "(15) 99999-0000"
  │   ├── email: "joao@email.com"
  │   ├── shirtSize: "M"
  │   ├── bibNumber: 1
  │   ├── milkDonationAgreed: true
  │   ├── milkDelivered: false
  │   ├── checkedIn: false
  │   └── timestamp: 2026-09-24T10:00:00Z
  │
  └── {participant2}
      └── ... (similar)
```

**Collection 2: `events`** (para dados gerais)
```
/events
  └── /novembre2026
      ├── totalParticipants: 42
      ├── milkCollected: 42
      ├── createdAt: 2026-09-24T10:00:00Z
      └── status: "active"
```

### 7.2 Adicionar Manualmente (Opcional para teste)

1. Em Firestore → Clicar **"Começar uma coleção"**
2. Nome: `participants`
3. ID do documento: `participant1` (automático ou manual)
4. Adicionar campos:
   - `fullName: "João Silva"` (string)
   - `email: "joao@email.com"` (string)
   - `gender: "Masculino"` (string)
   - Etc...
5. Salvar

---

## 📱 PASSO 8: Sincronizar com App

### 8.1 Código que Já Está Pronto

No arquivo `src/services/firebase.ts`:
```typescript
// ✅ Já configurado para sincronizar

export const FirebaseService = {
  subscribeParticipants: (callback) => {
    // Ouve mudanças em tempo real
    const unsubscribe = onSnapshot(collection(db, 'participants'), (snapshot) => {
      const participants = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(participants);
    });
    return unsubscribe;
  },

  seedInitialData: async (participants) => {
    // Envia dados iniciais para Firebase
    for (const participant of participants) {
      await setDoc(doc(db, 'participants', participant.id), participant);
    }
  }
};
```

### 8.2 Testar Sincronização

1. Adicionar um participante pelo formulário do site
2. Abrir Firestore Console
3. Verificar se aparece em `/participants`
4. ✅ Se apareceu = sincronização funcionando!

---

## 🆘 TROUBLESHOOTING

### Erro: "Permission denied"
```
❌ Problema: Regras de segurança muito restritivas
✅ Solução: 
1. Firestore → Abas "Regras"
2. Mudar para "Modo de teste" (permite leitura/escrita)
3. Publicar mudanças
```

### Erro: "Firebase is not defined"
```
❌ Problema: Firebase não foi importado
✅ Solução:
1. Verificar se .env.local está correto
2. Reiniciar servidor: npm run dev
3. Limpar cache: Ctrl+Shift+Delete (F12)
```

### Erro: "CORS error"
```
❌ Problema: Domínio não autorizado
✅ Solução:
1. Firebase Console → Autenticação → Domínios
2. Adicionar: localhost:3000
3. Adicionar: lcapelete-ux.github.io
```

### Erro: "Network error"
```
❌ Problema: Internet ou firewall
✅ Solução:
1. Verificar conexão internet
2. Testar VPN desligada
3. Verificar .env.local tem credenciais válidas
```

---

## 🔐 PASSO 9: Ativar Autenticação (Opcional)

Se quiser login de verdade (não apenas senha fixa):

### 9.1 Ativar Autenticação
1. Firebase Console → **Build** → **Autenticação**
2. Clicar em **"Começar"**
3. Escolher provedor: **Email/Senha**
4. Ativar
5. Ir para abas **"Usuários"**
6. Adicionar um usuário admin:
   - Email: admin@alcateia.com
   - Senha: SenhaForte123!

### 9.2 Usar Autenticação no Código
```typescript
// Exemplo (já parcialmente pronto)
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase';

const handleAdminLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login bem-sucedido:", userCredential.user);
  } catch (error) {
    console.error("Erro no login:", error.message);
  }
};
```

---

## ✅ CHECKLIST FINAL

### Criação do Projeto
- [ ] Criar projeto no Firebase Console
- [ ] Ativar Firestore Database
- [ ] Escolher região: southamerica-east1
- [ ] Modo de Teste ativado

### Configuração de Segurança
- [ ] Regras Firestore publicadas
- [ ] CORS configurado (localhost + GitHub Pages)
- [ ] Senhas seguras

### Credenciais
- [ ] Copiar credenciais do Firebase
- [ ] Colar em .env.local
- [ ] Verificar todos os 6 campos preenchidos
- [ ] .env.local está em .gitignore ✅

### Testes
- [ ] npm run dev funciona
- [ ] Console sem erros (F12)
- [ ] Firestore Console mostra collections
- [ ] Adicionar teste particpante e aparecer no Firestore

### Deploy
- [ ] Build local OK: npm run build
- [ ] Push para GitHub
- [ ] GitHub Pages atualiza
- [ ] Testar login admin funciona

---

## 🎯 RESUMO RÁPIDO (3 MINUTOS)

```bash
# 1. Criar projeto em console.firebase.google.com
# 2. Criar Firestore (southamerica-east1, modo teste)
# 3. Copiar credenciais do project config
# 4. Colar em .env.local:

VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

# 5. npm run dev
# 6. Pronto! ✅
```

---

## 📞 LINKS ÚTEIS

- Firebase Console: https://console.firebase.google.com
- Documentação Firestore: https://firebase.google.com/docs/firestore
- Configuração Web SDK: https://firebase.google.com/docs/web/setup
- Regras Firestore: https://firebase.google.com/docs/firestore/security/start

---

**Tem dúvida em algum passo? Me avisa!** 🚀
