# 🚀 GUIA RÁPIDO: Deploy em 5 Minutos (RENDER.COM)

## ⚡ PASSO 1: Preparação (1 min)

1. **Baixe todos os arquivos** deste app
2. **Crie uma pasta** chamada `analisador-apostas`
3. **Coloque dentro**:
   ```
   server.js
   package.json
   App.jsx
   App.css
   .env.example → renomeia para .env
   public/index.html
   src/index.js
   ```

---

## 🔑 PASSO 2: Chave de API (1 min)

### Você PRECISA de uma chave gratuita:

1. **Vá em**: https://api-football.com
2. **Clique em**: "Get Free Plan"
3. **Cadastre-se** (grátis mesmo)
4. **Pegue sua API Key** (aparece na dashboard)
5. **Abra o arquivo `.env`**
6. **Mude**:
   ```
   FOOTBALL_API_KEY=sua_chave_aqui
   ```
   Para:
   ```
   FOOTBALL_API_KEY=abc123xyz789...
   ```

**Salve o arquivo**

---

## 📤 PASSO 3: Git + GitHub (2 min)

### Se NÃO tem GitHub:
1. Vá em https://github.com
2. Clique "Sign up"
3. Complete o cadastro (grátis)

### Faça upload dos arquivos:

1. No GitHub, clique "+" > "New repository"
2. Nome: `analisador-apostas`
3. Clique "Create repository"
4. Siga as instruções (copiar comandos e colar no terminal)

Ou mais fácil: Arraste os arquivos direto no GitHub

---

## 🌐 PASSO 4: Deploy no Render (1 min)

1. **Vá em**: https://render.com
2. **Clique**: "New +" > "Web Service"
3. **Conecte seu repositório GitHub**:
   - Clique em "Connect account"
   - Autorize
   - Selecione "analisador-apostas"
4. **Configure**:
   - Name: `analisador-apostas` (ou outro)
   - Environment: Node.js
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Clique**: "Create Web Service"

**Espere 5-10 minutos...**

Pronto! 🎉 Seu app estará em:
```
https://seu-app.onrender.com
```

---

## ✅ TESTE AGORA

Abra: `https://seu-app.onrender.com`

Se vir a interface com abas "Brasil", "Europa" e "TOP 10", **funcionou!**

---

## 🔄 ACESSAR DIARIAMENTE

Simplesmente **abra a URL** do seu app:
- `https://seu-app.onrender.com`

Os dados **atualizam automaticamente**:
- A cada 30 minutos
- Todos os dias
- Sem você fazer nada!

---

## 🆘 SE NÃO FUNCIONAR

### Erro 1: "Cannot find API Key"
→ Verifique se colocou a chave no `.env` certinho

### Erro 2: "Deployment failed"
→ Abra a aba "Logs" no Render e veja a mensagem de erro

### Erro 3: App carrega mas sem dados
→ Aguarde 30 minutos (primeira sincronização)

### Erro 4: Branco completo
→ Abra as DevTools (F12) e procure por erros vermelhos

---

## 💡 DICAS

✅ **Salve este guia** em caso de dúvida
✅ **Compartilhe a URL** com amigos
✅ **Bookmark a página** para rápido acesso
✅ **Use a cada manhã** antes de apostar

---

## 📱 ACESSAR DO CELULAR

Abra a URL em qualquer navegador:
- iPhone: Safari
- Android: Chrome/Firefox

Funciona 100% mobile! 📱

---

## 🎯 PRÓXIMAS VEZES

1. Abra: `https://seu-app.onrender.com`
2. Veja os jogos do dia
3. Leia as recomendações
4. Compare odds em Bet365
5. Coloca a aposta

**Simples assim!** 🎲

---

## ❓ PERGUNTAS COMUNS

**P: Preciso fazer algo diariamente?**  
R: Não! Só abrir a URL. Tudo atualiza sozinho.

**P: Custa algo?**  
R: Não! Render oferece 750 horas/mês grátis (mais que suficiente).

**P: Os dados são reais?**  
R: Sim! Conectado à API oficial de futebol.

**P: Funciona no celular?**  
R: Sim! 100% responsivo.

**P: Posso mudar as recomendações?**  
R: Sim, editando `server.js`. Mas depois do primeiro deploy é mais complicado.

---

## 🎉 VOCÊ CONSEGUE!

Este é um app profissional COMPLETO. Parabéns por usar! 🏆

Qualquer dúvida, releia este guia ou veja o README.md completo.

**Boa sorte nas apostas!** ⚽💰
