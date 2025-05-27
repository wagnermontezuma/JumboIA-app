import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiBookOpen, FiEdit3 } from 'react-icons/fi';

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
  const location = useLocation();
  
  // Detectar modo via query string
  const isCorrecao = location.search.includes('correcao=1');
  // Se for correção, modo fixo; se não, modo criar fixo
  const [modo, setModo] = useState<'criar' | 'corrigir'>(isCorrecao ? 'corrigir' : 'criar');

  // Novos estados para a correção de redação
  const [redacaoParaCorrigir, setRedacaoParaCorrigir] = useState('');
  const [temaRedacao, setTemaRedacao] = useState('');
  const [tituloRedacao, setTituloRedacao] = useState('');
  const [redacaoCorrigida, setRedacaoCorrigida] = useState(false);
  const [errosRedacao, setErrosRedacao] = useState<Array<{inicio: number, tamanho: number, erro: string, explicacao: string}>>([]);
  const [notaRedacao, setNotaRedacao] = useState<number | null>(null);
  const [pontosMelhoria, setPontosMelhoria] = useState<string[]>([]);
  const [erroSelecionado, setErroSelecionado] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modo === 'criar') {
      setRedacao(gerarRedacao(tema, linhas));
      setEnviado(true);
      setCopiado(false);
    } else {
      corrigirRedacao();
    }
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
      'Além disso,',
      'Por outro lado,',
      'No entanto,',
      'Ademais,',
      'Dessa forma,',
      'Assim,',
      'Portanto,',
      'Contudo,',
      'Vale ressaltar que',
      'Cabe destacar que',
      'Em síntese,',
      'Sob esse viés,',
      'Nesse sentido,',
      'Logo,',
      'De fato,',
      'Em contrapartida,',
      'Por conseguinte,',
      'Em vista disso,',
      'Diante desse cenário,',
      'Consequentemente,',
      'Outrossim,',
      'Destaca-se que',
      'Convém salientar que',
      'É importante frisar que',
      'Ressalta-se que',
      'Cumpre observar que',
      'Sob tal perspectiva,',
      'Em virtude disso,',
      'Diante do exposto,'
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

    // ====== NOVA ESTRUTURA DE REDAÇÃO ======

    // Introdução: contextualização + tese clara
    const introducao = `
      A discussão sobre ${tema} tem ganhado relevância crescente na sociedade brasileira contemporânea. 
      ${getRepertorio()} 
      Diante desse cenário, é fundamental analisar os principais desafios e oportunidades relacionados a esse tema, 
      bem como defender a necessidade de ações articuladas entre governo e sociedade para enfrentar essa questão.
    `;

    // Desenvolvimento 1: primeiro argumento principal com repertório
    const desenvolvimento1 = `
      ${getConectivo()} em primeiro lugar, é necessário compreender que ${getTema()} apresenta raízes históricas e sociais profundas. 
      ${getRepertorio()} 
      No Brasil, observa-se que fatores como a desigualdade social, a falta de políticas públicas eficientes e o acesso limitado à educação de qualidade 
      contribuem significativamente para a persistência desse problema. Tais elementos, quando analisados em conjunto, 
      evidenciam a complexidade de ${tema} e a necessidade de uma abordagem multidimensional para sua resolução.
    `;

    // Desenvolvimento 2: segundo argumento com outro aspecto ou contraponto
    const desenvolvimento2 = `
      ${getConectivo()} é importante destacar também que as consequências de ${getTema()} são perceptíveis em diversos âmbitos da sociedade. 
      A persistência desse problema gera impactos negativos para o desenvolvimento social, econômico e cultural do país. 
      Um caso exemplar é o de nações que investiram em políticas públicas integradas e obtiveram avanços significativos em questões semelhantes, 
      como a Finlândia na educação e a Alemanha em sustentabilidade. Essas experiências demonstram que a superação dos desafios relacionados a ${tema} 
      exige esforços conjuntos e comprometimento com mudanças estruturais, sempre com base em evidências científicas e respeito aos direitos humanos.
    `;

    // Conclusão: retomada da tese + proposta de intervenção
    const conclusao = `
      Portanto, conforme discutido, ${getTema()} representa um desafio complexo que requer atenção prioritária. 
      Para enfrentá-lo de maneira efetiva, é imprescindível que o governo federal, em parceria com estados e municípios, 
      implemente políticas públicas abrangentes que promovam educação, conscientização e participação social. 
      Paralelamente, as instituições educacionais devem fortalecer programas de formação crítica e cidadã, 
      enquanto a sociedade civil precisa exercer seu papel fiscalizador e propositivo. Somente por meio dessas ações articuladas 
      será possível construir um futuro mais justo e igualitário, no qual ${tema} seja tratado com a devida importância 
      e as soluções propostas sejam verdadeiramente eficazes.
    `;

    // Montagem do texto final, removendo espaços extras e formatando corretamente
    const textoFinal = [
      introducao.replace(/\s+/g, ' ').trim(),
      desenvolvimento1.replace(/\s+/g, ' ').trim(),
      desenvolvimento2.replace(/\s+/g, ' ').trim(),
      conclusao.replace(/\s+/g, ' ').trim()
    ].join('\n\n');

    return textoFinal;
  }

  function corrigirRedacao() {
    // Simulação de correção de redação (em um ambiente real, isto seria feito via API)
    // Agora, cada erro tem índice inicial e tamanho do trecho a ser destacado
    const errosSimulados: Array<{inicio: number, tamanho: number, erro: string, explicacao: string}> = [];
    const texto = redacaoParaCorrigir;

    // Exemplo: encontrar a palavra "que"
    let idx = texto.indexOf(' que ');
    if (idx !== -1) {
      errosSimulados.push({
        inicio: idx + 1, // pula o espaço
        tamanho: 3,
        erro: "Uso excessivo de 'que'",
        explicacao: "O uso repetitivo do pronome 'que' pode deixar o texto cansativo. Tente reescrever a frase para evitar repetições."
      });
    }
    // Exemplo: encontrar advérbio vago "muito"
    idx = texto.indexOf('muito');
    if (idx !== -1) {
      errosSimulados.push({
        inicio: idx,
        tamanho: 5,
        erro: "Advérbio vago",
        explicacao: "Evite advérbios vagos como 'muito'. Prefira termos mais específicos para dar precisão ao texto."
      });
    }
    // Exemplo: período muito longo (frase com mais de 30 palavras)
    const frases = texto.split(/[.!?]/);
    frases.forEach(frase => {
      const palavras = frase.trim().split(/\s+/);
      if (palavras.length > 30) {
        const inicio = texto.indexOf(frase);
        errosSimulados.push({
          inicio,
          tamanho: frase.length,
          erro: "Período muito longo",
          explicacao: "Frases muito longas dificultam a compreensão. Divida em períodos menores."
        });
      }
    });

    const melhoriasSimuladas = [
      "Desenvolva melhor seus argumentos com exemplos concretos",
      "Utilize repertório sociocultural mais variado para enriquecer o texto",
      "Evite repetições de ideias entre os parágrafos",
      "Conclua com uma proposta de intervenção mais detalhada"
    ];

    // Nota consistente baseada em hash simples do texto
    function hashCode(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    }
    const notaBase = 600;
    const notaMax = 950;
    const hash = hashCode(texto);
    const notaSimulada = notaBase + (hash % (notaMax - notaBase + 1));

    setErrosRedacao(errosSimulados);
    setPontosMelhoria(melhoriasSimuladas);
    setNotaRedacao(notaSimulada);
    setRedacaoCorrigida(true);
  }

  function destacarErros(texto: string) {
    if (errosRedacao.length === 0) return <p>{texto}</p>;

    let resultado = [];
    let ultimoIndice = 0;

    // Ordena os erros por índice para processar em ordem
    const errosOrdenados = [...errosRedacao].sort((a, b) => a.inicio - b.inicio);

    for (let i = 0; i < errosOrdenados.length; i++) {
      const erro = errosOrdenados[i];
      // Texto antes do erro
      if (erro.inicio > ultimoIndice) {
        resultado.push(
          <span key={`texto-${i}`}>{texto.substring(ultimoIndice, erro.inicio)}</span>
        );
      }
      // Texto do erro destacado
      resultado.push(
        <span
          key={`erro-${i}`}
          className={`bg-yellow-200 cursor-pointer ${erroSelecionado === i ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setErroSelecionado(erroSelecionado === i ? null : i)}
          title={erro.erro}
        >
          {texto.substring(erro.inicio, erro.inicio + erro.tamanho)}
        </span>
      );
      ultimoIndice = erro.inicio + erro.tamanho;
    }
    // Texto após o último erro
    if (ultimoIndice < texto.length) {
      resultado.push(
        <span key="texto-final">{texto.substring(ultimoIndice)}</span>
      );
    }
    return <p>{resultado}</p>;
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

  // Função para limpar os estados e voltar ao formulário
  const handleNovaCorrecao = () => {
    setRedacaoParaCorrigir('');
    setTemaRedacao('');
    setTituloRedacao('');
    setRedacaoCorrigida(false);
    setErrosRedacao([]);
    setNotaRedacao(null);
    setPontosMelhoria([]);
    setErroSelecionado(null);
  };

  // Funções para alternar entre os modos (agora só funcionam se não for modo fixo)
  const alternarParaCriar = () => {
    if (!isCorrecao) {
      setModo('criar');
      setEnviado(false);
      handleNovaCorrecao();
    }
  };

  const alternarParaCorrigir = () => {
    if (!isCorrecao) {
      setModo('corrigir');
      setEnviado(false);
      setRedacao('');
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
          {/* Modo criar redação */}
          {modo === 'criar' && !isCorrecao && enviado && (
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
          
          {modo === 'criar' && !isCorrecao && !enviado && (
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
          
          {/* Modo corrigir redação */}
          {modo === 'corrigir' && isCorrecao && redacaoCorrigida && (
            <>
              <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg w-full text-center font-sans">
                Redação corrigida! Veja abaixo a análise.
              </div>
              
              {/* Exibir nota */}
              <div className="w-full mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Sua nota:</h2>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-2xl font-bold">
                    {notaRedacao} / 1000
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-3">Pontos para melhorar:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {pontosMelhoria.map((ponto, idx) => (
                      <li key={idx} className="text-gray-700">{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Texto com erros destacados */}
              <div className="w-full mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Texto corrigido:</h3>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  {destacarErros(redacaoParaCorrigir)}
                </div>
              </div>
              
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNovaCorrecao}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center"
                >
                  <FiEdit3 className="mr-2" /> Nova Correção
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(redacaoParaCorrigir)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center"
                >
                  Copiar Texto
                </button>
              </div>
            </>
          )}
          
          {modo === 'corrigir' && isCorrecao && !redacaoCorrigida && (
            <>
              <h1 className="text-3xl font-bold text-green-600 mb-8 text-center font-sans">Corrigir Redação</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Tema da Redação <span className="text-gray-500 text-sm">(obrigatório)</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    placeholder="Ex: Desafios da educação no Brasil"
                    value={temaRedacao}
                    onChange={e => setTemaRedacao(e.target.value)}
                    required
                  />
                </div>
                
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Título <span className="text-gray-500 text-sm">(opcional)</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    placeholder="Título da sua redação"
                    value={tituloRedacao}
                    onChange={e => setTituloRedacao(e.target.value)}
                  />
                </div>
                
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Texto da Redação <span className="text-gray-500 text-sm">(obrigatório)</span></label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition h-64"
                    placeholder="Digite sua redação aqui..."
                    value={redacaoParaCorrigir}
                    onChange={e => setRedacaoParaCorrigir(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold font-sans hover:bg-green-600 transition flex items-center justify-center"
                >
                  <FiCheck className="mr-2" /> Corrigir Redação
                </button>
              </form>
            </>
          )}
          {/* Se não for modo fixo, renderiza normalmente os modos */}
          {modo === 'corrigir' && !isCorrecao && redacaoCorrigida && (
            <>
              <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg w-full text-center font-sans">
                Redação corrigida! Veja abaixo a análise.
              </div>
              
              {/* Exibir nota */}
              <div className="w-full mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Sua nota:</h2>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-2xl font-bold">
                    {notaRedacao} / 1000
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-3">Pontos para melhorar:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {pontosMelhoria.map((ponto, idx) => (
                      <li key={idx} className="text-gray-700">{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Texto com erros destacados */}
              <div className="w-full mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Texto corrigido:</h3>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  {destacarErros(redacaoParaCorrigir)}
                </div>
              </div>
              
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNovaCorrecao}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center"
                >
                  <FiEdit3 className="mr-2" /> Nova Correção
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(redacaoParaCorrigir)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center"
                >
                  Copiar Texto
                </button>
              </div>
            </>
          )}
          {modo === 'corrigir' && !isCorrecao && !redacaoCorrigida && (
            <>
              <h1 className="text-3xl font-bold text-green-600 mb-8 text-center font-sans">Corrigir Redação</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Tema da Redação <span className="text-gray-500 text-sm">(obrigatório)</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    placeholder="Ex: Desafios da educação no Brasil"
                    value={temaRedacao}
                    onChange={e => setTemaRedacao(e.target.value)}
                    required
                  />
                </div>
                
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Título <span className="text-gray-500 text-sm">(opcional)</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    placeholder="Título da sua redação"
                    value={tituloRedacao}
                    onChange={e => setTituloRedacao(e.target.value)}
                  />
                </div>
                
                <div className="w-full mb-6">
                  <label className="block text-base font-medium text-gray-700 mb-2 font-sans">Texto da Redação <span className="text-gray-500 text-sm">(obrigatório)</span></label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg font-sans focus:ring-2 focus:ring-green-400 focus:border-green-400 transition h-64"
                    placeholder="Digite sua redação aqui..."
                    value={redacaoParaCorrigir}
                    onChange={e => setRedacaoParaCorrigir(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold font-sans hover:bg-green-600 transition flex items-center justify-center"
                >
                  <FiCheck className="mr-2" /> Corrigir Redação
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 