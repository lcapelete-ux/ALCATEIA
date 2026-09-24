# 🚀 Deploy no GitHub Pages - Alcateia

## ✅ O QUE FOI FEITO

### 1. Branch Principal Criada
```bash
✅ Criada branch 'main' 
✅ Merged com todos os commits de desenvolvimento
✅ Enviado para GitHub (git push)
```

### 2. GitHub Actions Workflow Criado
Arquivo: `.github/workflows/deploy.yml`

**O que faz:**
- ✅ Monitora push na branch `main`
- ✅ Instala dependências automaticamente
- ✅ Faz build com `npm run build`
- ✅ Deploy automático para GitHub Pages

---

## 📍 SEU SITE AO VIVO

**URL (pode variar):**
```
https://lcapelete-ux.github.io/ALCATEIA/
```

**OU (dependendo da configuração):**
```
https://lcapelete-ux.github.io
```

> **Nota:** O site leva 1-2 minutos para publicar após o push

---

## 🔍 VERIFICAR STATUS DO DEPLOY

### Opção 1: Ver Workflow no GitHub
1. Ir para: https://github.com/lcapelete-ux/ALCATEIA
2. Clicar em "Actions" (menu superior)
3. Ver workflow "Deploy to GitHub Pages"
4. Status deve aparecer: ✅ (verde) ou 🔴 (vermelho)

### Opção 2: Verificar GitHub Pages Settings
1. Ir para: https://github.com/lcapelete-ux/ALCATEIA/settings
2. Lado esquerdo → "Pages"
3. Verificar:
   - Branch: `main` ✅
   - Folder: `/ (root)` ✅
   - URL deve aparecer em azul

### Opção 3: Testar Localmente
```bash
npm run dev
# Abre: http://localhost:3000
# Verificar se tudo está funcionando igual ao site publicado
```

---

## ⚠️ SE O SITE APARECE DIFERENTE

### Problema 1: Página está em branco
**Causa:** GitHub Pages não encontrou o build

**Solução:**
```bash
# 1. Verificar se dist/ existe
ls -la dist/

# 2. Se não existir, fazer build:
npm run build

# 3. Fazer commit e push
git add dist/
git commit -m "build: update dist folder"
git push origin main
```

### Problema 2: Estilos não carregam
**Causa:** Caminho base incorreto no Vite

**Solução:**
1. Abrir `vite.config.ts`
2. Adicionar base path:
```typescript
export default defineConfig(() => {
  return {
    base: '/ALCATEIA/',  // ← ADICIONAR ESTA LINHA
    plugins: [react(), tailwindcss()],
    // ... resto da config
  };
});
```
3. Fazer rebuild:
```bash
npm run build
git add .
git commit -m "config: fix base path for GitHub Pages"
git push origin main
```

### Problema 3: Elementos faltando
**Causa:** JavaScript não está carregando

**Solução:**
1. Abrir DevTools (F12)
2. Ver aba "Console" procurando por erros
3. Aba "Network" para ver se arquivos estão 404
4. Comum: caminho de imagens errado

---

## 🔄 FLUXO DE ATUALIZAÇÃO

### Fazer Mudanças → Publicar

```bash
# 1. Fazer mudanças no código
# (ex: editar src/components/Hero.tsx)

# 2. Testar localmente
npm run dev

# 3. Commit
git add .
git commit -m "feat: update hero section"

# 4. Push para main
git push origin main

# 5. GitHub Actions executa automaticamente ✨
# (1-2 minutos depois, site está atualizado)

# 6. Verificar em
# https://lcapelete-ux.github.io/ALCATEIA/
```

---

## 🎯 CHECKLIST FINAL

- [ ] Repositório criado: lcapelete-ux/ALCATEIA ✅
- [ ] Branch main com todos commits ✅
- [ ] Build testado localmente ✅
- [ ] Workflow criado (.github/workflows/deploy.yml) ✅
- [ ] GitHub Pages Settings configurado
- [ ] Site aparece em: https://lcapelete-ux.github.io/ALCATEIA/
- [ ] Estilos (CSS) carregam corretamente
- [ ] Botão WhatsApp funciona
- [ ] Responsivo em mobile

---

## 📊 LOGS DO DEPLOY

Para verificar se deu problema:

```bash
# 1. Ir para GitHub Actions
https://github.com/lcapelete-ux/ALCATEIA/actions

# 2. Clicar no workflow mais recente
# 3. Ver os steps:
#    ✅ Checkout
#    ✅ Setup Node
#    ✅ Install dependencies
#    ✅ Build
#    ✅ Upload artifact
#    ✅ Deploy

# Se algum aparecer ❌, clicar para ver erro
```

---

## 🆘 PROBLEMAS COMUNS E SOLUÇÕES

| Problema | Causa | Solução |
|----------|-------|---------|
| Site em branco | Build não rodou | `npm run build` e push |
| CSS não carrega | Base path errado | Adicionar `base: '/ALCATEIA/'` em vite.config.ts |
| Imagens sumiram | Caminho errado | Verificar paths em componentes |
| WhatsApp não abre | Link errado | Verificar número em App.tsx |
| Workflow falha | Dependência incompatível | Usar `--legacy-peer-deps` |

---

## 📞 SUA URL PUBLICADA

```
┌─────────────────────────────────────────────┐
│  SITE PUBLICADO:                            │
│  https://lcapelete-ux.github.io/ALCATEIA/  │
│                                             │
│  Atualiza automaticamente a cada push!      │
└─────────────────────────────────────────────┘
```

---

## 🔐 SEGURANÇA

Seu repositório é **PÚBLICO**, então:
- ✅ Qualquer um pode ver o código
- ⚠️ Não coloque senhas/chaves aqui
- 🔐 Senhas devem estar em `.env` (local apenas)
- 📌 GitHub Pages não acessa `.env`

---

## ⏱️ PRÓXIMOS PASSOS

1. **Agora:** Verificar se site aparece correto
2. **Logo:** Adicionar seu número WhatsApp (se não fez)
3. **Depois:** Google Analytics + Email marketing
4. **Antes do evento:** Testes finais de responsividade

---

**Qualquer problema, avise! 🎯**
