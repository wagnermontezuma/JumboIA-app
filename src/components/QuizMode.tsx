import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';
import { FiArrowLeft } from 'react-icons/fi';

interface QuizModeProps {
  onClose: () => void;
  onSubmitTopic: (topic: string) => Promise<void>;
  quiz: Quiz | null;
  isLoading: boolean;
}

const QuizMode: React.FC<QuizModeProps> = ({ onClose, onSubmitTopic, quiz, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos em segundos
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Iniciar o timer quando o quiz começar
  useEffect(() => {
    if (quiz && !quizFinished && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, quizFinished, showResults]);

  // Formatar tempo restante
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Lidar com a submissão do tópico
  const handleSubmitTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmitTopic(topic);
    }
  };

  // Selecionar uma resposta
  const selectAnswer = (questionId: string, optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Finalizar o quiz
  const finishQuiz = () => {
    setQuizFinished(true);
    calculateScore();
    setShowResults(true);
  };

  // Calcular pontuação
  const calculateScore = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const userSelectedOption = userAnswers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      
      if (userSelectedOption && correctOption && userSelectedOption === correctOption.id) {
        correctAnswers++;
      }
    });
    
    // Nota de 0 a 10
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 10);
    setScore(calculatedScore);
  };

  // Próxima pergunta
  const nextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // Pergunta anterior
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Reiniciar o quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    setTimeLeft(120);
    setShowResults(false);
    setTopic('');
    onClose();
  };

  // Renderizar a página de entrada do tópico
  const renderTopicInput = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="w-full max-w-2xl mx-auto">
        {/* Topo com botão voltar */}
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center text-green-500 hover:text-green-700 font-semibold transition-colors"
          >
            <FiArrowLeft className="mr-2" size={22} />
            Voltar ao Início
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Criar Quiz</h2>
          <form onSubmit={handleSubmitTopic} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Informe o tema do Quiz
              </label>
              <input
                type="text"
                id="topic"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Revolução Industrial, Fotossíntese, Segunda Guerra Mundial..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Gerando...' : 'Gerar Quiz'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Adicionar botão Voltar para o início nas perguntas e resultados
  function withBackButton(children: React.ReactNode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center text-green-500 hover:text-green-700 font-semibold transition-colors"
            >
              <FiArrowLeft className="mr-2" size={22} />
              Voltar ao Início
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 w-full">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar a pergunta atual
  const renderQuestion = () => {
    if (!quiz || !quiz.questions[currentQuestionIndex]) return null;
    const question = quiz.questions[currentQuestionIndex];
    return withBackButton(
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Quiz: {quiz.topic}</h2>
          <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
            Tempo: {formatTime(timeLeft)}
          </div>
        </div>
        <div className="mb-6">
          <div className="font-medium text-gray-500 mb-1">
            Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}
          </div>
          <p className="text-lg font-medium">{question.text}</p>
        </div>
        <div className="space-y-3 mb-6">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`p-3 border rounded-md cursor-pointer transition ${
                userAnswers[question.id] === option.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-green-300'
              }`}
              onClick={() => selectAnswer(question.id, option.id)}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-5 w-5 border rounded-full mr-2 ${
                  userAnswers[question.id] === option.id
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-400'
                }`}>
                  {userAnswers[question.id] === option.id && (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-md transition ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={nextQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    );
  };

  // Renderizar os resultados
  const renderResults = () => {
    if (!quiz) return null;
    return withBackButton(
      <div className="w-full">
        <h2 className="text-xl font-bold text-center mb-2">Resultado do Quiz</h2>
        <p className="text-center mb-6">Tema: {quiz.topic}</p>
        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-2" style={{
            color: score >= 7 ? '#22c55e' : score >= 5 ? '#eab308' : '#ef4444'
          }}>
            {score}/10
          </div>
          <p className="text-gray-600">
            {score >= 7 
              ? 'Excelente! Você domina esse assunto.' 
              : score >= 5 
                ? 'Bom trabalho! Você conhece o básico.' 
                : 'Continue estudando para melhorar.'}
          </p>
        </div>
        <div className="space-y-6 mb-8">
          {quiz.questions.map((question, index) => {
            const userSelectedOption = userAnswers[question.id];
            const correctOption = question.options.find(opt => opt.isCorrect);
            const isCorrect = userSelectedOption === correctOption?.id;
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full mr-2 flex items-center justify-center ${
                    isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {isCorrect ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">
                      {index + 1}. {question.text}
                    </p>
                    <div className="space-y-1 ml-2 text-sm">
                      {question.options.map(option => (
                        <div 
                          key={option.id}
                          className={`p-2 rounded ${
                            option.isCorrect 
                              ? 'bg-green-100 text-green-800'
                              : userSelectedOption === option.id
                                ? 'bg-red-100 text-red-800'
                                : 'text-gray-600'
                          }`}
                        >
                          {option.text} {option.isCorrect && '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={restartQuiz}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Fazer outro Quiz
          </button>
        </div>
      </div>
    );
  };
  
  // Carregar conteúdo com base no estado
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="bg-white w-full h-full flex flex-col items-center justify-center rounded-none shadow-none text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 left-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-semibold"
          >
            Voltar para o início
          </button>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Gerando quiz sobre {topic}...</p>
          <p className="text-sm text-gray-500 mt-2">Isso pode levar alguns segundos</p>
        </div>
      );
    }
    
    if (!quiz) return renderTopicInput();
    
    return showResults ? renderResults() : renderQuestion();
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-0">
      <div className="w-screen h-screen flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default QuizMode; 