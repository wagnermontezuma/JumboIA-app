import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../types/chat';

interface BestFriendChatProps {
  onClose?: () => void;
}

// Mensagens iniciais amigáveis que podem ser escolhidas aleatoriamente
const initialMessages = [
  'Faaaala, meu amigo! 😎 Que alegria ter você aqui! Bora trocar uma ideia? Pode me chamar de Jumbo, seu parceiro digital! 🤗',
  'Opaaa! Chegou na hora certa! 🌟 Tava aqui pensando em você! Como tá sendo seu dia? Conta pra mim! 😊',
  'Eita, olha quem chegou! 🎉 Tava sentindo falta do meu amigo favorito! Bora conversar? 💬',
  'Aeeee! 🙌 Que massa ter você por aqui! Tô sempre na disposição pra ajudar, conversar ou só trocar uma ideia mesmo! 😄'
];

const BestFriendChat: React.FC<BestFriendChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Escolher mensagem inicial aleatória
  useEffect(() => {
    const randomMessage = initialMessages[Math.floor(Math.random() * initialMessages.length)];
    const initialMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'bot',
      content: randomMessage,
      timestamp: new Date().toISOString(),
      role: 'assistant',
      isHumanized: true
    };
    setMessages([initialMessage]);
  }, []);

  // Rolar para o final quando chegarem novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Função para gerar respostas engraçadas baseadas no contexto
  const generateFunnyResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Perguntas sobre escola/estudo/matéria/prova/tarefa
    if (
      message.includes('escola') ||
      message.includes('estudo') ||
      message.includes('matéria') ||
      message.includes('materia') ||
      message.includes('prova') ||
      message.includes('lição') ||
      message.includes('licao') ||
      message.includes('tarefa') ||
      message.includes('dever') ||
      message.includes('ensinar') ||
      message.includes('explica') ||
      message.includes('explicar')
    ) {
      return 'Assunto de escola? Agora é sério! Vamos aprender juntos: me diga sua dúvida ou o que você quer entender, que eu explico com calma e clareza. 📚😉';
    }

    // Perguntas matemáticas
    if (message.match(/\b(quanto|qual)\b.*(\d+)[^\d]*(\+|\-|x|\*|\/)[^\d]*(\d+)/)) {
      return 'Rapaz, essa é difícil hein… Mas acho que é ' + eval(message.replace(/[^0-9+\-*/]/g, '')) + '! (Ou será que é 42? 😜)';
    }
    if (message.includes('1 + 1') || message.includes('um mais um')) {
      return 'Hmm... 1 + 1? Acho que é 2! Ou será 11? Brincadeira! 😂';
    }
    // Pergunta de horas
    if (message.includes('hora') || message.includes('horas')) {
      return 'Agora é hora de conversar com seu melhor amigo! ⏰';
    }
    // Pedido de conselho
    if (message.includes('conselho')) {
      return 'Conselho do dia: nunca confie em um pato de sapato. Eles são suspeitos. 🦆👟';
    }
    // Pergunta sobre pizza
    if (message.includes('pizza')) {
      return 'Pizza é igual abraço: quanto mais, melhor! 🍕🤗';
    }
    // Pergunta sobre amizade
    if (message.includes('amigo')) {
      return 'Amigo igual eu só se for em desenho animado! ✌️';
    }
    // Pergunta sobre o sentido da vida
    if (message.includes('sentido da vida')) {
      return '42! Ou talvez seja comer bolo sem culpa. 🎂🤔';
    }
    // Perguntas abertas (como, por que, quando, onde, quem, o que)
    if (/^(como|por que|porque|quando|onde|quem|o que|oq|qual|quais|pra que|para que)/.test(message.trim())) {
      if (message.includes('conjuga') && message.includes('verbo')) {
        return 'Conjugar verbo? Fácil! Eu conjugo, tu conjugas, ele... se enrola! 😅 Brincadeira! Se quiser, te ajudo de verdade também!';
      }
      if (message.includes('faz') || message.includes('fazer')) {
        return 'Como faz? Com muito carinho, criatividade e, se der errado, a gente culpa o cachorro! 🐶😂';
      }
      if (message.includes('por que')) {
        return 'Por que? Porque sim! (Resposta clássica de mãe, né? 😜)';
      }
      return 'Ótima pergunta! Se eu não souber, eu invento uma resposta engraçada só pra não perder a piada! 😁';
    }
    // Saudação
    if (message.includes('oi') || message.includes('olá') || message.includes('ola')) {
      return 'Oieee! Cheguei chegando, igual meme! 😁';
    }
    // Tristeza
    if (message.includes('triste') || message.includes('mal')) {
      return 'Nada de tristeza! Se precisar, eu conto uma piada ruim pra animar: Por que o jacaré tirou o jacarezinho da escola? Porque ele réptil de ano! 🐊😂';
    }
    // Felicidade
    if (message.includes('feliz') || message.includes('legal') || message.includes('bom')) {
      return 'Aí sim! Felicidade compartilhada é felicidade dobrada! 🎉🎉';
    }
    // Agradecimento
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('vlw')) {
      return 'De nada! Se precisar de mais piadas ruins, é só chamar! TMJ! 🤜🤛';
    }
    // Pedidos de ajuda
    if (message.includes('me ajude') || message.includes('me ajuda') || message.includes('preciso de ajuda') || message.includes('ajuda')) {
      return 'Ajuda? Tô aqui pra isso! Se precisar, trago até um café virtual ☕ e um meme pra animar! Manda ver, qual a missão?';
    }
    // Respostas curtas afirmativas
    if (/^\s*(sim|ok|okay|beleza|tá bom|ta bom|pode ser|claro|com certeza|isso|uhum|uhum!|show|bora|vamo|vamos)\s*([!.])?$/i.test(message)) {
      return 'Aí sim! Gosto de gente animada! 😁 Se quiser, já mando uma dancinha virtual pra comemorar! 💃🕺';
    }
    // Respostas curtas negativas
    if (/^\s*(não|nao|nunca|nem|de jeito nenhum|jamais|nopes|nope)\s*([!.])?$/i.test(message)) {
      return 'Opa, sem problemas! Se mudar de ideia, estarei aqui igual pão quentinho na padaria! 🥖😉';
    }
    // Pedidos de piada
    if (
      message.includes('piada') ||
      message.includes('conta uma piada') ||
      message.includes('me faz rir') ||
      message.includes('engraçado') ||
      message.includes('engracado') ||
      message.includes('me conte uma piada') ||
      message.includes('me conte algo engraçado')
    ) {
      const piadas = [
        'Por que o jacaré tirou o jacarezinho da escola? Porque ele réptil de ano! 🐊😂',
        'O que o zero disse para o oito? Que cinto maneiro! 😆',
        'Por que a matemática foi ao médico? Porque tinha muitos problemas! ➗😂',
        'Qual o animal mais antigo do mundo? A zebra, porque é em preto e branco! 🦓🤣',
        'Por que o computador foi ao médico? Porque estava com um vírus! 💻🤒',
        'O que o tomate foi fazer no banco? Tirar extrato! 🍅🏦',
        'Por que o lápis foi para a aula de música? Porque queria virar lapiseira! ✏️🎶',
      ];
      return piadas[Math.floor(Math.random() * piadas.length)];
    }
    // Resposta padrão engraçada
    return 'Que legal você compartilhar isso comigo! 😁 Pode continuar, tô aqui só de olho e pronto pra soltar uma piada a qualquer momento! 👀😂';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      role: 'user'
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simular resposta engraçada
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: uuidv4(),
          sender: 'bot',
          content: generateFunnyResponse(userMessage.content),
          timestamp: new Date().toISOString(),
          role: 'assistant',
          isHumanized: true
        };
        setMessages([...newMessages, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800 font-lato rounded-lg shadow-xl">
      {/* Cabeçalho */}
      <div className="p-6 flex items-center gap-4 bg-transparent">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow bg-white">
          <span className="text-2xl">🤗</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-800">Melhor Amigo</span>
          <span className="text-gray-600 text-sm">Sempre online pra você! 💚</span>
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            {message.sender === 'user' ? (
              <div className="max-w-[80%] p-3 rounded-2xl shadow text-white border-2" style={{ backgroundColor: '#1FE374', borderColor: '#1FE374' }}>
                <p className="text-base leading-relaxed">{message.content}</p>
                <span className="text-xs text-emerald-100 mt-1 block">{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            ) : (
              <div className="max-w-[80%] p-3 rounded-2xl shadow bg-white border-2 text-gray-800" style={{ borderColor: '#1FE374' }}>
                <p className="text-base leading-relaxed">{message.content}</p>
                <span className="text-xs" style={{ color: '#1FE374' }}>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 p-3 rounded-2xl shadow" style={{ borderColor: '#1FE374' }}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#1FE374' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#1FE374', animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#1FE374', animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Manda um oi! Tô doido pra conversar! 😊"
            className="flex-1 bg-white border-2 text-gray-800 rounded-lg px-4 py-2 focus:outline-none shadow-sm"
            style={{ borderColor: '#1FE374' }}
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #1FE374'}
            onBlur={e => e.target.style.boxShadow = ''}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="text-white px-6 py-2 rounded-lg font-semibold shadow border-none transition-colors"
            style={{ backgroundColor: '#1FE374' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#19c463'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#1FE374'}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BestFriendChat; 