# ⚽ Analisador PRO Bet365 - App Completo com Atualização Automática

Um aplicativo profissional que **busca dados reais**, **analisa automaticamente** e **gera recomendações de apostas** todos os dias.

---

## 🚀 COMO USAR (3 OPÇÕES)

### **OPÇÃO 1: DEPLOY GRÁTIS EM 5 MINUTOS (RENDER.COM)** ⭐ RECOMENDADO

#### Passo 1: Preparar os arquivos
1. Crie uma pasta chamada `analisador-apostas`
2. Coloque dentro:
   - `server.js`
   - `package.json`
   - `App.jsx`
   - `App.css`
   - Crie um arquivo `.env` com:
   ```
   FOOTBALL_API_KEY=sua_chave_aqui
   PORT=3000
   ```

#### Passo 2: Criar repositório Git
```bash
cd analisador-apostas
git init
git add .
git commit -m "Initial commit"
```

#### Passo 3: Fazer deploy no Render
1. Vá em [render.com](https://render.com)
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
5. Clique em "Create Web Service"
6. Espere deployar (5-10 minutos)

Pronto! Seu app estará em `https://seu-app.onrender.com`

---

### **OPÇÃO 2: RODAR LOCALMENTE (PC/MAC/LINUX)**

#### Passo 1: Instalar Node.js
Baixe em [nodejs.org](https://nodejs.org) (versão LTS)

#### Passo 2: Clonar/Baixar os arquivos
```bash
# Se tiver git
git clone seu-repositorio
cd analisador-apostas

# Se não tiver, só extrai a pasta
```

#### Passo 3: Instalar dependências
```bash
npm install
```

#### Passo 4: Criar arquivo .env
Crie um arquivo `.env` na raiz:
```
FOOTBALL_API_KEY=sua_chave_aqui
PORT=3000
```

#### Passo 5: Rodar o servidor
```bash
npm start
```

Pronto! Abra [http://localhost:3000](http://localhost:3000)

---

### **OPÇÃO 3: DEPLOY HEROKU GRÁTIS (Antigo, mas funciona)**

```bash
# Instalar Heroku CLI
# Depois:
heroku login
heroku create seu-app-name
git push heroku main
heroku open
```

---

## 📊 COMO FUNCIONA

### Backend (server.js)
- ✅ Busca dados reais de partidas do dia
- ✅ Calcula médias dos últimos 10 jogos
- ✅ Gera recomendações automaticamente
- ✅ Atualiza cache a cada 1 hora
- ✅ Roda 24/7 sem intervenção

### Frontend (React)
- ✅ Interface moderna e responsiva
- ✅ Abas: Brasil, Europa, TOP 10
- ✅ Filtros por confiança
- ✅ Cards expandíveis com estatísticas
- ✅ Atualiza a cada 30 minutos

### APIs Usadas
- `api-football.com` - Dados de jogos reais
- `football-data.org` - Alternativa se primeira falhar
- Dados simulados com fallback automático

---

## 🔑 CHAVES DE API (Grátis)

### API-Football (Recomendado)
1. Vá em [api-football.com](https://api-football.com)
2. Clique em "Get Free Plan"
3. Cadastre-se
4. Copie sua chave API
5. Coloque no `.env`:
```
FOOTBALL_API_KEY=sua_chave_aqui
```

### Football-Data (Alternativa)
1. Vá em [football-data.org](https://www.football-data.org)
2. Clique em "Register"
3. Cadastre-se
4. Pegue a chave

---

## 📱 ACESSAR DE QUALQUER LUGAR

### Do Celular
- **Via WiFi**: `http://seu-ip-local:3000`
- **Via Internet**: Use o link do deploy (render.com)

### Via Mobile App
Se quiser transformar em app nativo:
1. Wrap com Cordova ou React Native
2. Ou use [web.app](https://web.app) para PWA

---

## ⚙️ CONFIGURAÇÕES

### Mudar odds padrão
No arquivo `server.js`, procure por:
```javascript
{ tipo: 'Botafogo -1,5 Asiático', odd: 1.68, ...}
```
E mude o valor de `odd`

### Mudar horário de atualização
No arquivo `server.js`:
```javascript
// Atualizar a cada 30 minutos
const intervalo = setInterval(carregarDados, 30 * 60 * 1000);

// Para mudar para 1 hora:
const intervalo = setInterval(carregarDados, 60 * 60 * 1000);
```

### Adicionar mais jogos
Edite o array `jogosSimulados` no `server.js` ou conecte a um banco de dados (Firebase, MongoDB)

---

## 🐛 TROUBLESHOOTING

### "Port already in use"
```bash
# Matar processo
kill -9 $(lsof -t -i:3000)
# Ou usar outra porta
PORT=3001 npm start
```

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### API não funciona
- Verifique a chave API
- Teste em [postman.com](https://postman.com)
- Veja se a quota diária não foi excedida

### Render deploy falha
- Verifique `build log` no Render
- Certifique-se que `package.json` está correto
- Teste localmente primeiro

---

## 📈 PRÓXIMAS MELHORIAS

- [ ] Integração com Bet365 oficial (se tiver acesso à API)
- [ ] Dashboard com gráficos de ROI
- [ ] Histórico de acertos/erros
- [ ] Alertas via WhatsApp/Telegram
- [ ] Simulador de banca
- [ ] Machine Learning para predictions

---

## 💰 CUSTOS

| Opção | Custo | Vantagem |
|-------|-------|----------|
| **Render** | Grátis | Fácil, automático |
| **Heroku** | Grátis (antes), agora pago | Estabelecido |
| **AWS Free Tier** | Grátis 1º ano | Escalável |
| **Local** | Grátis | Controle total |

---

## ⚖️ DISCLAIMER

⚠️ **Responsabilidade Pessoal**
- Análises são educacionais
- Sempre verifique odds em Bet365
- Maiores de 18 anos
- Jogue responsável
- Perdas são sua responsabilidade

---

## 📞 SUPORTE

Se tiver problemas:
1. Verifique o README inteiro
2. Procure no Google pelo erro
3. Teste localmente antes de fazer deploy
4. Verifique logs no console

---

## 📄 LICENÇA

Uso pessoal e educacional apenas.

---

**Criado com ❤️ por Lucas**

Última atualização: 2024
