import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const opcoesLinhas = Array.from({ length: 9 }, (_, i) => 10 + i * 5); // [10, 15, ..., 50]

const exemploMeioAmbiente = [
  'A preservação ambiental é um dever que passa de uma geração à outra.',
  'Nosso planeta oferece recursos limitados, essenciais para a vida.',
  'A exploração excessiva, contudo, põe em risco esse sistema frágil.',
  'Incêndios devastam ecossistemas inteiros muito rapidamente.',
  'Rios poluídos transportam dejetos nocivos até os oceanos.',
  'O ar nas cidades grandes fica denso, cheio de fumaça e gases.',
  'Cada desequilíbrio afeta também a saúde de todos nós.',
  'As mudanças climáticas acentuam eventos extremos como secas e inundações.',
  'Populações mais frágeis são as primeiras a sofrer as consequências.',
  'Por isso, políticas públicas focadas na sustentabilidade são cruciais.',
  'Mas o governo não pode resolver sozinho esse desafio que é de todos.',
  'Empresas precisam usar métodos ecologicamente corretos e transparentes.',
  'Os consumidores podem mudar o mercado ao escolher produtos sustentáveis.',
  'A reciclagem diminui a carga nos aterros e promove a economia circular.',
  'Fontes de energia renovável, como a solar e a eólica, já são boas opções.',
  'Elas reduzem a emissão de carbono sem prejudicar o crescimento.',
  'Tecnologias sustentáveis criam empregos e inovação de alto nível.',
  'No campo, a agrofloresta recupera o solo e aumenta a produção.',
  'Na cidade, telhados verdes diminuem o calor e embelezam o ambiente.',
  'A educação ambiental é a base de toda mudança que permanece.',
  'Crianças que plantam árvores entendem, de fato, como a vida funciona.',
  'Universidades pesquisam materiais biodegradáveis para substituir plásticos.',
  'A ciência oferece dados reais que ajudam a tomar decisões certas.',
  'No entanto, informação sem ação vira apenas um número.',
  'Pequenas atitudes diárias somam grandes resultados.',
  'Fechar a torneira ao escovar os dentes economiza água potável.',
  'Usar o transporte público reduz o trânsito e a poluição.',
  'Apoiar parques e reservas protege a biodiversidade.',
  'A arte também conscientiza através da música e do cinema.',
  'Movimentos sociais dão voz a quem antes não era ouvido.',
  'O direito a um meio ambiente equilibrado está na Constituição.',
  'Para cumpri-lo, é preciso fiscalização e participação de todos.',
  'Se não fizermos nada, vamos pagar com desastres sem volta.',
  'Mas se agirmos agora, ainda podemos recuperar muitos lugares.',
  'Afinal, proteger o meio ambiente é proteger a nós e ao futuro.'
];

function gerarFrasesVariadas(tema: string, linhas: number) {
  // Frases base para outros temas
  const frasesBase = [
    `O tema ${tema} é de grande relevância para a sociedade atual.`,
    `Diversos fatores contribuem para a complexidade do assunto ${tema}.`,
    `A reflexão sobre ${tema} é fundamental para o desenvolvimento social.`,
    `Historicamente, ${tema} tem sido alvo de debates e pesquisas.`,
    `A educação é uma ferramenta essencial para lidar com ${tema}.`,
    `Políticas públicas podem transformar a realidade relacionada a ${tema}.`,
    `A participação da sociedade é crucial para avanços em ${tema}.`,
    `A tecnologia pode ser aliada na solução de desafios ligados a ${tema}.`,
    `O papel da família e da escola é indispensável em ${tema}.`,
    `Mudanças de comportamento coletivo impactam diretamente ${tema}.`,
    `A mídia exerce influência significativa sobre a percepção de ${tema}.`,
    `Projetos sociais têm mostrado resultados positivos em ${tema}.`,
    `A legislação vigente busca garantir direitos relacionados a ${tema}.`,
    `A conscientização é o primeiro passo para mudanças efetivas em ${tema}.`,
    `O futuro depende das decisões tomadas hoje sobre ${tema}.`,
    `A pesquisa científica contribui para novas soluções em ${tema}.`,
    `O engajamento juvenil é promissor para o avanço de ${tema}.`,
    `A cultura local pode influenciar a abordagem de ${tema}.`,
    `A cooperação internacional é importante para resolver questões de ${tema}.`,
    `A ética deve nortear todas as ações relacionadas a ${tema}.`,
    `A inclusão social é um desafio e uma meta em ${tema}.`,
    `O acesso à informação facilita o entendimento sobre ${tema}.`,
    `A inovação é fundamental para superar obstáculos em ${tema}.`,
    `A responsabilidade individual e coletiva é essencial em ${tema}.`,
    `O diálogo aberto favorece soluções para ${tema}.`,
    `A valorização da diversidade enriquece o debate sobre ${tema}.`,
    `A sustentabilidade deve ser considerada em todas as ações sobre ${tema}.`,
    `A saúde mental pode ser impactada por questões ligadas a ${tema}.`,
    `A justiça social é um objetivo a ser alcançado em ${tema}.`,
    `A participação cidadã fortalece a democracia em temas como ${tema}.`,
    `A formação de professores é estratégica para avanços em ${tema}.`,
    `A economia criativa pode gerar oportunidades em ${tema}.`,
    `A mobilização popular já trouxe conquistas importantes em ${tema}.`,
    `A ciência e a arte podem dialogar para promover ${tema}.`,
    `A empatia é fundamental para compreender os desafios de ${tema}.`,
    `A globalização influencia o modo como lidamos com ${tema}.`,
    `A educação midiática é relevante para o debate sobre ${tema}.`,
    `A urbanização traz novos desafios para ${tema}.`,
    `A solidariedade é um valor importante em discussões sobre ${tema}.`
  ];
  // Embaralha as frases e pega a quantidade desejada
  const frases = [...frasesBase].sort(() => Math.random() - 0.5).slice(0, linhas);
  // Junta tudo em um único parágrafo corrido
  return frases.join(' ').replace(/\s+/g, ' ').trim();
}

export function RedacaoPage() {
  const [tema, setTema] = useState('');
  const [linhas, setLinhas] = useState(10);
  const [enviado, setEnviado] = useState(false);
  const [redacao, setRedacao] = useState('');
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRedacao(gerarRedacao(tema, linhas));
    setEnviado(true);
    setCopiado(false);
  };

  function gerarRedacao(tema: string, linhas: number) {
    if (!tema) return '';

    // Variações para evitar repetição
    const temaVariacoes = [
      tema,
      `essa questão sobre ${tema}`,
      `esse desafio relacionado a ${tema}`,
      `tal problemática envolvendo ${tema}`,
      `essa discussão acerca de ${tema}`,
      `esse cenário de ${tema}`,
      `essa realidade referente a ${tema}`,
      `essa situação ligada a ${tema}`,
      `esse contexto de ${tema}`,
      `isso no âmbito de ${tema}`,
      `tal aspecto de ${tema}`,
      `essa temática de ${tema}`,
      `essa pauta de ${tema}`,
      `essa circunstância de ${tema}`,
      `essa problemática social de ${tema}`,
      `essa demanda de ${tema}`,
      `essa esfera de ${tema}`,
      `esse panorama de ${tema}`
    ];
    let variacaoIndex = 0;
    const getTema = () => temaVariacoes[(variacaoIndex++) % temaVariacoes.length];

    // Conectivos variados e objetivos
    const conectivos = [
      'Além disso.',
      'Por outro lado.',
      'No entanto.',
      'Ademais.',
      'Dessa forma.',
      'Assim.',
      'Portanto.',
      'Contudo.',
      'Vale ressaltar.',
      'Cabe destacar.',
      'Em síntese.',
      'Sob esse viés.',
      'Nesse sentido.',
      'Logo.',
      'De fato.',
      'Em contrapartida.',
      'Por conseguinte.',
      'Em vista disso.',
      'Diante desse cenário.',
      'Consequentemente.',
      'Outrossim.',
      'Destaca-se.',
      'Convém salientar.',
      'Importante frisar.',
      'Ressalta-se.',
      'Cumpre observar.',
      'Sob tal perspectiva.',
      'Em virtude disso.',
      'Diante do exposto.'
    ];
    let conectivoIndex = 0;
    const getConectivo = () => conectivos[(conectivoIndex++) % conectivos.length];

    // Repertório sociocultural adaptado ao tema
    const repertorio = [
      `Segundo o sociólogo Zygmunt Bauman, desafios como ${tema} refletem a instabilidade das relações e valores na sociedade contemporânea.`,
      `A Constituição Federal de 1988, em seu artigo 5º, garante direitos fundamentais que são essenciais para o enfrentamento de ${tema}.`,
      `O filósofo Aristóteles já defendia que a virtude está no equilíbrio e na busca pelo bem comum. Esse princípio é fundamental para lidar com ${tema}.`,
      `Dados do IBGE apontam que questões relacionadas a ${tema} afetam milhões de brasileiros todos os anos.`,
      `A Declaração Universal dos Direitos Humanos, de 1948, reforça a importância da dignidade e igualdade. Esses valores são centrais no debate sobre ${tema}.`,
      `O educador Paulo Freire defendia a educação como instrumento de transformação social. Isso é essencial para superar os desafios de ${tema}.`,
      `A Agenda 2030 da ONU propõe metas globais para superar desafios como ${tema} e promover o desenvolvimento sustentável.`,
      `O artigo 205 da Constituição destaca a educação como direito de todos e dever do Estado e da família. Esse direito é crucial para combater problemas como ${tema}.`,
      `O Estatuto da Criança e do Adolescente (ECA) garante proteção integral aos jovens, especialmente diante de situações envolvendo ${tema}.`,
      `A filósofa Hannah Arendt analisou o papel da ação coletiva na construção de sociedades mais justas. Isso é fundamental para resolver ${tema}.`
    ];
    const getRepertorio = () => repertorio[Math.floor(Math.random() * repertorio.length)];

    // Introdução
    const introducao = `A discussão sobre ${tema} é de extrema importância para a sociedade contemporânea. O tema envolve questões que impactam diretamente o nosso cotidiano e exige soluções urgentes e eficazes. ${getRepertorio()} Diante disso, é fundamental analisar os principais aspectos de ${tema} e defender a necessidade de mudanças.`;

    // Desenvolvimento 1: contextualização, argumento, repertório e análise
    const desenvolvimento1 = `${getConectivo()} ${getTema()} apresenta raízes históricas e sociais profundas. É influenciada por fatores como desigualdade, falta de acesso à informação e políticas públicas insuficientes. ${getRepertorio()} No Brasil, observa-se que a ausência de debates amplos e a carência de investimentos em educação agravam ainda mais tal situação. Isso dificulta a superação desse desafio. Para transformar essa realidade, é necessário analisar suas causas estruturais e promover mudanças efetivas. Todas as ações devem estar relacionadas ao combate de ${tema}.`;

    // Desenvolvimento 2: consequências, exemplo real, análise crítica
    const desenvolvimento2 = `${getConectivo()} As consequências de ${getTema()} são perceptíveis no cotidiano. Refletem-se em prejuízos para o desenvolvimento social, econômico e cultural do país. Por exemplo, a persistência desse problema pode gerar exclusão, aumento da violência ou degradação ambiental, dependendo do tema abordado. Um caso emblemático é o de países que investiram em políticas públicas integradas e obtiveram avanços significativos em áreas relacionadas a ${tema}. A Finlândia se destaca na educação e a Alemanha em sustentabilidade. Experiências internacionais demonstram que a superação desse obstáculo exige esforços conjuntos entre governo, sociedade civil e iniciativa privada. É importante analisar criticamente as soluções adotadas em diferentes contextos, sempre com foco em ${tema}.`;

    // Proposta de intervenção detalhada
    const proposta = `Para enfrentar ${getTema()}, é imprescindível a implementação de uma proposta de intervenção articulada e diretamente relacionada ao tema. O governo federal, em parceria com estados e municípios, deve investir em campanhas educativas e políticas públicas inclusivas. É necessário promover o acesso à informação e à cidadania no contexto de ${tema}. Além disso, a participação da sociedade civil deve ser incentivada por meio de projetos sociais e ações comunitárias. Também é fundamental fiscalizar e punir práticas discriminatórias ou prejudiciais ligadas a ${tema}. Dessa forma, será possível construir uma sociedade mais justa, igualitária e respeitosa aos direitos humanos. Assim, os desafios impostos por ${tema} poderão ser superados.`;

    // Conclusão
    const conclusao = `Em síntese, a resolução de ${getTema()} demanda esforços coletivos, responsabilidade social e compromisso ético de todos os agentes envolvidos. Somente assim será possível promover avanços significativos e garantir um futuro mais digno para toda a população. Soluções efetivas para ${tema} são indispensáveis para o progresso do país.`;

    // Montagem do texto
    return [
      introducao,
      desenvolvimento1,
      desenvolvimento2,
      proposta,
      conclusao
    ].join(' ');
  }

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(redacao);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-5xl px-4">
        <button
          className="flex items-center text-green-500 font-bold text-lg mb-8 hover:underline focus:outline-none"
          onClick={() => navigate('/')}
        >
          <FiArrowLeft className="mr-2" size={24} /> Voltar ao Início
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl mx-auto flex flex-col items-center">
          {enviado && (
            <>
              <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg w-full text-center font-sans">
                Redação criada! Veja abaixo a redação gerada pelo Jumbo.
              </div>
              <div className="w-full mt-4">
                <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Redação gerada:</label>
                <div className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 max-h-96 overflow-y-auto">
                  <pre className="text-base font-sans whitespace-pre-line text-gray-800">{redacao}</pre>
                </div>
                <button
                  onClick={handleCopiar}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Copiar Redação
                </button>
                {copiado && (
                  <div className="mt-2 text-green-600 text-sm font-sans">Redação copiada para a área de transferência!</div>
                )}
              </div>
            </>
          )}
          {!enviado && (
            <>
              <h1 className="text-3xl font-bold text-green-600 mb-8 text-center font-sans">Criar Redação</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Digite o tema da Redação</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    placeholder="Ex: Desafios da educação no Brasil, Meio ambiente, etc."
                    value={tema}
                    onChange={e => setTema(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full mb-8">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Quantidade de linhas</label>
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    value={linhas}
                    onChange={e => setLinhas(Number(e.target.value))}
                  >
                    {opcoesLinhas.map((num, idx) => (
                      <option key={idx} value={num}>{num} linhas</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold font-sans hover:bg-green-600 transition"
                >
                  Criar Redação
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 