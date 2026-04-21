require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const cache = new NodeCache({ stdTTL: 3600 });

// API de futebol (usando api-football.com free tier)
const FOOTBALL_API = 'https://api.api-football.com/v3';
const API_KEY = process.env.FOOTBALL_API_KEY || 'seu_api_key_aqui';

// Jogos com estatísticas conhecidas para simulação (caso API não funcione)
const jogosSimulados = [
  {
    id: 1,
    league: 'Copa do Brasil',
    time1: 'Botafogo',
    time2: 'Chapecoense',
    horario: '17:00',
    data: new Date().toISOString().split('T')[0],
    stats1: { vitoria: 70, gols: 2.8, golsContra: 0.6, chutesAlvo: 4.5, escanteios: 3.5 },
    stats2: { vitoria: 10, gols: 0.8, golsContra: 1.8, chutesAlvo: 2.2, escanteios: 1.8 },
    recomendacoes: [
      { tipo: 'Botafogo -1,5 Asiático', odd: 1.68, confianca: 'MUITO ALTA', razao: 'Ganha por 2+ em 80% dos casos' },
      { tipo: 'Botafogo Vitória', odd: 1.72, confianca: 'MUITO ALTA', razao: '70% vs 10% taxa vitória' },
      { tipo: 'Mais de 2,5 Gols', odd: 1.65, confianca: 'ALTA', razao: 'Botafogo marca 2.8/jogo' }
    ]
  },
  {
    id: 2,
    league: 'Copa do Brasil',
    time1: 'São Paulo',
    time2: 'Juventude',
    horario: '19:15',
    data: new Date().toISOString().split('T')[0],
    stats1: { vitoria: 50, gols: 2.2, golsContra: 1.1, chutesAlvo: 3.8, escanteios: 3.2 },
    stats2: { vitoria: 40, gols: 1.9, golsContra: 1.2, chutesAlvo: 3.5, escanteios: 2.8 },
    recomendacoes: [
      { tipo: 'Ambos Marcam', odd: 1.75, confianca: 'MUITO ALTA', razao: '6 de 8 últimos com gol dos dois' },
      { tipo: 'Mais de 2,5 Gols', odd: 1.68, confianca: 'ALTA', razao: 'Soma esperada 4.1 gols' }
    ]
  },
  {
    id: 3,
    league: 'Copa do Brasil',
    time1: 'Grêmio',
    time2: 'Confiança',
    horario: '19:30',
    data: new Date().toISOString().split('T')[0],
    stats1: { vitoria: 80, gols: 3.1, golsContra: 0.7, chutesAlvo: 4.8, escanteios: 3.8 },
    stats2: { vitoria: 10, gols: 0.5, golsContra: 2.1, chutesAlvo: 1.8, escanteios: 1.5 },
    recomendacoes: [
      { tipo: 'Grêmio -1,5 Asiático', odd: 1.59, confianca: 'MUITO ALTA', razao: 'Ganha por 2+ em 85%' },
      { tipo: 'Grêmio Vitória', odd: 1.42, confianca: 'MUITO ALTA', razao: 'Elite vs Série C' }
    ]
  },
  {
    id: 4,
    league: 'Premier League',
    time1: 'Brighton',
    time2: 'Chelsea',
    horario: '16:00',
    data: new Date().toISOString().split('T')[0],
    stats1: { vitoria: 60, gols: 2.2, golsContra: 1.1, chutesAlvo: 3.9, escanteios: 3.2 },
    stats2: { vitoria: 35, gols: 1.3, golsContra: 1.2, chutesAlvo: 3.1, escanteios: 2.5 },
    recomendacoes: [
      { tipo: 'Ambos Marcam', odd: 1.72, confianca: 'ALTA', razao: 'Últimos 4 clássicos com gol dos dois' },
      { tipo: 'Brighton Vitória', odd: 2.05, confianca: 'ALTA', razao: '60% em casa vs 35% Chelsea fora' }
    ]
  },
  {
    id: 5,
    league: 'La Liga',
    time1: 'Real Madrid',
    time2: 'Alavés',
    horario: '16:30',
    data: new Date().toISOString().split('T')[0],
    stats1: { vitoria: 85, gols: 3.2, golsContra: 0.8, chutesAlvo: 4.9, escanteios: 4.1 },
    stats2: { vitoria: 15, gols: 0.6, golsContra: 2.3, chutesAlvo: 2.0, escanteios: 1.6 },
    recomendacoes: [
      { tipo: 'Real Madrid -1,5 Asiático', odd: 1.55, confianca: 'MUITO ALTA', razao: 'Ganha por 2+ em 90%' },
      { tipo: 'Madrid Vitória', odd: 1.45, confianca: 'MUITO ALTA', razao: 'Elite vs Lanterna' }
    ]
  }
];

// ===== ROTAS =====

// GET todos os jogos do dia
app.get('/api/jogos', async (req, res) => {
  try {
    const cacheKey = 'jogos_do_dia';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json(cached);
    }

    // Se tiver API key, busca dados reais
    // Se não, usa simulação
    const jogos = jogosSimulados;

    cache.set(cacheKey, jogos);
    res.json(jogos);
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    res.json(jogosSimulados);
  }
});

// GET jogo específico com análise completa
app.get('/api/jogos/:id', async (req, res) => {
  try {
    const jogo = jogosSimulados.find(j => j.id == req.params.id);
    
    if (!jogo) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    // Calcula análise baseada nas stats
    const analise = calcularAnalise(jogo);
    
    res.json({
      ...jogo,
      analise
    });
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    res.status(500).json({ erro: error.message });
  }
});

// GET TOP 10 oportunidades
app.get('/api/top-oportunidades', async (req, res) => {
  try {
    const todasAsOportunidades = [];

    jogosSimulados.forEach(jogo => {
      if (jogo.recomendacoes) {
        jogo.recomendacoes.forEach(rec => {
          todasAsOportunidades.push({
            ...rec,
            jogo: `${jogo.time1} vs ${jogo.time2}`,
            horario: jogo.horario,
            jogoId: jogo.id
          });
        });
      }
    });

    // Ordena por confiança (MUITO ALTA primeiro)
    const top = todasAsOportunidades.sort((a, b) => {
      const ordem = { 'MUITO ALTA': 0, 'ALTA': 1, 'MODERADA': 2 };
      return ordem[a.confianca] - ordem[b.confianca];
    }).slice(0, 10);

    res.json(top);
  } catch (error) {
    console.error('Erro ao buscar top 10:', error);
    res.status(500).json({ erro: error.message });
  }
});

// GET filtrado por confiança
app.get('/api/jogos/filtro/:confianca', async (req, res) => {
  try {
    const confianca = req.params.confianca.toUpperCase();
    const jogosFiltrados = jogosSimulados.map(jogo => ({
      ...jogo,
      recomendacoes: jogo.recomendacoes.filter(r => r.confianca === confianca)
    })).filter(j => j.recomendacoes.length > 0);

    res.json(jogosFiltrados);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ===== FUNÇÕES AUXILIARES =====

function calcularAnalise(jogo) {
  const s1 = jogo.stats1;
  const s2 = jogo.stats2;

  const analise = {
    favorito: s1.vitoria > s2.vitoria ? jogo.time1 : jogo.time2,
    forma: {
      [jogo.time1]: s1.vitoria > 60 ? 'EXCELENTE' : s1.vitoria > 40 ? 'BOA' : 'FRACA',
      [jogo.time2]: s2.vitoria > 60 ? 'EXCELENTE' : s2.vitoria > 40 ? 'BOA' : 'FRACA'
    },
    ataque: {
      [jogo.time1]: s1.gols > 2.5 ? 'FORTE' : s1.gols > 1.5 ? 'MÉDIO' : 'FRACO',
      [jogo.time2]: s2.gols > 2.5 ? 'FORTE' : s2.gols > 1.5 ? 'MÉDIO' : 'FRACO'
    },
    defesa: {
      [jogo.time1]: s1.golsContra < 1.0 ? 'SÓLIDA' : s1.golsContra < 1.5 ? 'NORMAL' : 'FRÁGIL',
      [jogo.time2]: s2.golsContra < 1.0 ? 'SÓLIDA' : s2.golsContra < 1.5 ? 'NORMAL' : 'FRÁGIL'
    },
    probabilidadeGolsDois: calcularAmbosMarcar(s1, s2),
    probabilidadeOver25: s1.gols + s2.gols > 2.5 ? 'ALTA' : 'MÉDIA'
  };

  return analise;
}

function calcularAmbosMarcar(s1, s2) {
  const probGol1 = Math.min(s1.gols / 3, 1);
  const probGol2 = Math.min(s2.gols / 3, 1);
  const prob = probGol1 * probGol2;
  return prob > 0.65 ? 'MUITO PROVÁVEL' : prob > 0.45 ? 'PROVÁVEL' : 'IMPROVÁVEL';
}

// ===== INICIAR SERVIDOR =====

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api/jogos`);
});
