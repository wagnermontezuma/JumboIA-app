import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, Quiz } from '../types/chat';
import { PlusIcon, ChatBubbleLeftIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import QuizMode from './QuizMode';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import BestFriendChat from './BestFriendChat';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Verifique a URL da API no console para debug
console.log('API URL:', API_URL);

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

const ChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSpecialPrompts, setShowSpecialPrompts] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState('');
  const [showQuizMode, setShowQuizMode] = useState(false);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [showBestFriend, setShowBestFriend] = useState(false);

  // Inicializar com uma conversa vazia
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, []);

  // Atualizar mensagens quando a conversa ativa mudar
  useEffect(() => {
    if (activeConversationId) {
      const activeConversation = conversations.find(conv => conv.id === activeConversationId);
      if (activeConversation) {
        setMessages(activeConversation.messages);
      }
    }
  }, [activeConversationId, conversations]);

  // Rolar para o final quando chegarem novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Função para gerar um quiz
  const generateQuiz = async (topic: string) => {
    try {
      setQuizLoading(true);
      setQuizData(null);
      
      const response = await fetch(`${API_URL}/api/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar quiz');
      }
      
      // Estruturar o quiz com as perguntas
      const quiz: Quiz = {
        id: uuidv4(),
        topic,
        questions: data.questions.map((q: any) => ({
          id: uuidv4(),
          text: q.question,
          options: q.options.map((opt: any, index: number) => ({
            id: uuidv4(),
            text: opt,
            isCorrect: index === q.correctOptionIndex
          }))
        })),
        createdAt: new Date().toISOString(),
        timeLimit: 120 // 2 minutos
      };
      
      setQuizData(quiz);
    } catch (err) {
      console.error('Erro ao gerar quiz:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setQuizLoading(false);
    }
  };

  // Abrir o modo Quiz
  const openQuizMode = () => {
    setShowQuizMode(true);
    setQuizData(null);
  };

  // Fechar o modo Quiz
  const closeQuizMode = () => {
    setShowQuizMode(false);
    setQuizData(null);
  };

  // Criar uma nova conversa
  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: `Nova conversa ${conversations.length + 1}`,
      messages: [],
      updatedAt: new Date().toISOString()
    };
    
    setConversations(prevConversations => [...prevConversations, newConversation]);
    setActiveConversationId(newConversation.id);
    setMessages([]);
    setInputMessage('');
    setError(null);
    setEditingTitleId(newConversation.id);
    setEditingTitleValue('');
  };

  // Renomear conversa
  const handleRenameConversation = (id: string) => {
    if (!editingTitleValue.trim()) {
      setEditingTitleId(null);
      setEditingTitleValue('');
      return;
    }
    setConversations(prevConversations => prevConversations.map(conv =>
      conv.id === id ? { ...conv, title: editingTitleValue.trim() } : conv
    ));
    setEditingTitleId(null);
    setEditingTitleValue('');
  };

  // Excluir uma conversa
  const deleteConversation = (id: string) => {
    setConversations(prevConversations => prevConversations.filter(conv => conv.id !== id));
    
    // Se a conversa ativa foi excluída, selecione outra ou crie uma nova
    if (id === activeConversationId) {
      const remaining = conversations.filter(conv => conv.id !== id);
      if (remaining.length > 0) {
        setActiveConversationId(remaining[0].id);
        setMessages(remaining[0].messages);
      } else {
        createNewConversation();
      }
    }
  };

  // Atualizar a conversa ativa
  const updateActiveConversation = (newMessages: ChatMessage[]) => {
    if (!activeConversationId) return;
    
    setMessages(newMessages);
    
    // Atualizar a conversa no estado geral
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: newMessages, 
              updatedAt: new Date().toISOString(),
              // Atualizar título baseado na primeira mensagem do usuário
              title: conv.title === `Nova conversa ${conversations.length}` && newMessages.length > 0
                ? newMessages.find(msg => msg.sender === 'user')?.content.substring(0, 20) + '...'
                : conv.title
            } 
          : conv
      )
    );
  };

  // Componente de digitação
  const TypingIndicator = () => (
    <div className="flex mb-4 justify-start">
      <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none max-w-[80%]">
        <div className="flex items-center">
          <span className="ml-1 flex">
            <span className="h-2 w-2 bg-teal-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="h-2 w-2 bg-teal-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '200ms' }}></span>
            <span className="h-2 w-2 bg-teal-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '400ms' }}></span>
          </span>
        </div>
      </div>
    </div>
  );

  // Função para enviar uma mensagem
  const sendMessage = async () => {
    if (!inputMessage.trim() || !activeConversationId) return;

    // Limpar o erro anterior
    setError(null);

    // Adicionar mensagem do usuário ao estado
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      role: 'user'
    };

    const newMessages = [...messages, userMessage];
    updateActiveConversation(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Enviando mensagem para:', `${API_URL}/api/chat`);
      
      // SOLUÇÃO TEMPORÁRIA: Usar uma resposta local enquanto debugamos a API
      setTimeout(() => {
        // Gerar resposta temporária baseada na mensagem do usuário
        let resposta = "Olá! Estou funcionando em modo local no momento. ";
        
        if (userMessage.content.toLowerCase().includes("olá") || 
            userMessage.content.toLowerCase().includes("oi") || 
            userMessage.content.toLowerCase().includes("ola")) {
          resposta += "É um prazer conversar com você! Como posso ajudar hoje?";
        } else if (userMessage.content.toLowerCase().includes("como") && 
                  userMessage.content.toLowerCase().includes("vai")) {
          resposta += "Estou muito bem, obrigado por perguntar! E você, como está?";
        } else if (userMessage.content.toLowerCase().includes("ajuda") || 
                  userMessage.content.toLowerCase().includes("ajudar")) {
          resposta += "Estou aqui para te ajudar! Posso responder perguntas, dar sugestões ou apenas conversar.";
        } else {
          resposta += "Estou aqui para conversar sobre qualquer assunto! O que você gostaria de saber?";
        }
        
        // Adicionar resposta da IA ao estado
        const aiMessage: ChatMessage = {
          id: uuidv4(),
          sender: 'bot',
          content: resposta,
          timestamp: new Date().toISOString(),
          role: 'assistant'
        };
        
        updateActiveConversation([...newMessages, aiMessage]);
        setIsLoading(false);
      }, 1000);
      
      // Código original comentado para debug
      /*
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          history: messages.map(msg => ({
            role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
            content: msg.content
          }))
        }),
      });

      const data = await response.json();
      console.log('Resposta recebida:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar a mensagem');
      }

      // Adicionar resposta da IA ao estado
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        content: data.answer || data.response || 'Desculpe, não consegui processar sua solicitação.',
        timestamp: new Date().toISOString(),
        role: 'assistant',
        sources: data.sources
      };

      updateActiveConversation([...newMessages, aiMessage]);
      */
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');

      // Adicionar mensagem de erro
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date().toISOString(),
        role: 'assistant',
        isError: true
      };

      updateActiveConversation([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Função para limpar o histórico de mensagens
  const handleClearChat = () => {
    updateActiveConversation([]);
    setError(null);
  };

  // Renderizar a mensagem com base no tipo (usuário ou IA)
  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';
    
    return (
      <div 
        key={message.id} 
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div 
          className={`max-w-[80%] p-3 rounded-lg ${
            isUser 
              ? 'bg-green-500 text-white rounded-tr-none' 
              : 'bg-white border border-gray-200 rounded-tl-none'
          } ${message.isError ? 'border-red-300 bg-red-50' : ''}`}
        >
          <p className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}>
            {message.content}
          </p>
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              <p className="font-semibold">Fontes:</p>
              <ul className="list-disc pl-4">
                {message.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleAudioRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunks.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          setAudioUrl(URL.createObjectURL(audioBlob));
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        alert('Não foi possível acessar o microfone. Permita o acesso nas configurações do navegador.');
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Lista de conversas no lado esquerdo */}
      <div className="w-72 h-full bg-white border-r border-gray-100 shadow-sm overflow-y-auto">
        <div className="p-4">
          {/* Botão Melhor Amigo */}
          <button
            onClick={() => setShowBestFriend(true)}
            className="w-full flex items-center gap-2 px-4 py-3 mb-4 rounded-lg font-bold shadow transition border-none"
            style={{ backgroundColor: '#1FE374', color: '#fff' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#19c463'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#1FE374'}
          >
            <span className="text-2xl">🤗</span>
            <span>Melhor Amigo</span>
          </button>
          <h3 className="sidebar-title">Suas Conversas</h3>
          {conversations.length === 0 ? (
            <p className="text-gray-500">Nenhuma conversa encontrada</p>
          ) : (
            <ul>
              {conversations.map(conv => (
                <li 
                  key={conv.id}
                  className={`sidebar-conversation ${activeConversationId === conv.id ? 'active' : ''}`}
                  onClick={() => setActiveConversationId(conv.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ChatBubbleLeftIcon className="h-4 w-4 text-teal-400" />
                      {editingTitleId === conv.id ? (
                        <input
                          className="text-sm border-b border-teal-400 outline-none bg-transparent w-32"
                          autoFocus
                          value={editingTitleValue}
                          onChange={e => setEditingTitleValue(e.target.value)}
                          onBlur={() => handleRenameConversation(conv.id)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleRenameConversation(conv.id);
                            }
                          }}
                          placeholder={conv.title}
                        />
                      ) : (
                        <span
                          className="text-sm truncate cursor-pointer"
                          title="Clique no lápis para editar"
                        >
                          {conv.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-teal-500 p-0.5 rounded"
                        onClick={e => {
                          e.stopPropagation();
                          setEditingTitleId(conv.id);
                          setEditingTitleValue(conv.title);
                        }}
                        title="Editar nome da conversa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button 
            onClick={createNewConversation}
            className="mt-4 w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-teal-400/10 transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4 text-teal-400" />
            <span className="text-sm">Nova conversa</span>
          </button>
          {/* Atalhos abaixo do botão Nova conversa */}
          <ul className="mt-4 flex flex-col gap-2">
            <li><button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition">Resumo</button></li>
            <li>
              <button
                className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition"
                onClick={() => navigate('/redacao')}
              >
                Redação
              </button>
            </li>
            <li><button 
              className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition"
              onClick={openQuizMode}
            >Quizzes</button></li>
            <li>
              <button
                className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition"
                onClick={() => navigate('/simulado')}
              >
                Simulado
              </button>
            </li>
            <li><button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition">Sequência Didática</button></li>
            <li><button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition">Aulas Eletivas</button></li>
            <li><button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 text-base font-medium text-gray-700 hover:bg-teal-50 transition">Matérias</button></li>
          </ul>
        </div>
      </div>

      {/* Área de chat no lado direito */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {showBestFriend ? (
          <div className="h-full flex flex-col">
            <div className="p-4 flex items-center bg-white" style={{ borderBottom: 'none', boxShadow: 'none' }}>
              <button
                onClick={() => setShowBestFriend(false)}
                className="mr-4 px-3 py-1 rounded-lg font-semibold transition border-none"
                style={{ backgroundColor: '#1FE374', color: '#fff' }}
              >
                Voltar
              </button>
              <span className="font-bold text-xl ml-2" style={{ color: '#1FE374' }}>Melhor Amigo</span>
            </div>
            <div className="flex-1">
              <BestFriendChat />
            </div>
          </div>
        ) : (
          <>
            {/* Cabeçalho */}
            {!showBestFriend && (
              <div className="p-4 border-b border-gray-100 flex items-center justify-center bg-white">
                <span className="font-bold text-green-500 text-2xl">Jumbo</span>
                <span className="font-bold text-green-500 text-2xl ml-1">IA</span>
                <span className="text-teal-400 text-sm ml-2" style={{ alignSelf: 'flex-end' }}>by GOTTA</span>
              </div>
            )}

            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <h2 className="welcome-title">Bem-vindo ao JumboIA</h2>
                  <p className="welcome-subtitle">Envie uma mensagem para começar a conversa</p>
                </div>
              ) : (
                <div>
                  {messages.map(message => renderMessage(message))}
                  {isLoading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Rodapé com área de entrada de texto */}
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <textarea
                  className="chat-gpt-textarea"
                  placeholder="Digite sua mensagem aqui..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="text-gray-400 hover:text-teal-400 px-2 py-1 text-sm"
                  >
                    Limpar conversa
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="send-button"
                      title={isRecording ? 'Parar gravação' : 'Gravar áudio'}
                      onClick={handleAudioRecord}
                      style={{ background: isRecording ? '#f87171' : undefined }}
                    >
                      {isRecording ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
                    </button>
                    <button
                      type="submit"
                      className="send-button"
                      disabled={!inputMessage.trim() || isLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {audioUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <audio src={audioUrl} controls />
                    {/* Botão de enviar áudio pode ser adicionado aqui futuramente */}
                  </div>
                )}
              </form>
            </div>
          </>
        )}
      </div>

      {/* Modal de Quiz */}
      {showQuizMode && (
        <QuizMode
          onClose={closeQuizMode}
          onSubmitTopic={generateQuiz}
          quiz={quizData}
          isLoading={quizLoading}
        />
      )}
    </div>
  );
};

export default ChatPage;
