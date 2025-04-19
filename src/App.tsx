import { useState, useRef, useEffect } from 'react';
import { FiSend, FiTrash2, FiLoader } from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';
import { ChatMessage, ApiResponse } from './types/chat';
import { SplashScreen } from './components/SplashScreen';
import { CrystalBallButton } from './components/CrystalBallButton';
import { CalendarButton } from './components/CalendarButton';
import { SourcesDisplay } from './components/SourcesDisplay';
import jumboLogoNew from './assets/jumbo-logo-new.svg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const MAX_INPUT_LENGTH = 5000; // Define o limite de caracteres

// Logo JumboIA (elefante estilizado)
const JumboLogo = () => (
  <div className="flex items-center space-x-2">
    <img 
      src={jumboLogoNew}
      alt="Logo JumboIA" 
      className="w-7 h-7"
    />
    <div className="flex flex-col items-start">
      <span className="text-green-600 text-xl font-semibold">JumboIA</span>
      <span className="text-blue-400 text-sm font-medium -mt-0.5">by <span className="uppercase">Gotta</span></span>
    </div>
  </div>
);

// Versão simplificada do logo para a caixa de mensagem (sem o texto "by GOTTA")
const JumboLogoSimple = () => (
  <div className="flex items-center justify-center w-full h-full">
    <img 
      src={jumboLogoNew}
      alt="Logo JumboIA" 
      className="w-5 h-5"
    />
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

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanizingMessageId, setHumanizingMessageId] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    
    const prompt = `Por favor, crie uma imagem baseada em: ${input.trim()}`;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    try {
      // Simular uma chamada de API para geração de imagens
      // Na implementação real, esta seria uma chamada para um serviço como DALL-E ou similar
      setTimeout(() => {
        const imageUrl = 'https://via.placeholder.com/512x512/9370DB/FFFFFF?text=Imagem+Gerada';
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `![Imagem gerada](${imageUrl})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsGeneratingImage(false);
      }, 3000); // Simulando um delay de 3 segundos
      
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar imagem');
      console.error('Erro na geração de imagem:', err);
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

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex flex-col h-screen bg-white text-gray-800 font-sans">
        {/* Header com sombra sutil */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <JumboLogo />
            <div className="text-gray-500 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">Intelligence 1.0</div>
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-jumbo transition-colors duration-300"
              title="Limpar conversa"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Área de mensagens com fundo branco */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
              >
                <div
                  className={`relative group flex items-start space-x-2 max-w-[80%] ${
                    msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-jumbo/10 flex items-center justify-center flex-shrink-0">
                      <JumboLogoSimple />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gray-100 border border-gray-200'
                        : 'bg-white shadow-md border-l-4 border-l-jumbo'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {msg.timestamp}
                    </span>
                    
                    {/* Mostrar fontes apenas para respostas do assistente */}
                    {msg.role === 'assistant' && (
                      <SourcesDisplay showSources={true} messageContent={msg.content} />
                    )}
                    
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleHumanize(msg.id, msg.content)}
                        disabled={!!humanizingMessageId}
                        className={`absolute -top-3 -right-3 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-jumbo transition-opacity duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                        title="Humanizar texto"
                      >
                        <LuBrain className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-2 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-jumbo/10 flex items-center justify-center">
                  <JumboLogoSimple />
                </div>
                <div className="bg-white shadow-md border-l-4 border-l-jumbo rounded-2xl">
                  <div className="text-sm text-jumbo px-4 py-2">
                    JumboIA está digitando...
                  </div>
                  <TypingIndicator />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-l-red-500 text-red-600 px-4 py-3 rounded-lg animate-fade-in">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Footer */}
        <footer className="bg-white border-t border-gray-100 p-4 shadow-sm">
          <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-3 rounded-xl bg-white border border-gray-200 focus:border-jumbo focus:ring-1 focus:ring-jumbo text-gray-800 placeholder-gray-400 transition-all duration-300 outline-none"
                  disabled={isLoading || isGeneratingImage || isCreatingSchedule}
                  maxLength={MAX_INPUT_LENGTH}
                />
                <div className="text-xs text-gray-400 text-right pr-2 pt-1">
                  {input.length}/{MAX_INPUT_LENGTH}
                </div>
              </div>
              
              <div className="flex gap-2 items-center mt-1">
                <button
                  type="submit"
                  disabled={isLoading || isGeneratingImage || isCreatingSchedule || !input.trim() || input.length > MAX_INPUT_LENGTH} 
                  className="p-3 bg-jumbo hover:bg-jumbo-dark text-white rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                >
                  <FiSend className="w-5 h-5" />
                </button>
                
                {/* Botão de Estrela para Gerar Imagens */}
                <CrystalBallButton 
                  onClick={generateImage} 
                  disabled={isLoading || isGeneratingImage || isCreatingSchedule || !input.trim() || input.length > MAX_INPUT_LENGTH}
                />
                
                {/* Botão de Calendário para Criar Cronogramas */}
                <CalendarButton 
                  onClick={createSchedule} 
                  disabled={isLoading || isGeneratingImage || isCreatingSchedule || !input.trim() || input.length > MAX_INPUT_LENGTH}
                />
              </div>
            </div>
          </form>
        </footer>
      </div>
    </>
  );
}

export default App; 