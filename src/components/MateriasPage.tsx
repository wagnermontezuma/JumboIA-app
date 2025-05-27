import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

// Lista de matérias disponíveis
const materias = [
  { id: 'matematica', nome: '➗ Matemática' },
  { id: 'portugues', nome: '📚 Português' },
  { id: 'fisica', nome: '📚 Física' },
  { id: 'quimica', nome: '⚗️ Química' },
  { id: 'biologia', nome: '🧬 Biologia' },
  { id: 'historia', nome: '🏺 História' },
  { id: 'geografia', nome: '🌎 Geografia' },
  { id: 'ciencias', nome: '🔎 Ciências' },
  { id: 'filosofia', nome: '💭 Filosofia' },
  { id: 'sociologia', nome: '👥 Sociologia' },
  { id: 'ingles', nome: '🗽 Inglês' },
  { id: 'espanhol', nome: '🪇 Espanhol' }
];

// Interface para o estado do assunto
interface AssuntoState {
  materia: string | null;
  assunto: string;
  contexto: string;
  conclusao: string;
  isLoading: boolean;
  isAlgebra: boolean;
}

export const MateriasPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMateria, setSelectedMateria] = useState<string | null>(null);
  const [showAssuntoInput, setShowAssuntoInput] = useState(false);
  const [assuntoInput, setAssuntoInput] = useState('');
  const [resultado, setResultado] = useState<AssuntoState>({
    materia: null,
    assunto: '',
    contexto: '',
    conclusao: '',
    isLoading: false,
    isAlgebra: false
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ref para o container principal
  const explicacaoRef = useRef<HTMLDivElement>(null);

  // Função para selecionar uma matéria
  const handleMateriaSelect = (materiaId: string) => {
    setSelectedMateria(materiaId);
    setShowAssuntoInput(true);
    setResultado({
      materia: materiaId,
      assunto: '',
      contexto: '',
      conclusao: '',
      isLoading: false,
      isAlgebra: false
    });
  };

  // Função para lidar com a mudança no input de assunto
  const handleAssuntoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssuntoInput(e.target.value);
  };

  // Função para gerar a explicação e conclusão para o assunto
  const handleSubmitAssunto = async () => {
    if (!assuntoInput.trim()) return;

    setResultado(prev => ({
      ...prev,
      assunto: assuntoInput,
      isLoading: true
    }));

    try {
      setTimeout(() => {
        let explicacao = '';
        let conclusao = '';
        const assunto = assuntoInput.trim().toLowerCase();

        if (assunto.includes('bhaskara') || assunto.includes('baskara')) {
          explicacao = `O que é uma equação quadrática?\n\nÉ toda equação no formato:\nax² + bx + c = 0, onde a ≠ 0.\nOs números a, b e c são chamados de coeficientes.\n\n2. A Fórmula de Bhaskara\n\nPara encontrar as raízes (valores de x) usa-se:\nx = (-b ± √(b² - 4ac)) / 2a\nO símbolo ± indica que existem duas soluções: uma com "+" e outra com "–".\nO termo dentro da raiz, b² - 4ac, chama-se Δ (delta) ou discriminante.\n\n3. Passo a passo para usar Bhaskara:\n- Identifique a, b e c na equação.\n- Calcule o discriminante: Δ = b² - 4ac.\n- Verifique o sinal de Δ:\n    Δ > 0 → duas raízes reais diferentes.\n    Δ = 0 → uma raiz real dupla.\n    Δ < 0 → raízes complexas (não reais).\n- Substitua na fórmula e resolva:\n    x₁ = (-b + √Δ) / 2a\n    x₂ = (-b - √Δ) / 2a\n\n4. Exemplo rápido\nResolva 2x² - 4x - 6 = 0.\n- a = 2, b = -4, c = -6\n- Δ = (-4)² - 4·2·(-6) = 16 + 48 = 64\n- Como Δ > 0, teremos duas raízes reais:\n  x₁ = (4 + 8) / 4 = 12 / 4 = 3\n  x₂ = (4 - 8) / 4 = -4 / 4 = -1\nSoluções: x = 3 e x = -1.\n\n5. Dicas comuns\n- Sempre simplifique a equação antes (ex.: divida todos os termos se possível).\n- Se Δ der negativo e você só precisa de raízes reais, conclua que "não há solução real".\n- Verifique se não esqueceu de extrair a raiz quadrada de Δ nem de dividir por 2a.\n\nCom esses passos, você consegue resolver qualquer equação do segundo grau usando Bhaskara!`;

          conclusao = `A fórmula de Bhaskara permite encontrar as raízes de qualquer equação do segundo grau. Basta identificar os coeficientes, calcular o delta e aplicar na fórmula para resolver rapidamente.`;
        } else if (assunto.includes('álgebra') || assunto.includes('algebra')) {
          explicacao = `1. O que é álgebra?\n\nÁlgebra é o ramo da matemática que usa símbolos (normalmente letras) para representar números ou quantidades desconhecidas. Esses símbolos permitem generalizar regras e resolver problemas sem precisar de valores específicos.\n\n2. Por que usamos letras?\n- Para expressar variáveis: valores que podem mudar.\n- Para escrever fórmulas universais, como A=πr² ou F=ma.\n- Para resolver problemas quando parte da informação não é conhecida.\n\n3. Blocos principais da álgebra (veja a tabela abaixo)\n\n4. Resolver equações lineares (ex.: 2x+5=11)\n- Isole o termo com x: 2x=11−5=6.\n- Divida pelo coeficiente: x=6/2=3.\n\n5. Equações do 2.º grau (quadráticas)\nForma geral: ax²+bx+c=0.\nUse a fórmula de Bhaskara para achar x: x=[−b±√(b²−4ac)]/2a.\n\n6. Conceito de função\nUma função associa cada entrada x a uma saída y. Ex.: se f(x)=2x, então f(3)=6.\n\n7. Álgebra na prática\n- Física: leis como v=v₀+at.\n- Finanças: juros compostos M=P(1+i)ⁿ.\n- Programação: fórmulas em algoritmos e gráficos.\n- Cotidiano: dividir a conta, calcular descontos, planejar rotas.\n\n8. Dicas para estudar\n- Aprenda propriedades (distributiva, comutativa, associativa).\n- Pratique isolando variáveis.\n- Verifique soluções substituindo na equação.\n- Use gráficos para visualizar funções.`;

          conclusao = `Resumo: Álgebra é a linguagem que transforma problemas em símbolos manipuláveis, permitindo descobrir valores desconhecidos e modelar situações do mundo real.`;
        } else if (
          (assunto.includes('lei') && assunto.includes('newton')) ||
          assunto.includes('leis de newton')
        ) {
          explicacao = `Leis de Newton – Explicação Didática\n\n1ª Lei – Lei da Inércia\nUm corpo parado tende a continuar parado, e um corpo em movimento tende a continuar em movimento retilíneo e uniforme, a menos que uma força externa atue sobre ele.\nExemplo: Quando o ônibus freia de repente, seu corpo "vai pra frente" porque ele queria manter o movimento.\n\n2ª Lei – Lei da Dinâmica\nA variação do movimento de um corpo é proporcional à força resultante aplicada e ocorre na mesma direção dessa força.\nFórmula: F = m · a\nExemplo: Um carro de 2.000 kg precisa de uma força muito maior que uma moto de 200 kg para obter a mesma aceleração.\n\n3ª Lei – Lei da Ação e Reação\nPara toda força de ação existe uma força de reação de mesma intensidade e direção, mas sentido oposto.\nExemplo: Ao saltar de um barco parado, você vai para a frente e o barco recua.\n\nDicas:\n- Sempre desenhe as forças (setas) antes de aplicar a 2ª lei.\n- Ação e reação nunca atuam no mesmo corpo.\n- A 1ª lei é um caso particular da 2ª quando a força resultante é zero.`;

          conclusao = `As três leis de Newton explicam como e por que os objetos se movem ou permanecem parados.\n- A 1ª lei fala sobre a tendência natural dos corpos (inércia).\n- A 2ª lei mostra como a força muda o movimento.\n- A 3ª lei explica que toda ação tem uma reação igual e oposta.\nCom esses princípios, conseguimos entender desde uma maçã caindo até foguetes no espaço!`;
        } else {
          // Explicação didática padrão
          explicacao = `"${assuntoInput}" é um tema importante dentro da matéria escolhida.\n\nO que é?\n${assuntoInput} refere-se a um conjunto de conceitos, regras ou fenômenos que são fundamentais para entender diversos tópicos relacionados.\n\nPara que serve?\nServe para explicar, analisar ou resolver situações específicas, sendo essencial para o desenvolvimento do raciocínio lógico e da compreensão do conteúdo.\n\nPrincipais pontos:\n- Definição: Explique o conceito central de ${assuntoInput}.\n- Características: Liste as principais características ou propriedades.\n- Exemplos: Dê exemplos práticos de onde ${assuntoInput} é aplicado.\n- Dicas: Apresente dicas para entender ou memorizar o assunto.\n\nAplicações:\n${assuntoInput} pode ser utilizado em exercícios, problemas do dia a dia, provas e até em situações profissionais, mostrando sua importância além da sala de aula.\n\nCuriosidades:\nVocê sabia que ${assuntoInput} é frequentemente cobrado em vestibulares e concursos? Dominar esse tema pode facilitar a resolução de questões e aumentar seu desempenho acadêmico.`;

          conclusao = `Resumindo: ${assuntoInput} é um conceito essencial, com aplicações práticas e teóricas, e entender bem esse tema vai te ajudar a resolver questões e compreender melhor a matéria.`;
        }

        setResultado(prev => ({
          ...prev,
          contexto: explicacao,
          conclusao: conclusao,
          isLoading: false,
          isAlgebra: assunto.includes('álgebra') || assunto.includes('algebra')
        }));
      }, 1500);
    } catch (error) {
      console.error('Erro ao gerar explicação e conclusão:', error);
      setResultado(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  };

  // Função para voltar à lista de matérias
  const handleVoltar = () => {
    if (resultado.contexto) {
      // Se já temos um resultado, volta para o input de assunto
      setResultado(prev => ({
        ...prev,
        contexto: '',
        conclusao: ''
      }));
    } else if (showAssuntoInput) {
      // Se estamos na tela de input de assunto, volta para a seleção de matérias
      setShowAssuntoInput(false);
      setSelectedMateria(null);
      setAssuntoInput('');
    } else {
      // Se estamos na tela inicial, navega para a página anterior
      navigate(-1);
    }
  };

  // Rolagem automática para o topo da explicação/conclusão
  useEffect(() => {
    if (resultado.contexto && explicacaoRef.current) {
      explicacaoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [resultado.contexto]);

  // Mostrar botão de voltar ao topo ao rolar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto pb-10">
        <button 
          onClick={handleVoltar} 
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Voltar
        </button>
        {(showAssuntoInput || resultado.contexto) && (
          <button
            onClick={() => {
              setShowAssuntoInput(false);
              setSelectedMateria(null);
              setAssuntoInput('');
              setResultado({
                materia: null,
                assunto: '',
                contexto: '',
                conclusao: '',
                isLoading: false,
                isAlgebra: false
              });
            }}
            className="mb-4 ml-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
          >
            Voltar ao início
          </button>
        )}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          {!showAssuntoInput ? (
            // Tela de seleção de matérias
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Selecione uma Matéria</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
                {materias.map((materia) => (
                  <div 
                    key={materia.id}
                    onClick={() => handleMateriaSelect(materia.id)}
                    className="bg-green-50 hover:bg-green-100 cursor-pointer rounded-lg p-4 text-center transition shadow hover:shadow-md"
                  >
                    <h2 className="text-lg font-semibold">{materia.nome}</h2>
                  </div>
                ))}
              </div>
            </>
          ) : resultado.contexto ? (
            // Tela de exibição do resultado (contexto e conclusão)
            <div ref={explicacaoRef}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  {materias.find(m => m.id === selectedMateria)?.nome}: {resultado.assunto}
                </h1>
                <button
                  onClick={() => {
                    setShowAssuntoInput(false);
                    setSelectedMateria(null);
                    setAssuntoInput('');
                    setResultado({
                      materia: null,
                      assunto: '',
                      contexto: '',
                      conclusao: '',
                      isLoading: false,
                      isAlgebra: false
                    });
                  }}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition ml-4"
                >
                  Voltar ao início
                </button>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Explicação</h2>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line max-h-96 md:max-h-[500px] overflow-y-auto">
                  {resultado.contexto}
                </div>
                {resultado.isAlgebra && (
                  <div className="overflow-x-auto mt-4 bg-gray-50 p-2 rounded-lg">
                    <table className="min-w-full border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border px-2 py-1">Bloco</th>
                          <th className="border px-2 py-1">O que estuda</th>
                          <th className="border px-2 py-1">Exemplo rápido</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-2 py-1">Expressões</td>
                          <td className="border px-2 py-1">Combinações de números, variáveis e operações</td>
                          <td className="border px-2 py-1">3x+2</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Equações</td>
                          <td className="border px-2 py-1">Igualdades com incógnitas</td>
                          <td className="border px-2 py-1">2x+5=11</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Inequações</td>
                          <td className="border px-2 py-1">Relações de maior/menor</td>
                          <td className="border px-2 py-1">x−3&gt;7</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Funções</td>
                          <td className="border px-2 py-1">Relação entre conjuntos de valores</td>
                          <td className="border px-2 py-1">f(x)=x²+1</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Polinômios</td>
                          <td className="border px-2 py-1">Expressões com várias potências de x</td>
                          <td className="border px-2 py-1">x³−4x+7</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">Sistemas</td>
                          <td className="border px-2 py-1">Conjunto de equações simultâneas</td>
                          <td className="border px-2 py-1">{'{x+y=10, 2x−y=3}'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">Conclusão</h2>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line max-h-96 md:max-h-[500px] overflow-y-auto">
                  {resultado.conclusao}
                </div>
              </div>
            </div>
          ) : (
            // Tela de input de assunto
            <div>
              <h1 className="text-2xl font-bold mb-6">
                Em qual assunto de {materias.find(m => m.id === selectedMateria)?.nome} você está com dificuldade?
              </h1>
              
              <div className="mb-4">
                <input 
                  type="text"
                  value={assuntoInput}
                  onChange={handleAssuntoChange}
                  placeholder="Digite um assunto..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <button 
                onClick={handleSubmitAssunto}
                disabled={resultado.isLoading || !assuntoInput.trim()}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  resultado.isLoading || !assuntoInput.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'
                } transition`}
              >
                {resultado.isLoading ? 'Gerando...' : 'Gerar Explicação'}
              </button>
            </div>
          )}
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
          title="Voltar ao início"
        >
          <FaArrowUp size={22} />
        </button>
      )}
    </div>
  );
};

export default MateriasPage; 