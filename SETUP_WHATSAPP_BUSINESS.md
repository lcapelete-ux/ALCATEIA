# 💬 Setup WhatsApp Business para Alcateia

## 🎯 O Que Você Ganha

- ✅ Botão flutuante na página (já está no código!)
- ✅ Chat direto com clientes sem dar número pessoal
- ✅ Histórico centralizado de conversas
- ✅ Respostas automáticas (auto-reply)
- ✅ Integração com CRM (TagPlus, Shopify, etc)

---

## 🚀 PASSO 1: Descobrir Seu Número WhatsApp

**Seu setup atual (que vejo na sua descrição):**
- Você usa WhatsApp para atender clientes da Eucalyptus
- Provavelmente um número de celular + código do país (55)

### Como verificar seu número:
1. Abrir WhatsApp
2. Menu > Configurações > Conta
3. Número de telefone deve aparecer (ex: +55 19 98765-4321)
4. **Remover os traços e espaços** para o código:
   - De: +55 19 98765-4321
   - Para: 5519987654321

---

## 🔗 PASSO 2: Integrar no Site (Já Pronto!)

### Localização do Código
**Arquivo:** `/src/components/WhatsAppButton.tsx`

### Como funciona:
```javascript
// Link WhatsApp genérico:
https://wa.me/5519987654321?text=Olá!

// Link WhatsApp com mensagem pré-preenchida:
https://wa.me/5519987654321?text=Quero%20me%20registrar%20no%20Treinão%20Alcateia
```

### Mudar seu número (IMPORTANTE!)
No arquivo `src/App.tsx` (linha ~130), você vê:

```tsx
<WhatsAppButton
  phoneNumber="5519987654321"  // ⬅️ MUDE ESTE NÚMERO!
  message="Olá! Gostaria de saber mais sobre o Treinão Solidário Alcateia 2026 🐺"
/>
```

**Como atualizar:**
1. Abrir `src/App.tsx`
2. Substituir "5519987654321" pelo SEU número (sem traços)
3. Salvar
4. Testar em localhost: `npm run dev`
5. Fazer commit: `git add . && git commit -m "chore: update whatsapp number"`

---

## 📱 PASSO 3: Usar WhatsApp Business (Opcional mas Recomendado)

### Opção A: Grátis - WhatsApp Web + Desktop
```
1. Abrir: https://web.whatsapp.com
2. Escanear QR code com seu celular
3. Pronto! Usar no PC também
```

### Opção B: WhatsApp Business (Recomendado)
**Vantagens:**
- Respostas automáticas
- Catálogo de produtos
- Integração com Meta
- Etiquetas e categorias

**Setup (gratuito):**
1. Baixar app "WhatsApp Business" (Google Play / App Store)
2. Confirmar número
3. Configurar:
   - Perfil negócio (nome: "Alcateia Events")
   - Foto do logo
   - Descrição: "Treinão Solidário - Novembro Azul"
   - Resposta automática para fora do expediente

---

## 🤖 PASSO 4: Respostas Automáticas (Auto-Reply)

### No WhatsApp Business
1. Configurações > Ferramentas de negócio > Mensagens rápidas
2. Criar respostas automáticas:

**Exemplo 1:**
```
Atalho: /oi
Resposta: "Olá! 👋 Bem-vindo ao Treinão Solidário Alcateia! 
Posso ajudar com:
1️⃣ Dúvidas sobre o evento
2️⃣ Registrar-se
3️⃣ Falar com um organizador
Digite o número!"
```

**Exemplo 2:**
```
Atalho: /horario
Resposta: "⏰ Treinão Solidário Alcateia
📅 Dia: 08 de novembro (sexta)
🕖 Concentração: 07h00
🏃 Largada: 07h30
📍 Local: [Seu local aqui]"
```

**Exemplo 3:**
```
Atalho: /kit
Resposta: "🎁 Kits Inclusos:
✅ Camiseta oficial Alcateia
✅ Garrafinha reutilizável
✅ Número de corredor
Limitado a 150 participantes!"
```

### No WhatsApp Web
1. Menu > Configurações > Notificações
2. Ativar "Notificações de desktop"
3. Não há auto-reply (use o Business)

---

## 📊 PASSO 5: Monitorar Mensagens

### Métricas a rastrear:
```
Diariamente:
- Quantas mensagens via site
- Quantas conversam direto
- Drop-off (pessoas que abrem mas não escrevem)

Semanalmente:
- Taxa de resposta (quanto tempo leva responder)
- Conversão (quem vira inscrito)
- NPS (satisfação do cliente)
```

### Usar etiquetas no WhatsApp Business:
- 🔴 Não respondido
- 🟡 Aguardando resposta
- 🟢 Convertido (registrou)
- 💙 VIP (potencial grande comprador)

---

## 🎯 PASSO 6: Fluxo de Conversa Ideal

```
CLIENTE:
"Quero me registrar"

VOCÊ (resposta automática ou rápida):
"Ótimo! 🎉 Bem-vindo à Alcateia!

Para finalizar seu registro:
1. Acesse: [link do site]
2. Preencha o formulário
3. Escolha seu kit
4. Confirme

Ou eu posso ajudar aqui mesmo. Qual seu nome?"

CLIENTE:
"Meu nome é João Silva"

VOCÊ:
"João! Tudo bem? 👋
Qual sua data de nascimento? (Para o certificado)"

[... mais perguntas conforme necessário ...]

VOCÊ (após confirmar):
"Perfeito, João! ✅
Seu registro foi confirmado!
📧 Enviamos confirmação por email
🐺 Você é parte da Alcateia agora!

Qualquer dúvida, só chamar!"
```

---

## 💰 PASSO 7: Integração com TagPlus (Seu Sistema)

**Hipótese:** Você usa TagPlus para gerir a empresa

### Como integrar conversas do site com TagPlus:
```bash
# Opção 1: Manual
- Copiar dados do formulário do site
- Colar no TagPlus como nova venda

# Opção 2: Automático (Zapier)
- Conectar site → Zapier → TagPlus
- Criar automação: "Se registrou no site, criar contato no TagPlus"
- Link: https://zapier.com

# Opção 3: Integração nativa
- Se TagPlus tem API, pedir ao dev para conectar
```

---

## 🔧 PASSO 8: Tratamento de Objeções via Chat

**Preparar respostas para objeções comuns:**

### "Tá caro"
```
"Entendo! 💙 Mas pense:
✅ Você GANHA um kit (camiseta + garrafa)
✅ Seu dinheiro vai pra um asilo (causa social)
✅ Você se exercita
✅ Conhece novas pessoas

Avançamos pra você? Qual seu nome?"
```

### "Vou pensar"
```
"Sem problema! 😊 Mas avisos importantes:
⚠️ Temos apenas 150 vagas
⚠️ Já confirmaram [X] pessoas
⚠️ Faltam [Y] dias para o evento

Quer guardar sua vaga? Posso anotar aqui.
Qual seu contato? (Email + celular)"
```

### "Posso levar amigos?"
```
"Claro! 🎉 Quanto mais, melhor!
Seus amigos precisam se registrar aqui: [link]
Assim garantem o kit deles também.

Já sabe quantos vão?"
```

---

## 📋 PASSO 9: Checklist Pré-Evento

```
2 semanas antes (25/10):
- [ ] WhatsApp Business configurado
- [ ] Auto-replies testadas
- [ ] Número correto no site
- [ ] Time notificado

1 semana antes (01/11):
- [ ] Enviar lembrete para inscritos
- [ ] Responder todas mensagens pendentes
- [ ] Confirmar dados de participantes

1 dia antes (07/11):
- [ ] Último lembrete via WhatsApp
- [ ] Confirmar local do evento
- [ ] Testar envio de certificados

Dia do evento (08/11):
- [ ] Equipe monitorando WhatsApp
- [ ] Responder dúvidas em tempo real
- [ ] Tirar fotos para Instagram Stories
- [ ] Compartilhar ao vivo no WhatsApp Status
```

---

## 🎬 PASSO 10: Marketing Pós-Evento

### Sequência de Mensagens (automática no Zapier):
```
Logo após evento:
"Obrigado por participar! 🐺💙
Sua foto do evento: [link]
[Compartilhe sua experiência]"

1 dia depois:
"Seu certificado digital está pronto!
[Link para download]
Compartilhe no LinkedIn: #AlcateiRun2026"

1 semana depois:
"Próximo evento será em [data]
Quer receber por primeiro? Clique: [link]"

1 mês depois:
"Saudades da Alcateia? 🐺
Nova turma de treino em [data]
Vagas abertas: [link]"
```

---

## 🎯 NÚMEROS A MONITORAR

```
KPI (Key Performance Indicators)

1. Taxa de Clique no WhatsApp (CTR)
   Meta: > 10% dos visitantes clicam

2. Taxa de Conversão WhatsApp
   Meta: 30-50% das mensagens = registro

3. Tempo de Resposta
   Meta: < 2 horas

4. Satisfação (NPS)
   Meta: 8+ em escala 1-10

5. Retenção pós-evento
   Meta: 60%+ para próximo evento
```

---

## 🚨 Erros Comuns

```
❌ NÃO fazer:
- Usar número pessoal sem privacidade
- Não responder mensagens
- Enviar spam / promoções demais
- Horários inapropiados (madrugada)
- Ignorar feedback negativo

✅ SIM fazer:
- Responder em < 2h (de segunda a sexta)
- Ser amigável e humano
- Respeitar privacidade do cliente
- Usar horário comercial
- Resolver problemas rapidamente
```

---

## 🎁 Template de Mensagem para Site

**Usar em botões CTA:**

```
🐺 CHAT DIRETO NO WHATSAPP

"Clique para falar com um organizador.
Dúvidas? Quer se registrar? A gente resolve aqui!"

Opções que aparecem:
1. ❓ Dúvidas sobre o evento
2. 📝 Quero me registrar  
3. 🤝 Sou patrocinador
4. 💬 Outro assunto
```

---

## 📞 Seu Setup Final

```
NÚMERO: 55 + 19 + XXXXX-XXXX (remover traços)
= 5519XXXXX

NO SITE: Substituir em src/App.tsx

STATUS: ✅ Pronto para teste local
PRÓXIMO: npm run dev + testar clique
```

---

**Qualquer dúvida, ajustarei conforme sua resposta!** 🎯

Informações que preciso:
- [ ] Qual é seu número WhatsApp exato?
- [ ] Quer usar WhatsApp Business ou só Web?
- [ ] Já usa TagPlus? (para integração)
- [ ] Qual seu email para receber mensagens site?
