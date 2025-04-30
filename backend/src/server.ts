import dotenv from 'dotenv';
import path from 'path';
// Removido fileURLToPath pois usaremos process.cwd()
// import { fileURLToPath } from 'url'; 
import express from 'express';
import cors from 'cors';
import { askDeepSeek, humanizeTextWithDeepSeek } from './services';
import OpenAI from 'openai';
import * as quizController from './controllers/quizController';

// Configuração explícita do dotenv assumindo execução da raiz
// process.cwd() retorna o diretório de onde o script npm foi iniciado
console.log('Diretório atual:', process.cwd());
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
console.log('Valor de OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Chave presente (valor oculto por segurança)' : 'Chave não encontrada');

const app = express();
// Lê a porta do .env ou usa 3000 como padrão
const port = process.env.PORT || 3000; 

// Configuração CORS aprimorada
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Verifica se a chave da API do OpenAI existe
const openaiApiKey = process.env.OPENAI_API_KEY;
console.log('Valor de OPENAI_API_KEY:', openaiApiKey ? 'Chave presente (valor oculto por segurança)' : 'Chave não encontrada');

// Só inicializa o cliente OpenAI se a chave estiver presente
const openaiClient = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

// Rota de teste para verificar se o servidor está funcionando
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando corretamente!' });
});

// Rota principal para processar perguntas
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Verifica se a chave da API foi carregada
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Erro Crítico: Variável de ambiente OPENROUTER_API_KEY não encontrada!');
      return res.status(500).json({
        error: 'Erro interno do servidor: Chave da API não configurada.'
      });
    }

    if (!question) {
      return res.status(400).json({ error: 'A pergunta é obrigatória' });
    }

    const answer = await askDeepSeek(question);
    res.json({ answer });
  } catch (error: any) {
    // Log aprimorado
    console.error(`Erro ao processar pergunta: ${error.message}`, error.stack);
    console.error('Detalhes adicionais (se houver):', error.response?.data);

    // Verifica explicitamente por erros de autenticação
    if (error.message.includes('autenticação') || error.message.includes('JWT') || error.message.includes('token-invalid') || error.message.includes('No auth credentials')) {
      return res.status(401).json({ 
        error: 'Erro de autenticação com a API. Verifique a chave em backend/.env.' 
      });
    }

    if (error.message.includes('token limit') || error.message.includes('Limite de tokens')) {
      return res.status(400).json({ 
        error: 'A mensagem excedeu o limite de tokens permitido.' 
      });
    }

    // Retorna o erro genérico para outros casos
    res.status(500).json({ 
      error: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
    });
  }
});

// Nova rota para humanizar texto
app.post('/humanize', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'O texto é obrigatório para humanização.' });
    }

    // Verifica a chave da API (boa prática reutilizar a verificação)
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Erro Crítico (Humanize): Variável de ambiente OPENROUTER_API_KEY não encontrada!');
      return res.status(500).json({
        error: 'Erro interno do servidor: Chave da API não configurada.'
      });
    }

    console.log(`Recebida requisição para humanizar: "${text.substring(0, 50)}..."`);
    const humanizedText = await humanizeTextWithDeepSeek(text);
    console.log(`Texto humanizado: "${humanizedText.substring(0, 50)}..."`);
    
    res.json({ humanizedText });

  } catch (error: any) {
    // Log e tratamento de erro específicos para a humanização
    console.error(`Erro ao humanizar texto: ${error.message}`, error.stack);
    console.error('Detalhes adicionais (Humanize):', error.response?.data);
    
    // Retorna mensagens de erro mais específicas baseadas no erro lançado pela função
    if (error.message.includes('autenticação')) {
        return res.status(401).json({ error: error.message });
    }
    if (error.message.includes('Limite de tokens')) {
        return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('API ao humanizar')) {
         return res.status(502).json({ error: error.message }); // Bad Gateway se a API externa falhou
    }
    
    // Erro genérico
    res.status(500).json({ 
      error: 'Desculpe, ocorreu um erro ao tentar humanizar o texto. Por favor, tente novamente.'
    });
  }
});

// Rota para geração de imagens via OpenAI
app.post('/image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt é obrigatório para gerar a imagem.' });
  }
  
  // Verifica se o cliente OpenAI foi inicializado
  if (!openaiClient) {
    return res.status(500).json({ error: 'Serviço de geração de imagens não disponível. Verifique a configuração da API.' });
  }
  
  try {
    const response = await openaiClient.images.generate({ prompt, n: 1, size: '512x512' });
    // Garantindo que o resultado existe antes de acessar a URL
    if (!response.data || response.data.length === 0) {
      throw new Error('A API não retornou imagens');
    }
    const imageUrl = response.data[0].url;
    return res.json({ url: imageUrl });
  } catch (error: any) {
    console.error('Erro ao gerar imagem via OpenAI:', error);
    return res.status(500).json({ error: error.message || 'Erro interno ao gerar imagem.' });
  }
});

// Rotas para o sistema de quizzes
app.post('/quiz/generate', quizController.generateQuiz);
app.get('/quiz/:quizId', quizController.getQuiz);
app.post('/quiz/:quizId/submit', quizController.submitQuiz);

// Middleware para verificar tentativas expiradas
app.use('/quiz/:quizId/submit', (req, res, next) => {
  // Verifica se há um parâmetro startTime na query
  const { startTime } = req.query;
  if (startTime) {
    const startTimestamp = parseInt(startTime as string);
    const currentTime = Date.now();
    const timeDifference = currentTime - startTimestamp;
    
    // Se passaram mais de 10 minutos (600000 ms)
    if (timeDifference > 600000) {
      return res.status(400).json({ error: 'Tempo limite excedido (10 minutos)' });
    }
  }
  next();
});

// Inicia o servidor
const startServer = (portToUse: number) => {
  try {
    const server = app.listen(portToUse, () => {
      console.log(`Servidor rodando em http://localhost:${portToUse}`);
      
      if (!process.env.OPENROUTER_API_KEY) {
        console.warn('Atenção: Variável de ambiente OPENROUTER_API_KEY não carregada!');
      } else {
        console.log('Chave da API OpenRouter carregada com sucesso.');
      }
    
      // Status das funcionalidades
      console.log('-------------- STATUS DAS FUNCIONALIDADES --------------');
      console.log('Chat com DeepSeek:', process.env.OPENROUTER_API_KEY ? 'DISPONÍVEL ✅' : 'INDISPONÍVEL ❌');
      console.log('Geração de imagens:', openaiApiKey ? 'DISPONÍVEL ✅' : 'INDISPONÍVEL ❌');
      console.log('Sistema de Quiz:', 'DISPONÍVEL ✅');
      console.log('----------------------------------------------------');
      
      // Atualizar o arquivo .env do frontend com a URL correta
      const envPath = path.resolve(process.cwd(), '..', '.env');
      try {
        const envContent = `VITE_API_URL=http://localhost:${portToUse}`;
        require('fs').writeFileSync(envPath, envContent);
        console.log(`Frontend configurado para usar a URL: http://localhost:${portToUse}`);
      } catch (err) {
        console.warn(`Não foi possível atualizar o arquivo .env do frontend: ${err}`);
      }
    });
    
    // Adicionar um manipulador de erros
    server.on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Porta ${portToUse} está em uso, tentando a porta ${portToUse + 1}`);
        server.close();
        startServer(portToUse + 1);
      } else {
        console.error('Erro ao iniciar o servidor:', e);
      }
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    // Verificar se o erro tem o código EADDRINUSE
    if (err && typeof err === 'object' && 'code' in err && err.code === 'EADDRINUSE') {
      console.log(`Porta ${portToUse} está em uso, tentando a porta ${portToUse + 1}`);
      startServer(portToUse + 1);
    }
  }
};

// Iniciar o servidor na porta configurada
startServer(parseInt(port.toString())); 