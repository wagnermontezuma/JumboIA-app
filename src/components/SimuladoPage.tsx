import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader, FiClock, FiBook, FiCheckCircle, FiX, FiArrowLeft } from 'react-icons/fi';

// URL fixa do backend
const API_URL = 'http://localhost:3001';

// Lista de matérias disponíveis
const MATERIAS = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Física',
  'Química',
  'Biologia',
  'Literatura',
  'Inglês'
];

interface SimuladoFormData {
  materia: string;
  assuntos: string[];
  assuntoInput: string;
  incluiRedacao: boolean;
  temaRedacao: string;
  textoRedacao: string;
}

export const SimuladoPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SimuladoFormData>({
    materia: '',
    assuntos: [],
    assuntoInput: '',
    incluiRedacao: false,
    temaRedacao: '',
    textoRedacao: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Efeito para garantir que o corpo do documento tenha overflow auto
  useEffect(() => {
    // Salvar o estilo original
    const originalStyle = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      position: document.body.style.position
    };
    
    // Aplicar estilos para garantir rolagem
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.body.style.position = 'static';
    
    // Restaurar ao desmontar
    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.height = originalStyle.height;
      document.body.style.position = originalStyle.position;
    };
  }, []);

  // Manipular mudança na matéria selecionada
  const handleMateriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      materia: e.target.value,
      // Resetar a opção de redação quando trocar de matéria
      incluiRedacao: false
    });
  };

  // Manipular mudança no campo de assunto
  const handleAssuntoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      assuntoInput: e.target.value
    });
  };

  // Manipular a opção de redação
  const handleRedacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      incluiRedacao: e.target.checked
    });
  };

  // Adicionar um assunto à lista
  const handleAddAssunto = () => {
    if (!formData.assuntoInput.trim()) {
      setError('Digite um assunto válido');
      return;
    }

    if (formData.assuntos.length >= 4) {
      setError('Você já selecionou o número máximo de 4 assuntos');
      return;
    }

    if (formData.assuntos.includes(formData.assuntoInput.trim())) {
      setError('Este assunto já foi adicionado');
      return;
    }

    setFormData({
      ...formData,
      assuntos: [...formData.assuntos, formData.assuntoInput.trim()],
      assuntoInput: ''
    });
    setError(null);
  };

  // Remover um assunto da lista
  const handleRemoveAssunto = (assunto: string) => {
    setFormData({
      ...formData,
      assuntos: formData.assuntos.filter(a => a !== assunto)
    });
  };

  // Validar formulário
  const isFormValid = () => {
    if (formData.materia === 'Português' && formData.incluiRedacao) {
      return (
        formData.materia !== '' &&
        formData.assuntos.length === 4 &&
        formData.temaRedacao.trim() !== '' &&
        formData.textoRedacao.trim() !== ''
      );
    }
    return formData.materia !== '' && formData.assuntos.length === 4;
  };

  // Criar simulado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      if (formData.materia === 'Português' && formData.incluiRedacao) {
        setError('Preencha o tema e o texto da redação.');
        return;
      }
      setError('Selecione uma matéria e 4 assuntos para criar o simulado');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess('Pesquisando assuntos e preparando simulado...');
    try {
      const temaCompleto = `${formData.materia}: ${formData.assuntos.join(', ')}`;
      await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: `Faça uma pesquisa educacional resumida sobre: ${temaCompleto}. Foque nos principais conceitos.`
        }),
      });
      setSuccess('Gerando simulado com questões ilustradas...');
      const bodySimulado: any = {
        topic: temaCompleto,
        questionCount: 10,
        timeLimit: 5,
        includeImages: true,
        imageCount: 3,
        questionType: 'multiple_choice',
        includeEssay: formData.incluiRedacao
      };
      if (formData.incluiRedacao) {
        bodySimulado.essayTopic = formData.temaRedacao;
        bodySimulado.essayText = formData.textoRedacao;
      }
      const response = await fetch(`${API_URL}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodySimulado),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro ao conectar com o servidor' }));
        throw new Error(errorData.error || 'Erro ao gerar simulado');
      }
      const data = await response.json().catch(() => {
        throw new Error('Resposta inválida do servidor');  
      });
      if (!data || !data.quizId) {
        throw new Error('Resposta incompleta do servidor');
      }
      setSuccess('Simulado criado com sucesso! Você será redirecionado em instantes...');
      setTimeout(() => {
        navigate(`/quizzes/${data.quizId}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor');
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f9fafb',
      padding: '2rem 1rem',
      boxSizing: 'border-box'
    }}>
      <div className="w-full max-w-2xl mx-auto">
        {/* Botão de voltar */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-green-500 hover:text-green-700 font-semibold transition-colors"
          >
            <FiArrowLeft className="mr-2" size={22} />
            Voltar ao Início
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 w-full mb-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Criar Simulado</h1>
          <div className="flex items-center text-green-600 mb-4">
            <FiBook className="mr-2 h-5 w-5" />
            <h2 className="text-xl font-semibold">Novo Simulado Personalizado</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="materia" className="block text-sm font-medium text-gray-700 mb-1">
                Matéria
              </label>
              <select
                id="materia"
                value={formData.materia}
                onChange={handleMateriaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jumbo"
                disabled={isLoading}
              >
                <option value="">Selecione uma matéria</option>
                {MATERIAS.map(materia => (
                  <option key={materia} value={materia}>{materia}</option>
                ))}
              </select>
            </div>
            
            {/* Opção de redação apenas para Português */}
            {formData.materia === 'Português' && (
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="incluiRedacao"
                  checked={formData.incluiRedacao}
                  onChange={handleRedacaoChange}
                  className="h-4 w-4 text-jumbo border-gray-300 rounded focus:ring-jumbo"
                  disabled={isLoading}
                />
                <label htmlFor="incluiRedacao" className="ml-2 block text-sm text-gray-700">
                  Incluir questão de redação
                </label>
              </div>
            )}
            {/* Interface de redação */}
            {formData.materia === 'Português' && formData.incluiRedacao && (
              <div className="bg-gray-50 border border-jumbo rounded-md p-6 mb-2">
                <h3 className="text-lg font-semibold text-jumbo mb-2 flex items-center">
                  <FiBook className="mr-2 h-5 w-5" /> Redação
                </h3>
                <p className="text-gray-600 mb-3 text-sm">Digite o tema da redação e escreva seu texto. O limite máximo é de 30 linhas.</p>
                <div className="mb-3">
                  <label htmlFor="temaRedacao" className="block text-sm font-medium text-gray-700 mb-1">Tema da Redação</label>
                  <input
                    type="text"
                    id="temaRedacao"
                    placeholder="Digite o tema da redação"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jumbo"
                    disabled={isLoading}
                    value={formData.temaRedacao}
                    onChange={e => setFormData({ ...formData, temaRedacao: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="textoRedacao" className="block text-sm font-medium text-gray-700 mb-1">Texto da Redação</label>
                  <textarea
                    id="textoRedacao"
                    placeholder="Digite sua redação aqui..."
                    rows={10}
                    maxLength={3000}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jumbo resize-none"
                    style={{ lineHeight: '1.5', minHeight: '180px', maxHeight: '450px' }}
                    disabled={isLoading}
                    value={formData.textoRedacao}
                    onChange={e => setFormData({ ...formData, textoRedacao: e.target.value })}
                  />
                  <span className="text-xs text-gray-400 block mt-1">Máximo de 30 linhas.</span>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="assuntos" className="block text-sm font-medium text-gray-700 mb-1">
                Assuntos <span className="text-gray-500 text-xs ml-2">(Selecione exatamente 4 assuntos)</span>
              </label>
              
              <div className="flex">
                <input
                  type="text"
                  id="assuntos"
                  value={formData.assuntoInput}
                  onChange={handleAssuntoInputChange}
                  placeholder="Digite um assunto e adicione"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-jumbo"
                  disabled={isLoading || formData.assuntos.length >= 4}
                />
                <button
                  type="button"
                  onClick={handleAddAssunto}
                  disabled={isLoading || !formData.assuntoInput.trim() || formData.assuntos.length >= 4}
                  className="px-4 py-2 bg-jumbo text-white rounded-r-md hover:bg-jumbo/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar
                </button>
              </div>
              
              <div className="mt-2">
                {formData.assuntos.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    Nenhum assunto selecionado. Adicione 4 assuntos.
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {formData.assuntos.map(assunto => (
                      <li 
                        key={assunto} 
                        className="bg-jumbo/10 text-jumbo px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{assunto}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAssunto(assunto)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          disabled={isLoading}
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full px-4 py-2 bg-jumbo text-white font-medium rounded-md hover:bg-jumbo/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                  Criando Simulado...
                </span>
              ) : (
                'Criar Simulado'
              )}
            </button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              {success}
            </div>
          )}
        </div>
        
        {/* Espaço adicional para garantir rolagem */}
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
}; 