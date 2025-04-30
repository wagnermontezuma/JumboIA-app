import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const QuizzesPage = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Por favor, informe um tópico para gerar o quiz');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/quiz/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro ao conectar com o servidor' }));
        throw new Error(errorData.error || 'Erro ao gerar quiz');
      }
      
      const data = await response.json().catch(() => {
        throw new Error('Resposta inválida do servidor');  
      });
      
      if (!data || !data.quizId) {
        throw new Error('Resposta incompleta do servidor');
      }
      
      // Redirecionar para a página do quiz gerado
      navigate(`/quizzes/${data.quizId}`);
    } catch (err: any) {
      console.error('Erro ao gerar quiz:', err);
      setError(err.message || 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">JumboIA - Quizzes Educacionais</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Gerar Novo Quiz</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Tópico do Quiz
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: História do Brasil, Matemática básica, Ciências..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Escolha um tópico específico para um quiz mais preciso.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                Gerando Quiz...
              </span>
            ) : (
              'Gerar Quiz'
            )}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Como Funciona?</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Digite um tópico para criar um quiz personalizado.</li>
          <li>Nossa IA gerará 5 perguntas de múltipla escolha sobre o tópico.</li>
          <li>Você terá 10 minutos para completar o quiz.</li>
          <li>Envie suas respostas e receba feedback personalizado!</li>
          <li>Cada quiz permite até 3 tentativas.</li>
        </ol>
      </div>
    </div>
  );
}; 