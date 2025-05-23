import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader, FiCheck, FiX, FiClock, FiArrowLeft } from 'react-icons/fi';

// URL fixa do backend
const API_URL = 'http://localhost:3001';

// Constante para o temporizador (5 minutos em segundos)
const QUIZ_TIME_LIMIT = 5 * 60;

interface Question {
  id: string;
  text: string;
  choices: string[];
  imageUrl?: string; // URL da imagem associada à questão
}

interface Quiz {
  id: string;
  topic: string;
  questions: Question[];
  createdAt: string;
}

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const [correctAnswersMap, setCorrectAnswersMap] = useState<Record<string, string>>({});
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<boolean[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Estado para o temporizador
  const [timeRemaining, setTimeRemaining] = useState<number>(QUIZ_TIME_LIMIT);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeExpired, setTimeExpired] = useState(false);
  
  // Formatar o tempo restante para minutos:segundos
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Buscar o quiz quando a página carrega
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${API_URL}/api/quiz/${quizId}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Erro ao conectar com o servidor' }));
          throw new Error(errorData.error || 'Quiz não encontrado');
        }
        
        const data = await response.json().catch(() => {
          throw new Error('Resposta inválida do servidor');
        });
        
        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error('Dados do quiz incompletos ou inválidos');
        }
        
        // Processar as questões para extrair as URLs das imagens
        const processedQuestions = data.questions.map((q: Question) => {
          // Verificar se há uma URL de imagem no texto
          const imageRegex = /\[IMAGE:(.*?)\]/;
          const match = q.text.match(imageRegex);
          
          if (match && match[1]) {
            // Extrair a URL da imagem e remover a tag do texto
            const imageUrl = match[1];
            const cleanText = q.text.replace(imageRegex, '').trim();
            return {
              ...q,
              text: cleanText,
              imageUrl
            };
          }
          
          return q;
        });
        
        // Atualizar o quiz com as questões processadas
        setQuiz({
          ...data,
          questions: processedQuestions
        });
        
        // Inicializar as respostas selecionadas com -1 (nenhuma selecionada)
        setSelectedAnswers(new Array(data.questions.length).fill(-1));
        // Iniciar o temporizador quando o quiz é carregado
        setTimerActive(true);
      } catch (err: any) {
        console.error('Erro ao buscar quiz:', err);
        setError(err.message || 'Erro ao buscar dados do quiz');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
    
    // Limpar o temporizador quando o componente é desmontado
    return () => {
      setTimerActive(false);
    };
  }, [quizId]);
  
  // Efeito para controlar o temporizador
  useEffect(() => {
    let timerInterval: number | undefined;
    
    if (timerActive && timeRemaining > 0 && !results) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            // Marcar que o tempo expirou
            setTimeExpired(true);
            // Submeter automaticamente quando o tempo acabar
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerActive, timeRemaining, results]);
  
  // Navegar para uma questão específica
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < (quiz?.questions.length || 0)) {
      setCurrentQuestionIndex(index);
      // Rolar para o topo da questão
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Ir para a próxima questão
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };
  
  // Ir para a questão anterior
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      navigateToQuestion(currentQuestionIndex - 1);
    }
  };
  
  // Manipular a seleção de resposta
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (results) return; // Não permitir alterações após envio
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  // Enviar as respostas
  const handleSubmit = async () => {
    if (!quiz || isSubmitting || results) return;
    
    // Parar o temporizador
    setTimerActive(false);
    
    // Verificar se todas as perguntas foram respondidas
    const hasUnanswered = selectedAnswers.some(answer => answer === -1);
    if (hasUnanswered && timeRemaining > 0) {
      setError('Por favor, responda todas as perguntas antes de enviar');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Construir objeto de respostas por ID de pergunta -> letra da opção
      const answersPayload: Record<string,string> = {};
      quiz.questions.forEach((q, idx) => {
        const selIdx = selectedAnswers[idx];
        // Se o tempo acabou e não foi respondida, envia uma resposta vazia
        if (selIdx === -1) {
          answersPayload[q.id] = '';
        } else {
          const selOpt = q.choices[selIdx] || '';
          answersPayload[q.id] = selOpt.charAt(0);
        }
      });
      
      const response = await fetch(`${API_URL}/api/quiz/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersPayload }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro ao conectar com o servidor' }));
        throw new Error(errorData.error || 'Erro ao enviar respostas');
      }
      
      const data = await response.json().catch(() => {
        throw new Error('Resposta inválida do servidor');
      });
      
      // Calcular corretidão localmente
      const correctness: boolean[] = quiz.questions.map((q, idx) => {
        const selectedIdx = selectedAnswers[idx];
        if (selectedIdx === -1) return false; // Pergunta não respondida
        const selectedOption = q.choices[selectedIdx] || '';
        const selectedLetter = selectedOption.charAt(0);
        return data.correctAnswers[q.id] === selectedLetter;
      });
      // Atualizar mapas e resultados
      setCorrectAnswersMap(data.correctAnswers);
      setResults(correctness);
      setScore(data.score);
    } catch (err: any) {
      console.error('Erro ao submeter quiz:', err);
      setError(err.message || 'Erro ao enviar respostas');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTryAgain = () => {
    // Reiniciar o quiz
    setSelectedAnswers(new Array(quiz?.questions.length || 0).fill(-1));
    setResults(null);
    setScore(null);
    setError(null);
  };
  
  const handleNewQuiz = () => {
    // Voltar para a página de criação de quiz
    navigate('/quizzes');
  };
  
  // Renderizar o cartão de respostas
  const renderAnswerCard = () => {
    if (!quiz) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Cartão de Respostas</h3>
        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((_, index) => {
            const isAnswered = selectedAnswers[index] !== -1;
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={index}
                onClick={() => navigateToQuestion(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCurrent
                    ? 'bg-jumbo text-white font-bold ring-2 ring-offset-2 ring-jumbo'
                    : isAnswered
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-jumbo" />
        <span className="ml-2 text-lg">Carregando simulado...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 p-6 rounded-lg shadow-md text-center max-w-xl w-full">
          <FiX className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Erro ao carregar simulado</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-jumbo text-white rounded hover:bg-jumbo/90 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 p-6 rounded-lg shadow-md text-center max-w-xl w-full">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Simulado não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-jumbo text-white rounded hover:bg-jumbo/90 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }
  
  // Verificar se temos resultados para mostrar
  if (results) {
    // ... existente code do resultado ...
    
    // Código existente para resultados
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-jumbo hover:text-jumbo-dark mb-4 transition-colors"
        >
          <FiArrowLeft className="mr-2" size={20} />
          Voltar ao Início
        </button>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Resultado do Simulado: {score !== null ? `${score.toFixed(1)}/10.0` : 'N/A'}
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className={`text-3xl font-bold rounded-full w-24 h-24 flex items-center justify-center ${
              score !== null && score >= 6 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {score !== null ? `${Math.round(score * 10)}%` : 'N/A'}
            </div>
          </div>
          
          <div className="mt-4 space-y-6">
            {quiz.questions.map((question, index) => {
              const selectedIdx = selectedAnswers[index];
              const isCorrect = results[index];
              const correctAnswer = correctAnswersMap[question.id] || '';
              
              let correctIdx = -1;
              if (correctAnswer) {
                correctIdx = question.choices.findIndex(c => c.startsWith(correctAnswer));
              }
              
              return (
                <div key={index} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className="font-medium mb-2">{index + 1}. {question.text}</h3>
                  
                  {question.imageUrl && (
                    <div className="mb-3">
                      <img 
                        src={question.imageUrl} 
                        alt={`Ilustração para questão ${index + 1}`}
                        className="max-w-full h-auto rounded-lg max-h-60 mx-auto"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 mt-2">
                    {question.choices.map((choice, choiceIdx) => (
                      <div 
                        key={choiceIdx}
                        className={`p-2 rounded flex items-start ${
                          correctIdx === choiceIdx 
                            ? 'bg-green-100 text-green-800' 
                            : selectedIdx === choiceIdx && !isCorrect
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="mr-2 mt-0.5">
                          {correctIdx === choiceIdx 
                            ? <FiCheck className="text-green-600 w-5 h-5" /> 
                            : selectedIdx === choiceIdx && !isCorrect
                            ? <FiX className="text-red-600 w-5 h-5" />
                            : null}
                        </div>
                        <div>
                          {choice}
                          {correctIdx === choiceIdx && (
                            <p className="text-sm text-green-700 mt-1">Resposta correta</p>
                          )}
                          {selectedIdx === choiceIdx && !isCorrect && (
                            <p className="text-sm text-red-700 mt-1">Sua resposta</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={handleTryAgain}
              className="px-6 py-3 bg-jumbo text-white rounded-lg hover:bg-jumbo/90 transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={handleNewQuiz}
              className="px-6 py-3 border border-jumbo text-jumbo rounded-lg hover:bg-jumbo/10 transition-colors"
            >
              Criar Novo Simulado
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Renderizar a interface do simulado
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-jumbo">Simulado: {quiz.topic}</h1>
        
        <div className="flex items-center">
          <div className={`flex items-center ${
            timeRemaining < 60 ? 'text-red-600 animate-pulse font-bold' : 'text-gray-700'
          }`}>
            <FiClock className="mr-1 h-5 w-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-4 px-4 py-1.5 bg-jumbo text-white text-sm rounded hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <FiLoader className="animate-spin mr-1 h-4 w-4" />
                Enviando...
              </span>
            ) : (
              'Finalizar Simulado'
            )}
          </button>
        </div>
      </div>
      
      {timeExpired && !results && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiClock className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm">
                O tempo acabou! Suas respostas serão enviadas automaticamente.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Cartão de respostas */}
      {renderAnswerCard()}
      
      {/* Container da questão atual */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            Questão {currentQuestionIndex + 1} de {quiz.questions.length}
          </h2>
          <div className="text-sm text-gray-500">
            {selectedAnswers[currentQuestionIndex] !== -1 ? 'Respondida' : 'Não respondida'}
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-lg">{currentQuestion.text}</p>
          
          {currentQuestion.imageUrl && (
            <div className="my-4">
              <img 
                src={currentQuestion.imageUrl} 
                alt={`Ilustração para questão ${currentQuestionIndex + 1}`}
                className="max-w-full h-auto rounded-lg max-h-60 mx-auto"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, idx) => (
            <div 
              key={idx}
              onClick={() => !results && handleAnswerSelect(currentQuestionIndex, idx)}
              className={`p-3 rounded-lg border ${
                selectedAnswers[currentQuestionIndex] === idx
                  ? 'bg-jumbo/10 border-jumbo'
                  : 'bg-white border-gray-200 hover:border-jumbo/50 hover:bg-jumbo/5'
              } cursor-pointer transition-colors`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                  selectedAnswers[currentQuestionIndex] === idx
                    ? 'bg-jumbo text-white'
                    : 'border border-gray-300'
                }`}>
                  {choice.charAt(0)}
                </div>
                <span>{choice.substring(3)}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navegação entre questões */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 border border-jumbo text-jumbo rounded hover:bg-jumbo/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Questão Anterior
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
            className="px-4 py-2 bg-jumbo text-white rounded hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima Questão
          </button>
        </div>
      </div>
      
      {/* Botão de finalizar (fixo na parte inferior em dispositivos móveis) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 bg-jumbo text-white rounded hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Finalizar Simulado'}
        </button>
      </div>
    </div>
  );
};