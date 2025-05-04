import { useState, useRef, useEffect } from 'react';
import { FiSend, FiTrash2, FiLoader, FiInfo } from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChatMessage, ApiResponse } from './types/chat';
import { SplashScreen } from './components/SplashScreen';
import { CrystalBallButton } from './components/CrystalBallButton';
import { CalendarButton } from './components/CalendarButton';
import { SourcesDisplay } from './components/SourcesDisplay';
import { ResearchDisplay } from './components/ResearchDisplay';
import { CreditsModal } from './components/CreditsModal';
import { QuizzesPage } from './components/QuizzesPage';
import { QuizPage } from './components/QuizPage';
import { 
  getThematicContent,
  getBasicConcepts,
  getEssentialTerminology,
  getIntermediateConcepts,
  getPracticalApplications,
  getConnections,
  getCriticalAnalysis,
  getSpecialization,
  getRealWorldApplications,
  getRecommendedBooks,
  getThematicImage
} from './utils/studyGuideContent';

// Corrigido para garantir que a URL do backend seja sempre http://localhost:3000
const API_URL = 'http://localhost:3000';

// Logo para debugging
console.log('API URL configurada:', API_URL);

const MAX_INPUT_LENGTH = 5000; // Define o limite de caracteres

// Função para verificar se o conteúdo parece uma pesquisa
const isPesquisaContent = (content: string): boolean => {
  return content.includes('Pesquisa Completa') || 
         (content.includes('Doença') && content.includes('Transmissão') && content.includes('Sintomas'));
};

// Função para formatar o conteúdo da mensagem com suporte a markdown
const formatMessageContent = (content: string): string => {
  // Substitui URLs por links clicáveis
  const linkedContent = content.replace(
    /(https?:\/\/[^\s]+)/g, 
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
  );
  
  // Suporte a imagens markdown
  const withImages = linkedContent.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img src="$2" alt="$1" class="mt-2 max-w-full h-auto rounded-lg">'
  );
  
  return withImages;
};

// Logo JumboIA como texto
const JumboLogo = () => (
  <div className="flex items-center">
    <div>
      <span className="font-bold text-xl text-green-600">JumboIA</span>
      <div className="text-xs text-blue-500">by <span className="uppercase">Gotta</span></div>
    </div>
  </div>
);

// Versão simplificada do logo para a caixa de mensagem (sem o texto "by GOTTA")
const JumboLogoSimple = () => (
  <div className="flex items-center">
    <span className="font-bold text-green-600">JumboIA</span>
  </div>
);

// Componente para o indicador de digitação
const TypingIndicator = () => (
  <div className="flex space-x-2 p-3">
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing"></div>
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing [animation-delay:0.2s]"></div>
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing [animation-delay:0.4s]"></div>
  </div>
);

// Componente para exibir o guia de estudos
const StudyGuideDisplay = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-jumbo mb-4">{title}</h2>
      <div 
        className="prose prose-sm max-w-none" 
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanizingMessageId, setHumanizingMessageId] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar a abertura/fechamento do modal de créditos
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  
  // Estados para o modal de Matérias
  const [isAnoDiaglogOpen, setIsAnoDiaglogOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedAno, setSelectedAno] = useState('');
  const [learningTopic, setLearningTopic] = useState('');
  
  // Estados para o guia de estudos
  const [isCreatingStudyGuide, setIsCreatingStudyGuide] = useState(false);
  const [studyGuide, setStudyGuide] = useState<{ title: string, content: string } | null>(null);

  // Redirecionar para a página inicial ao carregar
  useEffect(() => {
    // Só redireciona para a página inicial quando a splash screen termina
    // e apenas se a URL estiver vazia ou for a raiz do aplicativo
    if (!showSplash && location.pathname === '/') {
      // Não precisa fazer nada, já está na página inicial
    } else if (!showSplash && location.pathname !== '/' && 
              !location.pathname.includes('/quizzes') && 
              !location.pathname.includes('/materias')) {
      // Redireciona apenas se não estiver em uma rota válida como quizzes ou materias
      window.location.href = '/';
    }
  }, [showSplash, location.pathname]);

  // Função para rolar para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rola para baixo quando novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Verifica o limite antes de atualizar o estado
    if (event.target.value.length <= MAX_INPUT_LENGTH) {
      setInput(event.target.value);
    }
  };

  const sendMessage = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    
    // Verifica o limite e se está vazio/loading
    if (!input.trim() || isLoading || input.length > MAX_INPUT_LENGTH) return; 

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar sua mensagem');
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor');
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleHumanize = async (messageId: string, textToHumanize: string) => {
    if (humanizingMessageId) return;

    setHumanizingMessageId(messageId);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/humanize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToHumanize }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao humanizar o texto.');
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, content: data.humanizedText } : msg
        )
      );

    } catch (err: any) {
      console.error('Erro ao humanizar:', err);
      setError(err.message || 'Erro desconhecido ao humanizar.');
    } finally {
      setHumanizingMessageId(null);
    }
  };

  const generateImage = async () => {
    if (!input.trim() || isGeneratingImage) return;
    setIsGeneratingImage(true);
    setError(null);
    const prompt = input.trim();
    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    try {
      const response = await fetch(`${API_URL}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar imagem');
      }
      const data = await response.json();
      const imageUrl = data.url;
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `![Imagem gerada](${imageUrl})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Erro na geração de imagem:', err);
      setError(err.message || 'Erro ao gerar imagem');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const createSchedule = async () => {
    if (!input.trim() || isCreatingSchedule) return;
    
    setIsCreatingSchedule(true);
    setError(null);
    
    const prompt = `Por favor, crie um cronograma baseado em: ${input.trim()}`;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    try {
      // Simular uma chamada de API para criação de cronograma
      setTimeout(() => {
        const scheduleTemplate = `
## Cronograma: ${input.trim()}

| Data | Atividade | Status |
|------|-----------|--------|
| ${formatDate(1)} | Iniciar planejamento | Pendente |
| ${formatDate(3)} | Revisar recursos disponíveis | Pendente |
| ${formatDate(7)} | Implementação inicial | Pendente |
| ${formatDate(14)} | Testes e validação | Pendente |
| ${formatDate(21)} | Finalização e entrega | Pendente |

*Cronograma gerado automaticamente pela IA*
`;
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: scheduleTemplate,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsCreatingSchedule(false);
      }, 2500); // Simulando um delay de 2.5 segundos
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar cronograma');
      console.error('Erro na criação de cronograma:', err);
      setIsCreatingSchedule(false);
    }
  };
  
  // Função auxiliar para formatar datas futuras
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para abrir o modal de créditos
  const openCreditsModal = () => {
    setIsCreditsModalOpen(true);
  };
  
  // Função para fechar o modal de créditos
  const closeCreditsModal = () => {
    setIsCreditsModalOpen(false);
  };

  // Função para abrir o diálogo de seleção de ano e conteúdo
  const openAnoDialog = (materia: string) => {
    setSelectedMateria(materia);
    setIsAnoDiaglogOpen(true);
  };

  // Função para fechar o diálogo
  const closeAnoDialog = () => {
    setIsAnoDiaglogOpen(false);
    setSelectedAno('');
    setLearningTopic('');
  };

  // Função para processar o formulário de ano e conteúdo
  const handleAnoFormSubmit = (action: 'chat' | 'guide') => {
    if (!selectedAno || !learningTopic.trim()) return;

    if (action === 'chat') {
      // Criar a mensagem para enviar ao chat
      const tema = `${selectedMateria} - ${selectedAno}: ${learningTopic}`;
      setInput(`Preciso de ajuda com ${tema}`);

      // Fechar o diálogo
      closeAnoDialog();

      // Navegar para a página de chat
      window.location.href = "/";
    } else if (action === 'guide') {
      // Gerar guia de estudos
      generateStudyGuide();
    }
  };
  
  // Função para gerar o guia de estudos
  const generateStudyGuide = async () => {
    if (!selectedMateria || !learningTopic.trim()) return;
    
    setIsCreatingStudyGuide(true);
    closeAnoDialog();
    
    try {
      // Reduzido o tempo de espera para 500ms em vez de 2000ms
      setTimeout(() => {
        const guideTitle = `Guia de Estudos: ${selectedMateria} - ${learningTopic}`;
        
        // Obter conteúdo histórico ou específico do tema, se disponível
        const thematicContent = getThematicContent(selectedMateria, learningTopic);
        
        // Obter imagem temática, se disponível
        const thematicImage = getThematicImage(selectedMateria, learningTopic);
        
        const guideContent = `
          ${thematicImage ? `
          <div class="mb-6 text-center">
            <img src="${thematicImage}" alt="Imagem temática de ${learningTopic}" class="rounded-lg shadow-md w-full h-auto max-w-full mx-auto" style="max-height: 400px; object-fit: cover;" />
            <p class="text-sm text-gray-500 mt-2">Imagem ilustrativa: ${learningTopic}</p>
          </div>
          ` : ''}
          
          ${thematicContent ? `
          <div class="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">Contexto Histórico: ${learningTopic}</h3>
            <div class="prose prose-sm max-w-none text-blue-900">
              ${thematicContent}
            </div>
          </div>
          ` : ''}
          
          <h3>Nível Básico</h3>
          <ul>
            <li><strong>Conceitos Fundamentais:</strong> ${getBasicConcepts(selectedMateria, learningTopic)}</li>
            <li><strong>Terminologia Essencial:</strong> ${getEssentialTerminology(selectedMateria, learningTopic)}</li>
            <li><strong>Exercícios Introdutórios:</strong> Resolução de problemas básicos envolvendo ${learningTopic.toLowerCase()}, com foco na compreensão dos princípios fundamentais.</li>
          </ul>
          
          <h3>Nível Intermediário</h3>
          <ul>
            <li><strong>Aprofundamento Teórico:</strong> ${getIntermediateConcepts(selectedMateria, learningTopic)}</li>
            <li><strong>Aplicações Práticas:</strong> ${getPracticalApplications(selectedMateria, learningTopic)}</li>
            <li><strong>Conexões com Outros Temas:</strong> ${getConnections(selectedMateria, learningTopic)}</li>
          </ul>
          
          <h3>Nível Avançado</h3>
          <ul>
            <li><strong>Análise Crítica:</strong> ${getCriticalAnalysis(selectedMateria, learningTopic)}</li>
            <li><strong>Resolução de Problemas Complexos:</strong> Abordar desafios que requerem a integração de múltiplos conceitos e perspectivas dentro do tema ${learningTopic.toLowerCase()}.</li>
            <li><strong>Pesquisa e Aprofundamento:</strong> Investigação aprofundada das principais teorias e debates acadêmicos relacionados a ${learningTopic.toLowerCase()}, incluindo artigos científicos e obras de referência.</li>
          </ul>
          
          <h3>Nível Profissional</h3>
          <ul>
            <li><strong>Especialização:</strong> ${getSpecialization(selectedMateria, learningTopic)}</li>
            <li><strong>Aplicações no Mundo Real:</strong> ${getRealWorldApplications(selectedMateria, learningTopic)}</li>
            <li><strong>Contribuições para o Campo:</strong> Estudo das fronteiras do conhecimento em ${learningTopic.toLowerCase()}, identificando lacunas teóricas e possibilidades de contribuições originais.</li>
          </ul>
          
          <h3>Recursos Recomendados</h3>
          <ul>
            <li><strong>Livros:</strong> ${getRecommendedBooks(selectedMateria, learningTopic)}</li>
            <li><strong>Cursos Online:</strong> Plataformas como Coursera, Khan Academy e edX oferecem cursos específicos sobre ${learningTopic.toLowerCase()} com diferentes níveis de profundidade.</li>
            <li><strong>Exercícios Práticos:</strong> Resolução sistemática de problemas em livros didáticos, simulados e bancos de questões, aumentando gradualmente o nível de dificuldade.</li>
          </ul>
          
          <p>Este guia foi criado especialmente para estudantes do ${selectedAno}. Adapte o ritmo de estudos conforme sua familiaridade com o tema.</p>
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 class="text-lg font-semibold text-yellow-700 mb-2">Teste seus conhecimentos:</h4>
            <p class="text-yellow-800 mb-3">Faça um quiz sobre ${learningTopic} para verificar seu nível de compreensão e identificar áreas que precisam de mais estudo.</p>
            <button class="px-4 py-2 bg-jumbo text-white rounded-md hover:bg-jumbo/90 transition-colors" onclick="window.location.href='/quizzes'">
              Iniciar Quiz
            </button>
          </div>
        `;
        
        setStudyGuide({ title: guideTitle, content: guideContent });
        setIsCreatingStudyGuide(false);
      }, 500); // Reduzido para 500ms
      
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar guia de estudos');
      console.error('Erro na criação do guia:', err);
      setIsCreatingStudyGuide(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm py-3 px-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex space-x-6 items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <JumboLogo />
                </Link>
                <nav className="hidden md:flex space-x-4">
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/' 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Chat IA
                  </Link>
                  <Link
                    to="/quizzes"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.includes('/quizzes') 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Quizzes
                  </Link>
                  <Link
                    to="/materias"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.includes('/materias') 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Matérias
                  </Link>
                </nav>
              </div>
              <div>
                {/* Botão de créditos */}
                <button
                  onClick={openCreditsModal}
                  className="p-2 rounded-full text-jumbo hover:bg-jumbo/10 transition-colors"
                  title="Créditos"
                >
                  <FiInfo className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Modal de créditos */}
          <CreditsModal isOpen={isCreditsModalOpen} closeModal={closeCreditsModal} />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={
                <div className="flex-1 overflow-hidden flex flex-col h-full">
                  {/* Chat container */}
                  <div className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                      {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                          <div className="mb-4">
                            <LuBrain className="w-16 h-16 text-jumbo mx-auto" />
                          </div>
                          <h1 className="text-2xl font-semibold text-gray-700 mb-3">Bem-vindo ao JumboIA</h1>
                          <p className="text-gray-500 max-w-md mb-8">
                            Pergunte a JumboIA qualquer dúvida sobre suas matérias escolares e obtenha respostas detalhadas e precisas.
                          </p>
                          <div className="space-y-4 w-full max-w-md">
                            <button 
                              onClick={() => setInput("Explique o ciclo da água de forma simples")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Explique o ciclo da água de forma simples
                            </button>
                            <button 
                              onClick={() => setInput("Como resolver equações de segundo grau?")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Como resolver equações de segundo grau?
                            </button>
                            <button 
                              onClick={() => setInput("Quais são os principais eventos da Segunda Guerra Mundial?")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Quais são os principais eventos da Segunda Guerra Mundial?
                            </button>
                          </div>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`
                                max-w-[90%] md:max-w-2xl rounded-xl p-4
                                ${
                                  message.role === 'user'
                                    ? 'bg-jumbo text-white ml-4'
                                    : 'bg-white border border-gray-200 mr-4 shadow-sm'
                                }
                                relative
                              `}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div 
                                  className={`text-sm font-semibold ${
                                    message.role === 'user' ? 'text-blue-50' : 'text-jumbo'
                                  }`}
                                >
                                  {message.role === 'user' ? 'Você' : 'JumboIA'}
                                </div>
                                <div 
                                  className={`text-xs ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                                  } ml-2`}
                                >
                                  {message.timestamp}
                                </div>
                              </div>
                              {/* Renderizar conteúdo normal ou componente de pesquisa baseado no conteúdo */}
                              {message.role === 'assistant' && isPesquisaContent(message.content) ? (
                                <ResearchDisplay 
                                  content={message.content} 
                                  title="Resultado da Pesquisa" 
                                />
                              ) : (
                                <div 
                                  className={`prose prose-sm max-w-none ${
                                    message.role === 'user' ? 'prose-invert' : ''
                                  }`}
                                  dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                                />
                              )}
                              {message.role === 'assistant' && message.content.length > 200 && !isPesquisaContent(message.content) && (
                      <button
                                  onClick={() => handleHumanize(message.id, message.content)}
                                  disabled={humanizingMessageId === message.id}
                                  className={`
                                    mt-2 text-xs px-2 py-1 rounded 
                                    ${
                                      humanizingMessageId === message.id
                                        ? 'bg-gray-100 text-gray-400'
                                        : 'bg-blue-50 text-jumbo hover:bg-blue-100'
                                    }
                                    transition-colors
                                  `}
                                >
                                  {humanizingMessageId === message.id ? (
                                    <span className="flex items-center">
                                      <FiLoader className="animate-spin mr-1" />
                                      Humanizando...
                                    </span>
                                  ) : (
                                    'Humanizar texto'
                                  )}
                      </button>
                    )}
                  </div>
                </div>
                        ))
                      )}
            {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[90%] md:max-w-2xl rounded-xl p-4 bg-white border border-gray-200 mr-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-sm font-semibold text-jumbo">JumboIA</div>
                              <div className="text-xs text-gray-400 ml-2">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                  </div>
                  <TypingIndicator />
                </div>
              </div>
            )}
            {error && (
                        <div className="flex justify-center">
                          <div className="max-w-md rounded-xl p-4 bg-red-50 border border-red-200 text-red-600">
                            <p className="text-sm">{error}</p>
                          </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
                  </div>

                  {/* Input area */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <div className="max-w-4xl mx-auto relative">
                      <form onSubmit={sendMessage} className="flex flex-col gap-2 mb-8">
                        <div className="relative w-full">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                            placeholder="Digite sua pergunta aqui..."
                            className="w-full p-3 pl-3 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumbo focus:border-transparent"
                            disabled={isLoading}
                          />
                          <div className="text-xs text-gray-400 absolute bottom-[-20px] right-0">
                  {input.length}/{MAX_INPUT_LENGTH}
                </div>
              </div>
                        <div className="flex gap-2 mt-3 items-center justify-between">
                <button
                            type="button"
                            className="h-12 px-4 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-300 border border-gray-200 flex items-center justify-center"
                          >
                            <span 
                              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600" 
                              style={{ 
                                letterSpacing: '0.5px',
                                fontSize: '1.1rem'
                              }}
                            >
                              JumboIA
                            </span>
                </button>
                
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={clearChat}
                              className="p-3 bg-jumbo text-white rounded-lg hover:bg-jumbo/90 transition-colors w-10 h-10 flex items-center justify-center"
                              title="Limpar conversa"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                <CrystalBallButton 
                  onClick={generateImage} 
                              disabled={isLoading || isGeneratingImage || !input.trim()}
                />
                <CalendarButton 
                  onClick={createSchedule} 
                              disabled={isLoading || isCreatingSchedule || !input.trim()}
                            />
                            <button
                              type="submit"
                              disabled={isLoading || !input.trim()}
                              className="bg-jumbo text-white p-3 rounded-lg hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 flex items-center justify-center"
                            >
                              <FiSend className="w-5 h-5" />
                            </button>
              </div>
            </div>
          </form>
                      {error && (
                        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                          <p>{error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              } />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quizzes/:quizId" element={<QuizPage />} />
              <Route path="/materias" element={
                <div className="p-6 max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Matérias Disponíveis</h1>
                  
                  {isCreatingStudyGuide ? (
                    <div className="flex flex-col items-center justify-center p-12">
                      <div className="text-center">
                        <FiLoader className="w-12 h-12 animate-spin text-jumbo mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Gerando guia de estudos...</p>
                        <p className="text-gray-500 text-sm">Isso levará apenas alguns instantes</p>
                      </div>
                    </div>
                  ) : studyGuide ? (
                    <>
                      <button 
                        onClick={() => setStudyGuide(null)} 
                        className="mb-4 px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        Voltar para matérias
                      </button>
                      <StudyGuideDisplay title={studyGuide.title} content={studyGuide.content} />
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          nome: 'Matemática',
                          descricao: 'Estudo dos números, quantidades, formas, espaço e mudanças',
                          topicos: 'Álgebra, Geometria, Trigonometria, Estatística, Cálculo',
                          icone: '➗'
                        },
                        {
                          nome: 'Português',
                          descricao: 'Estudo da língua portuguesa, gramática, literatura e produção textual',
                          topicos: 'Gramática, Interpretação Textual, Redação, Gêneros Textuais',
                          icone: '📝'
                        },
                        {
                          nome: 'História',
                          descricao: 'Estudo do passado humano, civilizações e acontecimentos importantes',
                          topicos: 'História do Brasil, História Geral, Pré-História, Idade Antiga/Média/Moderna/Contemporânea',
                          icone: '🏛️'
                        },
                        {
                          nome: 'Geografia',
                          descricao: 'Estudo dos lugares, territórios, paisagens e fenômenos terrestres',
                          topicos: 'Geografia Física, Geografia Humana, Geopolítica, Cartografia, Meio Ambiente',
                          icone: '🌎'
                        },
                        {
                          nome: 'Ciências',
                          descricao: 'Estudo dos fenômenos naturais, seres vivos e matéria',
                          topicos: 'Biologia Básica, Física Básica, Química Básica, Ecologia, Corpo Humano',
                          icone: '🔬'
                        },
                        {
                          nome: 'Física',
                          descricao: 'Estudo das leis fundamentais do universo, matéria e energia',
                          topicos: 'Mecânica, Termodinâmica, Eletromagnetismo, Ondulatória, Física Moderna',
                          icone: '⚛️'
                        },
                        {
                          nome: 'Química',
                          descricao: 'Estudo da composição, estrutura e transformações da matéria',
                          topicos: 'Química Orgânica, Química Inorgânica, Físico-Química, Tabela Periódica',
                          icone: '🧪'
                        },
                        {
                          nome: 'Biologia',
                          descricao: 'Estudo dos seres vivos, sua estrutura, função e interações',
                          topicos: 'Citologia, Genética, Ecologia, Evolução, Fisiologia, Botânica, Zoologia',
                          icone: '🧬'
                        },
                        {
                          nome: 'Literatura',
                          descricao: 'Estudo das obras literárias, movimentos e autores importantes',
                          topicos: 'Literatura Brasileira, Literatura Portuguesa, Escolas Literárias, Análise Textual',
                          icone: '📚'
                        }
                      ].map((materia) => (
                        <div key={materia.nome} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <h2 className="text-xl font-semibold text-jumbo">{materia.nome}</h2>
                              <span className="text-2xl" role="img" aria-label={materia.nome}>{materia.icone}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{materia.descricao}</p>
                            <div className="bg-jumbo/10 p-3 rounded-md mb-4">
                              <p className="text-sm text-gray-800"><strong>Principais tópicos:</strong> {materia.topicos}</p>
                            </div>
                            <button 
                              className="w-full bg-jumbo text-white px-4 py-2 rounded-md text-sm hover:bg-jumbo/90 transition-colors"
                              onClick={() => openAnoDialog(materia.nome)}
                            >
                              Explorar {materia.nome}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Modal de seleção de ano escolar */}
                  {isAnoDiaglogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-bold text-gray-800">Explorar {selectedMateria}</h2>
                          <span className="text-2xl">
                            {selectedMateria === 'Matemática' ? '➗' : 
                             selectedMateria === 'Português' ? '📝' : 
                             selectedMateria === 'História' ? '🏛️' : 
                             selectedMateria === 'Geografia' ? '🌎' : 
                             selectedMateria === 'Ciências' ? '🔬' : 
                             selectedMateria === 'Física' ? '⚛️' : 
                             selectedMateria === 'Química' ? '🧪' : 
                             selectedMateria === 'Biologia' ? '🧬' : 
                             selectedMateria === 'Literatura' ? '📚' : '📘'}
                          </span>
                        </div>
                        
                        <div className="mb-4 bg-jumbo/5 p-3 rounded">
                          <p className="text-sm text-gray-700">
                            {selectedMateria === 'Matemática' ? 'Desenvolva habilidades lógicas e resolva problemas com números, formas e equações.' : 
                             selectedMateria === 'Português' ? 'Aprimore sua comunicação escrita e oral, além de analisar textos e compreender a estrutura da língua.' : 
                             selectedMateria === 'História' ? 'Compreenda como eventos passados moldaram nosso mundo atual e as lições que podemos aprender com eles.' : 
                             selectedMateria === 'Geografia' ? 'Entenda as relações entre pessoas, lugares e ambientes, desde sua cidade até o mundo inteiro.' : 
                             selectedMateria === 'Ciências' ? 'Descubra os fundamentos do mundo natural através de observação, experimentação e análise.' : 
                             selectedMateria === 'Física' ? 'Explore as leis fundamentais que governam o universo, desde partículas subatômicas até galáxias.' : 
                             selectedMateria === 'Química' ? 'Investigue a composição da matéria e como diferentes substâncias interagem entre si.' : 
                             selectedMateria === 'Biologia' ? 'Estude a vida em todas suas formas, desde células microscópicas até ecossistemas complexos.' : 
                             selectedMateria === 'Literatura' ? 'Mergulhe nas grandes obras literárias e entenda os contextos culturais e históricos que as influenciaram.' : 
                             'Explore este conteúdo com nossa ajuda personalizada.'}
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="anoEscolar" className="block text-sm font-medium text-gray-700 mb-1">
                            Qual o seu ano escolar?
                          </label>
                          <select
                            id="anoEscolar"
                            value={selectedAno}
                            onChange={(e) => setSelectedAno(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-jumbo"
                          >
                            <option value="">Selecione seu ano</option>
                            <optgroup label="Ensino Fundamental">
                              {Array.from({ length: 9 }, (_, i) => (
                                <option key={`fundamental-${i+1}`} value={`${i+1}º ano do Fundamental`}>
                                  {i+1}º ano do Fundamental
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Ensino Médio">
                              {Array.from({ length: 3 }, (_, i) => (
                                <option key={`medio-${i+1}`} value={`${i+1}º ano do Ensino Médio`}>
                                  {i+1}º ano do Ensino Médio
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="conteudoAprendendo" className="block text-sm font-medium text-gray-700 mb-1">
                            O que você está aprendendo?
                          </label>
                          <textarea
                            id="conteudoAprendendo"
                            value={learningTopic}
                            onChange={(e) => setLearningTopic(e.target.value)}
                            placeholder={
                              selectedMateria === 'Matemática' ? 'Ex: Equações de segundo grau, Teorema de Pitágoras, Frações...' : 
                              selectedMateria === 'Português' ? 'Ex: Análise sintática, Concordância verbal, Figuras de linguagem...' : 
                              selectedMateria === 'História' ? 'Ex: Segunda Guerra Mundial, Revolução Industrial, Brasil Colônia...' : 
                              selectedMateria === 'Geografia' ? 'Ex: Globalização, Clima e vegetação, Geopolítica...' : 
                              selectedMateria === 'Ciências' ? 'Ex: Sistema solar, Corpo humano, Cadeia alimentar...' : 
                              selectedMateria === 'Física' ? 'Ex: Leis de Newton, Termodinâmica, Eletromagnetismo...' : 
                              selectedMateria === 'Química' ? 'Ex: Tabela periódica, Reações químicas, Estequiometria...' : 
                              selectedMateria === 'Biologia' ? 'Ex: Genética, Evolução, Sistema digestório...' : 
                              selectedMateria === 'Literatura' ? 'Ex: Modernismo, Romantismo, José de Alencar...' : 
                              'Ex: O tema específico que você está estudando...'
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-jumbo"
                          ></textarea>
                        </div>
                        
                        <div className="flex flex-col space-y-3">
                          <button
                            onClick={() => handleAnoFormSubmit('guide')}
                            disabled={!selectedAno || !learningTopic.trim()}
                            className="w-full px-4 py-2 bg-jumbo text-white rounded-md hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <span className="mr-2">Criar guia de estudos</span> <LuBrain className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleAnoFormSubmit('chat')}
                            disabled={!selectedAno || !learningTopic.trim()}
                            className="w-full px-4 py-2 bg-jumbo/80 text-white rounded-md hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Obter ajuda no chat
                          </button>
                          
                          <button
                            onClick={closeAnoDialog}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
      </div>
              } />
            </Routes>
          </main>
    </>
      )}
    </div>
  );
}

export default App; 