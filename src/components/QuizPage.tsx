import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader, FiCheck, FiX, FiClock } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Constante para o temporizador (5 minutos em segundos)
const QUIZ_TIME_LIMIT = 5 * 60;

interface Question {
  id: string;
  text: string;
  choices: string[];
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
  
  // Estado para o temporizador
  const [timeRemaining, setTimeRemaining] = useState<number>(QUIZ_TIME_LIMIT);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
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
        const response = await fetch(`${API_URL}/quiz/${quizId}`);
        
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
        
        setQuiz(data);
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
      
      const response = await fetch(`${API_URL}/quiz/${quizId}/submit`, {
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
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
        <FiLoader className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }
  
  if (error && !quiz) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Voltar para Quizzes
          </button>
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return null;
  }
  
  const formattedDate = new Date(quiz.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Cálculo de pontuação para banner
  const totalQuestions = quiz?.questions.length || 0;
  const correctCount = results ? results.reduce((acc, v) => acc + (v ? 1 : 0), 0) : 0;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = percentage >= 70;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-3 text-green-600">JumboIA - Quiz</h1>
      <p className="text-center text-gray-600 mb-8">Criado em {formattedDate}</p>
      
      {/* Temporizador */}
      {!results && (
        <div className="fixed top-24 right-8 bg-white p-3 rounded-lg shadow-lg border border-jumbo flex items-center space-x-2">
          <FiClock className={`w-5 h-5 ${timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-jumbo'}`} />
          <span className={`font-mono font-bold ${timeRemaining < 60 ? 'text-red-500' : 'text-jumbo'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Banner de pontuação */}
        {results && (
          <div className={`mb-6 p-4 rounded ${passed ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'} border-l-4`}>
            <p className="text-lg font-semibold mb-1">Pontuação: {percentage}% ({correctCount}/{totalQuestions})</p>
            <p>
              {timeRemaining === 0 
                ? 'O tempo acabou! ' 
                : ''}
              {passed 
                ? 'Parabéns! Você teve um ótimo desempenho neste quiz!' 
                : 'Continue praticando para melhorar seu conhecimento neste tópico.'}
            </p>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6">Tópico: {quiz.topic}</h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-8">
          {quiz.questions.map((question, qIndex) => (
            <div key={question.id} className={`p-4 rounded-lg ${
              results 
                ? results[qIndex] 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className="text-lg font-medium mb-3">
                {qIndex + 1}. {question.text}
                {results && (
                  <span className="ml-2">
                    {results[qIndex] ? (
                      <FiCheck className="inline w-5 h-5 text-green-600" />
                    ) : (
                      <FiX className="inline w-5 h-5 text-red-600" />
                    )}
                  </span>
                )}
              </h3>
              
              <div className="space-y-2">
                {question.choices.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        id={`question-${qIndex}-option-${oIndex}`}
                        type="radio"
                        checked={selectedAnswers[qIndex] === oIndex}
                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={results !== null}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                    </div>
                    <label 
                      htmlFor={`question-${qIndex}-option-${oIndex}`} 
                      className={`ml-3 block text-sm font-medium ${
                        results && !results[qIndex] && correctAnswersMap[question.id] === option.charAt(0)
                          ? 'text-green-700 font-semibold' 
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                      {results && !results[qIndex] && correctAnswersMap[question.id] === option.charAt(0) && (
                        <span className="ml-2 text-green-600">(Resposta correta)</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          {!results ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedAnswers.some(a => a === -1)}
              className="w-full px-4 py-3 bg-green-600 text-white font-medium text-lg rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </span>
              ) : (
                'Enviar Respostas'
              )}
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleTryAgain}
                className="flex-1 px-4 py-2 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={handleNewQuiz}
                className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Novo Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 