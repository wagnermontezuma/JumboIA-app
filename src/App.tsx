import { useState, useRef, useEffect } from 'react';
import { FiSend, FiTrash2, FiLoader, FiInfo, FiCalendar, FiX } from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChatMessage, ApiResponse } from './types/chat';
import { SplashScreen } from './components/SplashScreen';
import { CrystalBallButton } from './components/CrystalBallButton';
import { CalendarButton } from './components/CalendarButton';
import LiveButton from './components/LiveButton';
import { SourcesDisplay } from './components/SourcesDisplay';
import { ResearchDisplay } from './components/ResearchDisplay';
import { CreditsModal } from './components/CreditsModal';
import { QuizzesPage } from './components/QuizzesPage';
import { QuizPage } from './components/QuizPage';
import { CalendarPage } from './components/CalendarPage';
import LiveDataPage from './components/LiveDataPage';
import { 
  getThematicContent,
  getBasicConcepts,
  getEssentialTerminology,
  getIntermediateConcepts,
  getPracticalApplications,
  getConnections,
  getCriticalAnalysis,
  getSpecialization,
  getRealWorldApplications,
  getRecommendedBooks,
  getThematicImage
} from './utils/studyGuideContent';

// Corrigido para garantir que a URL do backend seja sempre http://localhost:3001
const API_URL = 'http://localhost:3001';

// Logo para debugging
console.log('API URL configurada:', API_URL);

const MAX_INPUT_LENGTH = 5000; // Define o limite de caracteres

// Função para verificar se o conteúdo parece uma pesquisa
const isPesquisaContent = (content: string): boolean => {
  return content.includes('Pesquisa Completa') || 
         (content.includes('Doença') && content.includes('Transmissão') && content.includes('Sintomas'));
};

// Função para formatar o conteúdo da mensagem com suporte a markdown
const formatMessageContent = (content: string): string => {
  // Substitui URLs por links clicáveis
  const linkedContent = content.replace(
    /(https?:\/\/[^\s]+)/g, 
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
  );
  
  // Suporte a imagens markdown
  const withImages = linkedContent.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img src="$2" alt="$1" class="mt-2 max-w-full h-auto rounded-lg">'
  );
  
  return withImages;
};

// Logo JumboIA como texto
const JumboLogo = () => (
  <div className="flex items-center">
    <div>
      <span className="font-bold text-xl text-green-600">JumboIA</span>
      <div className="text-xs text-blue-500">by <span className="uppercase">Gotta</span></div>
    </div>
  </div>
);

// Versão simplificada do logo para a caixa de mensagem (sem o texto "by GOTTA")
const JumboLogoSimple = () => (
  <div className="flex items-center">
    <span className="font-bold text-green-600">JumboIA</span>
  </div>
);

// Componente para o indicador de digitação
const TypingIndicator = () => (
  <div className="flex space-x-2 p-3">
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing"></div>
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing [animation-delay:0.2s]"></div>
    <div className="w-2 h-2 bg-jumbo/60 rounded-full animate-typing [animation-delay:0.4s]"></div>
  </div>
);

// Componente para exibir o guia de estudos
// A conclusão é adicionada diretamente neste componente com estilos inline para garantir que sempre apareça, 
// independentemente de problemas com a renderização do conteúdo HTML
const StudyGuideDisplay = ({ title, content }: { title: string, content: string }) => {
  const materia = title.split(':')[1]?.split('-')[0]?.trim() || '';
  const tema = title.split('-')[1]?.trim() || '';
  
  // Função para obter contexto específico baseado na matéria
  const getContextoEspecifico = () => {
    switch(materia) {
      case 'Matemática':
        return "Na Matemática, o estudo sistemático dos números, quantidades e formas nos permite desenvolver o raciocínio lógico e resolver problemas complexos. Esta disciplina fundamental está presente em praticamente todas as ciências e tecnologias modernas, sendo essencial para o desenvolvimento de habilidades analíticas e pensamento estruturado. Desde as operações básicas até o cálculo avançado, a matemática fornece ferramentas para modelar fenômenos reais, analisar dados estatísticos, compreender padrões geométricos e resolver equações que descrevem o mundo ao nosso redor. O domínio desta matéria abre portas para carreiras em engenharia, economia, ciência da computação, física e muitas outras áreas.";
        
      case 'Português':
        return "A Língua Portuguesa, como instrumento de comunicação e expressão, nos permite articular pensamentos com clareza e precisão. O domínio da norma culta, da gramática e da interpretação textual é fundamental para o sucesso acadêmico e profissional, possibilitando uma comunicação eficaz em diversos contextos sociais. Estudar português vai além da memorização de regras gramaticais; envolve compreender a estrutura e evolução da língua, apreciar obras literárias, desenvolver capacidade crítica na leitura e aprimorar a habilidade de escrita em diferentes gêneros textuais. A fluência em português é essencial para expressar ideias, argumentar com consistência e interpretar as diversas manifestações culturais expressas por meio da linguagem.";
        
      case 'História':
        return "A História investiga o passado humano através de documentos, artefatos e outras evidências, buscando compreender as transformações das sociedades ao longo do tempo. Esta disciplina nos ajuda a entender o presente a partir das experiências coletivas anteriores, analisando causas e consequências dos acontecimentos para desenvolver uma visão crítica sobre a realidade atual. O estudo histórico abrange desde as primeiras civilizações até o mundo contemporâneo, explorando aspectos políticos, econômicos, sociais e culturais em diferentes épocas e regiões. Ao estudar História, desenvolvemos a capacidade de analisar criticamente fontes de informação, reconhecer continuidades e rupturas nos processos históricos, e compreender a complexidade das relações humanas em diferentes contextos temporais e espaciais.";
        
      case 'Geografia':
        return "A Geografia estuda as relações entre o espaço geográfico e as sociedades humanas, analisando tanto aspectos físicos do planeta quanto as transformações provocadas pela ação humana. Esta ciência nos ajuda a compreender fenômenos naturais como clima, relevo e vegetação, bem como questões socioeconômicas como urbanização, industrialização e conflitos territoriais. O conhecimento geográfico é fundamental para entender desafios contemporâneos como mudanças climáticas, globalização, desigualdades regionais e gestão de recursos naturais. Através de ferramentas como mapas, imagens de satélite e sistemas de informação geográfica, a Geografia nos permite visualizar e analisar padrões espaciais, contribuindo para o planejamento territorial e a tomada de decisões sobre questões ambientais e sociais.";
        
      case 'Ciências':
        return "As Ciências investigam os fenômenos naturais e as propriedades do mundo físico através da observação, experimentação e formulação de teorias. Esta área do conhecimento abrange disciplinas como Biologia, Química e Física, fundamentais para compreender desde a estrutura microscópica da matéria até os ecossistemas complexos do planeta. O estudo científico nos permite entender o funcionamento do corpo humano, a composição dos materiais, as transformações energéticas e os ciclos naturais que sustentam a vida na Terra. O pensamento científico, baseado em evidências e na aplicação do método científico, é essencial para o desenvolvimento tecnológico, a preservação ambiental, os avanços na saúde e o enfrentamento de desafios globais como pandemias e degradação ambiental.";
        
      case 'Física':
        return "A Física busca compreender os fenômenos naturais através de modelos matemáticos que descrevem o comportamento da matéria e energia. Esta ciência fundamental nos permite entender desde o movimento dos corpos celestes até as partículas subatômicas, sendo a base para inúmeros avanços tecnológicos que transformaram nossa sociedade. Dividida em áreas como mecânica, termodinâmica, eletromagnetismo, óptica, física quântica e relatividade, a Física fornece princípios e leis que explicam desde fenômenos cotidianos, como o arco-íris e o funcionamento de eletrodomésticos, até questões complexas como a origem do universo e o comportamento da luz. O pensamento físico, que combina raciocínio matemático e experimentação controlada, é essencial para o desenvolvimento de novas tecnologias em áreas como energia, telecomunicações, medicina e exploração espacial.";
        
      case 'Química':
        return "A Química estuda a composição, estrutura, propriedades e transformações da matéria, investigando desde átomos e moléculas até materiais complexos e suas interações. Esta ciência central está presente em praticamente todos os aspectos do nosso cotidiano, desde os alimentos que consumimos até os medicamentos, combustíveis e materiais que utilizamos. Dividida em áreas como química orgânica, inorgânica, físico-química, analítica e bioquímica, esta disciplina nos permite compreender reações químicas, equilíbrios, ligações atômicas e processos industriais. O conhecimento químico é fundamental para o desenvolvimento de novos materiais, fármacos, combustíveis alternativos e processos industriais mais eficientes e menos poluentes, contribuindo para a solução de desafios como sustentabilidade ambiental, energia limpa e avanços na saúde.";
        
      case 'Biologia':
        return "A Biologia estuda os seres vivos em todos os seus aspectos, desde moléculas e células até ecossistemas inteiros, investigando a estrutura, função, evolução, distribuição e relações entre os organismos. Esta ciência abrangente nos permite compreender o funcionamento do corpo humano, a diversidade de espécies no planeta, os mecanismos da hereditariedade e os processos ecológicos que mantêm o equilíbrio ambiental. Dividida em áreas como citologia, genética, evolução, ecologia, botânica, zoologia e fisiologia, a Biologia fornece conhecimentos essenciais para avanços na medicina, conservação da biodiversidade, biotecnologia e produção de alimentos. O estudo biológico nos ajuda a entender nossa própria natureza como espécie, as relações entre os seres vivos e o ambiente, além de questões fundamentais como a origem da vida e os mecanismos de adaptação e evolução dos organismos ao longo do tempo.";
        
      case 'Literatura':
        return "A Literatura é a expressão artística por meio da palavra escrita, representando experiências humanas, reflexões sobre a existência e a sociedade através de diversas formas como poesia, prosa, teatro e ensaio. Esta manifestação cultural, que varia conforme épocas e civilizações, nos permite conhecer diferentes visões de mundo, valores e contextos históricos, ampliando nossa compreensão sobre a condição humana. O estudo literário envolve a análise de elementos como enredo, personagens, linguagem, estilo e influências históricas, desenvolvendo nossa capacidade de interpretação, sensibilidade estética e pensamento crítico. A Literatura vai além do entretenimento, funcionando como registro histórico, reflexo social e instrumento de transformação cultural, contribuindo para a formação de leitores críticos capazes de compreender a complexidade da experiência humana expressa através das palavras.";
        
      case 'Ensino Religioso':
        return "O Ensino Religioso, como área de conhecimento, estuda os fenômenos religiosos em sua diversidade cultural, analisando tradições espirituais, símbolos sagrados, textos fundadores e práticas rituais que expressam diferentes formas de compreender o transcendente. Esta disciplina, que adota uma abordagem não confessional e científica nas escolas públicas, promove o respeito à diversidade de crenças, o diálogo inter-religioso e a compreensão das religiões como fenômenos culturais e históricos. O estudo das tradições religiosas nos permite compreender melhor aspectos importantes da história, da filosofia, da arte e das estruturas sociais, já que as religiões influenciaram significativamente o desenvolvimento de civilizações em todo o mundo. Ao explorar questões existenciais, princípios éticos e manifestações culturais das diferentes religiões, esta área contribui para a formação integral do ser humano e para a construção de uma sociedade que valoriza o respeito mútuo e a diversidade.";
        
      case 'Astronomia':
        return "A Astronomia, uma das mais antigas ciências, investiga os corpos celestes, fenômenos cósmicos e a estrutura do universo, utilizando observações telescópicas e modelos matemáticos para compreender desde planetas próximos até galáxias distantes. Esta fascinante área do conhecimento nos permite estudar estrelas, planetas, cometas, buracos negros, galáxias e a própria origem e evolução do cosmo, combinando física, matemática, química e até biologia para explicar os fenômenos observados. O estudo astronômico abrange desde a mecânica celeste, que descreve os movimentos dos corpos no espaço, até a cosmologia, que investiga a origem, estrutura e destino do universo como um todo. O conhecimento astronômico, além de seu valor científico intrínseco, tem impulsionado avanços tecnológicos em áreas como navegação, telecomunicações e instrumentação, e nos ajuda a contextualizar nossa própria existência no vasto cosmos, respondendo a questões fundamentais sobre nossa origem cósmica e posição no universo.";
        
      case 'Artes':
        return "As Artes constituem formas de expressão estética e criativa através de linguagens como artes visuais, música, dança, teatro e cinema, manifestando sensibilidades, percepções e reflexões sobre a experiência humana. O estudo artístico engloba tanto a apreciação e análise de obras quanto o desenvolvimento de habilidades técnicas e expressivas, estimulando a criatividade, a sensibilidade estética e a capacidade de interpretação. Cada manifestação artística possui sua própria história, técnicas e elementos expressivos, como cores e formas nas artes visuais, sons e harmonias na música, movimentos na dança e interpretação no teatro. As Artes, além de seu valor estético, funcionam como reflexo e agente transformador da sociedade, registrando contextos históricos, questionando valores estabelecidos e promovendo diálogos interculturais. O conhecimento artístico é fundamental para a formação integral do ser humano, desenvolvendo aspectos emocionais, cognitivos e sociais através da experiência estética e da expressão criativa.";
        
      default:
        return "";
    }
  };
  
  // Função para obter uma conclusão específica baseada na matéria e tema (movida para dentro do componente)
  const getSpecificConclusion = () => {
    const temaLower = tema.toLowerCase();
    
    // Matemática
    if (materia === 'Matemática') {
      if (temaLower.includes('geometria')) {
        return "A Geometria é um dos pilares fundamentais da Matemática, conectando conceitos abstratos a formas do mundo real. Seu domínio é essencial para áreas como arquitetura, engenharia, design, física e até mesmo em algoritmos computacionais modernos. Os conceitos geométricos formam a base para compreender o espaço ao nosso redor e desenvolver soluções para problemas práticos e teóricos.";
      } else if (temaLower.includes('álgebra') || temaLower.includes('algebra')) {
        return "A Álgebra representa um avanço fundamental na Matemática, permitindo generalizar problemas através de equações e variáveis. Seu estudo desenvolve o raciocínio lógico, a capacidade de abstração e a resolução sistemática de problemas. É ferramenta essencial em campos como economia, computação, engenharia e ciências naturais, onde modelar relações entre grandezas é fundamental.";
      } else if (temaLower.includes('estatística') || temaLower.includes('estatistica')) {
        return "A Estatística é fundamental para interpretar dados em um mundo cada vez mais orientado por informações. Através dela, podemos extrair conclusões significativas de conjuntos complexos de dados, identificar padrões e fazer previsões. É indispensável para pesquisas científicas, análise de mercado, políticas públicas e tomada de decisões baseadas em evidências em praticamente todos os campos do conhecimento.";
      } else if (temaLower.includes('trigonometria')) {
        return "A Trigonometria, estudo das relações entre ângulos e lados de triângulos, transcende a geometria básica e se conecta com fenômenos cíclicos e ondulatórios. É essencial para navegação, astronomia, engenharia, física e processamento de sinais. As funções trigonométricas são ferramentas poderosas que modelam desde o movimento de pêndulos até ondas eletromagnéticas e acústicas.";
      } else if (temaLower.includes('cálculo') || temaLower.includes('calculo')) {
        return "O Cálculo representa uma das maiores conquistas do pensamento matemático, permitindo estudar movimento, mudança e acumulação através de limites, derivadas e integrais. É a linguagem matemática da física, engenharia, economia e ciências naturais, possibilitando modelar fenômenos dinâmicos do mundo real com precisão. Seu domínio abre portas para a compreensão profunda de sistemas complexos e processos de otimização.";
      } else if (temaLower.includes('probabilidade')) {
        return "A Probabilidade fornece ferramentas matemáticas para quantificar e trabalhar com a incerteza e aleatoriedade. Seu estudo é fundamental para compreender riscos, tomar decisões informadas e analisar fenômenos com componentes aleatórios. É base para estatística, teoria dos jogos, machine learning, criptografia e ciência de dados, sendo indispensável num mundo onde decisões baseadas em dados são cada vez mais valorizadas.";
      }
    } 
    // Português
    else if (materia === 'Português') {
      if (temaLower.includes('gramática') || temaLower.includes('gramatica')) {
        return "A Gramática é o conjunto de regras que estrutura e organiza o uso da língua, permitindo uma comunicação clara e eficaz. Seu estudo vai além da mera memorização de regras; envolve compreender como a língua funciona, evolui e se adapta a diferentes contextos. O domínio gramatical é essencial para a interpretação textual, produção escrita de qualidade e para o desenvolvimento do raciocínio lógico-linguístico.";
      } else if (temaLower.includes('literatura')) {
        return "A Literatura é mais que entretenimento; é uma forma de arte que registra e interpreta a experiência humana através das palavras. Por meio das obras literárias, temos acesso a diferentes visões de mundo, contextos históricos e dilemas humanos universais. O estudo literário desenvolve a capacidade crítica, a sensibilidade estética e amplia nosso repertório cultural, sendo fundamental para a formação de leitores autônomos e cidadãos críticos.";
      } else if (temaLower.includes('redação') || temaLower.includes('redacao')) {
        return "A Redação é uma habilidade fundamental que transcende o ambiente acadêmico, sendo essencial para a vida profissional e cidadã. Através da escrita organizada e coerente, aprendemos a articular pensamentos, defender ideias e persuadir leitores. O domínio das técnicas de redação permite expressar-se com clareza e adequação em diferentes contextos comunicativos, sendo determinante para o sucesso em processos seletivos e na comunicação profissional.";
      } else if (temaLower.includes('interpretação') || temaLower.includes('interpretacao')) {
        return "A Interpretação de Texto é uma competência essencial no mundo contemporâneo, repleto de informações que precisam ser analisadas criticamente. Vai além da simples decodificação; envolve compreender significados implícitos, intenções comunicativas e contextos de produção. Esta habilidade é fundamental para o pensamento crítico, para distinguir fatos de opiniões e para a participação consciente na sociedade da informação.";
      } else if (temaLower.includes('linguística') || temaLower.includes('linguistica')) {
        return "A Linguística é a ciência que estuda sistematicamente a linguagem humana em todos seus aspectos - sons, formação de palavras, estruturas sintáticas, significados e usos sociais. Seu conhecimento nos permite compreender como as línguas funcionam, variam e evoluem, sendo fundamental para áreas como tradução, ensino de idiomas, tecnologias de processamento de linguagem natural e compreensão da diversidade cultural expressa através das línguas.";
      }
    }
    // Física
    else if (materia === 'Física') {
      if (temaLower.includes('mecânica') || temaLower.includes('mecanica')) {
        return "A Mecânica representa os fundamentos da Física, estudando o movimento dos corpos e as forças que o determinam. Desde as leis de Newton até a mecânica quântica, estes conceitos explicam fenômenos do microcosmo atômico às galáxias. O domínio destes princípios é essencial para engenharia, tecnologia aeroespacial, robótica e mesmo para a compreensão de movimentos cotidianos, sendo a base para entender como o universo físico opera.";
      } else if (temaLower.includes('termodinâmica') || temaLower.includes('termodinamica')) {
        return "A Termodinâmica, estudo do calor e sua relação com trabalho e energia, é fundamental para compreender transformações energéticas em sistemas físicos. Suas leis governam desde motores a combustão até processos biológicos e fenômenos atmosféricos. O entendimento dos princípios termodinâmicos é crucial para o desenvolvimento de tecnologias energéticas sustentáveis e para a compreensão dos limites fundamentais de eficiência em processos naturais e tecnológicos.";
      } else if (temaLower.includes('eletromagnetismo')) {
        return "O Eletromagnetismo unifica os fenômenos elétricos e magnéticos, sendo responsável por praticamente toda tecnologia moderna. Das equações de Maxwell às ondas eletromagnéticas, estes conceitos permitiram o desenvolvimento de telecomunicações, computadores, motores elétricos e tecnologias médicas. Compreender o eletromagnetismo é essencial para entender como funcionam desde simples aparelhos domésticos até complexos sistemas de transmissão de energia e informação.";
      } else if (temaLower.includes('óptica') || temaLower.includes('optica')) {
        return "A Óptica, ramo da Física que estuda a luz e sua interação com a matéria, é fundamental para compreender desde o funcionamento da visão humana até as tecnologias de comunicação por fibra óptica. Os princípios ópticos estão presentes em câmeras fotográficas, microscópios, telescópios e lasers, sendo essenciais para avanços em medicina, astronomia e tecnologia da informação. O estudo da óptica conecta conceitos de ondas, partículas e eletromagnetismo.";
      } else if (temaLower.includes('relatividade')) {
        return "A Relatividade revolucionou nossa compreensão do espaço, tempo, energia e matéria, superando a física newtoniana em altas velocidades e campos gravitacionais intensos. Desenvolvida por Einstein, suas implicações vão de aplicações práticas como o GPS até questões fundamentais sobre a origem e estrutura do universo. A teoria da relatividade exemplifica como conceitos abstratos da física teórica podem transformar profundamente nossa visão de mundo e levar a avanços tecnológicos concretos.";
      } else if (temaLower.includes('quântica') || temaLower.includes('quantica')) {
        return "A Física Quântica representa uma revolução no entendimento da matéria e energia na escala atômica e subatômica, introduzindo conceitos contraintuitivos como dualidade onda-partícula e superposição de estados. Seus princípios fundamentam tecnologias como lasers, transistores, supercondutores e computação quântica. O estudo da mecânica quântica não apenas possibilita avanços tecnológicos revolucionários, mas também nos desafia a repensar conceitos fundamentais sobre a natureza da realidade física.";
      }
    }
    
    // Se não houver correspondência específica, retorna uma conclusão genérica
    return `${tema} é um tema essencial na disciplina de ${materia} que abrange desde conceitos básicos até aplicações avançadas. O domínio deste conteúdo não apenas contribui para o sucesso acadêmico imediato, mas também desenvolve habilidades analíticas e conhecimentos fundamentais que serão relevantes ao longo de toda sua formação educacional e trajetória profissional futura.`;
  };
  
  const contextoEspecifico = getContextoEspecifico();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-jumbo mb-4">{title}</h2>
      
      {/* Contexto específico da matéria */}
      {contextoEspecifico && (
        <div 
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#EFF6FF', // Azul claro
            border: '1px solid #BFDBFE',
            borderRadius: '0.5rem'
          }}
        >
          <h4 
            style={{
              color: '#1E40AF', // Azul escuro
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}
          >
            Contexto: {materia}
          </h4>
          <p style={{ color: '#1E3A8A' }}>{contextoEspecifico}</p>
        </div>
      )}
      
      {/* CONCLUSÃO SIMPLIFICADA - Movida para depois do contexto e antes do conteúdo principal */}
      <div 
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#F3E8FF',
          border: '1px solid #D8B4FE',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(124, 58, 237, 0.1)'
        }}
      >
        <h4 
          style={{
            color: '#7E22CE',
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.75rem'
          }}
        >
          Conclusão Simplificada
        </h4>
        <p 
          style={{
            color: '#581C87'
          }}
        >
          {getSpecificConclusion()}
        </p>
      </div>
      
      {/* Conteúdo do guia */}
      <div 
        className="prose prose-sm max-w-none study-guide-content" 
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanizingMessageId, setHumanizingMessageId] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar a abertura/fechamento do modal de créditos
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  
  // Estados para o modal de Matérias
  const [isAnoDiaglogOpen, setIsAnoDiaglogOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedAno, setSelectedAno] = useState('');
  const [learningTopic, setLearningTopic] = useState('');
  
  // Estados para o guia de estudos
  const [isCreatingStudyGuide, setIsCreatingStudyGuide] = useState(false);
  const [studyGuide, setStudyGuide] = useState<{ title: string, content: string } | null>(null);
  
  // Estado para notificações de compromissos
  const [calendarNotifications, setCalendarNotifications] = useState<string[]>([]);
  const [showCalendarNotification, setShowCalendarNotification] = useState(false);

  const navigate = useNavigate();

  // Verificar compromissos ao carregar o aplicativo
  useEffect(() => {
    if (!showSplash) {
      try {
        const savedCompromissos = localStorage.getItem('jumboIA_calendario_compromissos');
        if (savedCompromissos) {
          const compromissos = JSON.parse(savedCompromissos);
          
          // Verificar lembretes
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const notifications: string[] = [];
          
          compromissos.forEach((compromisso: any) => {
            const compromissoDate = new Date(compromisso.date);
            compromissoDate.setHours(0, 0, 0, 0);
            
            const timeDiff = compromissoDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysDiff === compromisso.reminderDays) {
              notifications.push(
                `Lembrete: "${compromisso.title}" está marcado para daqui a ${compromisso.reminderDays} dias!`
              );
            }
          });
          
          if (notifications.length > 0) {
            setCalendarNotifications(notifications);
            setShowCalendarNotification(true);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar compromissos:', error);
      }
    }
  }, [showSplash]);

  // Redirecionar para a página inicial ao carregar
  useEffect(() => {
    // Só redireciona para a página inicial quando a splash screen termina
    // e apenas se a URL estiver vazia ou for a raiz do aplicativo
    if (!showSplash && location.pathname === '/') {
      // Não precisa fazer nada, já está na página inicial
    } else if (!showSplash && location.pathname !== '/' && 
              !location.pathname.includes('/quizzes') && 
              !location.pathname.includes('/materias') &&
              !location.pathname.includes('/calendario') &&
              !location.pathname.includes('/live')) {
      // Usar navegação do React Router em vez de window.location para evitar recarregamento
      navigate('/');
    }
  }, [showSplash, location.pathname]);

  // Função para rolar para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rola para baixo quando novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Adicionar ouvinte para evento de navegação para quizzes
  useEffect(() => {
    const handleNavigateToQuizzes = () => {
      navigate('/quizzes');
    };
    
    window.addEventListener('navigateToQuizzes', handleNavigateToQuizzes);
    
    return () => {
      window.removeEventListener('navigateToQuizzes', handleNavigateToQuizzes);
    };
  }, [navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Verifica o limite antes de atualizar o estado
    if (event.target.value.length <= MAX_INPUT_LENGTH) {
      setInput(event.target.value);
    }
  };

  const sendMessage = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    
    // Verifica o limite e se está vazio/loading
    if (!input.trim() || isLoading || input.length > MAX_INPUT_LENGTH) return; 

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar sua mensagem');
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor');
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleHumanize = async (messageId: string, textToHumanize: string) => {
    if (humanizingMessageId) return;

    setHumanizingMessageId(messageId);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/humanize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToHumanize }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao humanizar o texto.');
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, content: data.humanizedText } : msg
        )
      );

    } catch (err: any) {
      console.error('Erro ao humanizar:', err);
      setError(err.message || 'Erro desconhecido ao humanizar.');
    } finally {
      setHumanizingMessageId(null);
    }
  };

  const generateImage = async () => {
    if (!input.trim() || isGeneratingImage) return;
    setIsGeneratingImage(true);
    setError(null);
    const prompt = input.trim();
    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    try {
      const response = await fetch(`${API_URL}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar imagem');
      }
      const data = await response.json();
      const imageUrl = data.url;
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `![Imagem gerada](${imageUrl})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Erro na geração de imagem:', err);
      setError(err.message || 'Erro ao gerar imagem');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const createSchedule = async () => {
    if (!input.trim() || isCreatingSchedule) return;
    
    setIsCreatingSchedule(true);
    setError(null);
    
    const prompt = `Por favor, crie um cronograma baseado em: ${input.trim()}`;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    try {
      // Simular uma chamada de API para criação de cronograma
      setTimeout(() => {
        const scheduleTemplate = `
## Cronograma: ${input.trim()}

| Data | Atividade | Status |
|------|-----------|--------|
| ${formatDate(1)} | Iniciar planejamento | Pendente |
| ${formatDate(3)} | Revisar recursos disponíveis | Pendente |
| ${formatDate(7)} | Implementação inicial | Pendente |
| ${formatDate(14)} | Testes e validação | Pendente |
| ${formatDate(21)} | Finalização e entrega | Pendente |

*Cronograma gerado automaticamente pela IA*
`;
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: scheduleTemplate,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsCreatingSchedule(false);
      }, 2500); // Simulando um delay de 2.5 segundos
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar cronograma');
      console.error('Erro na criação de cronograma:', err);
      setIsCreatingSchedule(false);
    }
  };
  
  // Função auxiliar para formatar datas futuras
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para abrir o modal de créditos
  const openCreditsModal = () => {
    setIsCreditsModalOpen(true);
  };
  
  // Função para fechar o modal de créditos
  const closeCreditsModal = () => {
    setIsCreditsModalOpen(false);
  };

  // Função para abrir o diálogo de seleção de ano e conteúdo
  const openAnoDialog = (materia: string) => {
    setSelectedMateria(materia);
    setIsAnoDiaglogOpen(true);
  };

  // Função para fechar o diálogo
  const closeAnoDialog = () => {
    setIsAnoDiaglogOpen(false);
    setSelectedAno('');
    setLearningTopic('');
  };

  // Função para processar o formulário de ano e conteúdo
  const handleAnoFormSubmit = (action: 'chat' | 'guide') => {
    if (!selectedAno || !learningTopic.trim()) return;

    if (action === 'chat') {
      // Criar a mensagem para enviar ao chat
      const tema = `${selectedMateria} - ${selectedAno}: ${learningTopic}`;
      setInput(`Preciso de ajuda com ${tema}`);

      // Fechar o diálogo
      closeAnoDialog();

      // Navegar para a página de chat
      navigate('/');
    } else if (action === 'guide') {
      // Gerar guia de estudos
      generateStudyGuide();
    }
  };
  
  // Função para gerar o guia de estudos
  const generateStudyGuide = async () => {
    if (!selectedMateria || !learningTopic.trim()) return;
    
    setIsCreatingStudyGuide(true);
    closeAnoDialog();
    
    try {
      setTimeout(() => {
        const guideTitle = `Guia de Estudos: ${selectedMateria} - ${learningTopic}`;
        
        // Obter conteúdo histórico ou específico do tema, se disponível
        const thematicContent = getThematicContent(selectedMateria, learningTopic);
        
        // Obter imagem temática, se disponível
        const thematicImage = getThematicImage(selectedMateria, learningTopic);
        
        // Texto específico por matéria para conclusão
        const materiaSpecificText = selectedMateria === 'História' 
          ? 'o desenvolvimento das sociedades humanas e suas transformações ao longo do tempo' 
          : selectedMateria === 'Geografia' 
            ? 'as relações entre espaço, natureza e sociedade no mundo contemporâneo'
            : selectedMateria === 'Matemática' 
              ? 'o raciocínio lógico e a resolução de problemas práticos e teóricos'
              : selectedMateria === 'Português' 
                ? 'a estrutura da língua e suas aplicações na comunicação e expressão'
                : selectedMateria === 'Ciências' 
                  ? 'os fenômenos naturais e suas interações com o mundo que nos cerca'
                  : selectedMateria === 'Física' 
                    ? 'as leis fundamentais que governam o universo e suas aplicações práticas'
                    : selectedMateria === 'Química' 
                      ? 'a composição, estrutura e transformações da matéria'
                      : selectedMateria === 'Biologia' 
                        ? 'a estrutura, função e desenvolvimento dos organismos vivos'
                        : selectedMateria === 'Literatura' 
                          ? 'as manifestações artísticas do texto escrito e seus contextos'
                          : selectedMateria === 'Ensino Religioso' 
                            ? 'as diversas tradições espirituais e suas práticas culturais'
                            : selectedMateria === 'Astronomia' 
                              ? 'os corpos celestes e fenômenos que ocorrem além da atmosfera terrestre'
                              : selectedMateria === 'Artes' 
                                ? 'as formas de expressão estética e cultural da humanidade'
                                : 'os principais conceitos e aplicações desta área de conhecimento';
        
        const guideContent = `
          ${thematicImage ? `
          <div class="mb-6 text-center">
            <img src="${thematicImage}" alt="Imagem temática de ${learningTopic}" class="rounded-lg shadow-md w-full h-auto max-w-full mx-auto" style="max-height: 400px; object-fit: cover;" />
            <p class="text-sm text-gray-500 mt-2">Imagem ilustrativa: ${learningTopic}</p>
          </div>
          ` : ''}
          
          ${thematicContent ? `
          <div class="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">Contexto Histórico: ${learningTopic}</h3>
            <div class="prose prose-sm max-w-none text-blue-900">
              ${thematicContent}
            </div>
          </div>
          ` : ''}
          
          <h3>Nível Básico</h3>
          <ul>
            <li><strong>Conceitos Fundamentais:</strong> ${getBasicConcepts(selectedMateria, learningTopic)}</li>
            <li><strong>Terminologia Essencial:</strong> ${getEssentialTerminology(selectedMateria, learningTopic)}</li>
            <li><strong>Exercícios Introdutórios:</strong> Resolução de problemas básicos envolvendo ${learningTopic.toLowerCase()}, com foco na compreensão dos princípios fundamentais.</li>
          </ul>
          
          <h3>Nível Intermediário</h3>
          <ul>
            <li><strong>Aprofundamento Teórico:</strong> ${getIntermediateConcepts(selectedMateria, learningTopic)}</li>
            <li><strong>Aplicações Práticas:</strong> ${getPracticalApplications(selectedMateria, learningTopic)}</li>
            <li><strong>Conexões com Outros Temas:</strong> ${getConnections(selectedMateria, learningTopic)}</li>
          </ul>
          
          <h3>Nível Avançado</h3>
          <ul>
            <li><strong>Análise Crítica:</strong> ${getCriticalAnalysis(selectedMateria, learningTopic)}</li>
            <li><strong>Resolução de Problemas Complexos:</strong> Abordar desafios que requerem a integração de múltiplos conceitos e perspectivas dentro do tema ${learningTopic.toLowerCase()}.</li>
            <li><strong>Pesquisa e Aprofundamento:</strong> Investigação aprofundada das principais teorias e debates acadêmicos relacionados a ${learningTopic.toLowerCase()}, incluindo artigos científicos e obras de referência.</li>
          </ul>
          
          <h3>Nível Profissional</h3>
          <ul>
            <li><strong>Especialização:</strong> ${getSpecialization(selectedMateria, learningTopic)}</li>
            <li><strong>Aplicações no Mundo Real:</strong> ${getRealWorldApplications(selectedMateria, learningTopic)}</li>
            <li><strong>Contribuições para o Campo:</strong> Estudo das fronteiras do conhecimento em ${learningTopic.toLowerCase()}, identificando lacunas teóricas e possibilidades de contribuições originais.</li>
          </ul>
          
          <h3>Recursos Recomendados</h3>
          <ul>
            <li><strong>Livros:</strong> ${getRecommendedBooks(selectedMateria, learningTopic)}</li>
            <li><strong>Cursos Online:</strong> Plataformas como Coursera, Khan Academy e edX oferecem cursos específicos sobre ${learningTopic.toLowerCase()} com diferentes níveis de profundidade.</li>
            <li><strong>Exercícios Práticos:</strong> Resolução sistemática de problemas em livros didáticos, simulados e bancos de questões, aumentando gradualmente o nível de dificuldade.</li>
          </ul>
          
          <p>Este guia foi criado especialmente para estudantes do ${selectedAno}. Adapte o ritmo de estudos conforme sua familiaridade com o tema.</p>
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 class="text-lg font-semibold text-yellow-700 mb-2">Teste seus conhecimentos:</h4>
            <p class="text-yellow-800 mb-3">Faça um quiz sobre ${learningTopic} para verificar seu nível de compreensão e identificar áreas que precisam de mais estudo.</p>
            <button class="px-4 py-2 bg-jumbo text-white rounded-md hover:bg-jumbo/90 transition-colors" onclick="(function(e) { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigateToQuizzes')); })()">
              Iniciar Quiz
            </button>
          </div>
          
          <!-- Removida a seção de conclusão pois agora é adicionada diretamente no componente StudyGuideDisplay -->
        </div>
      `;
        
        setStudyGuide({ title: guideTitle, content: guideContent });
        setIsCreatingStudyGuide(false);
      }, 500);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar guia de estudos');
      console.error('Erro na criação do guia:', err);
      setIsCreatingStudyGuide(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm py-3 px-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex space-x-6 items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <JumboLogo />
                </Link>
                <nav className="hidden md:flex space-x-4">
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/' 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Chat IA
                  </Link>
                  <Link
                    to="/quizzes"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.includes('/quizzes') 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Quizzes
                  </Link>
                  <Link
                    to="/materias"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.includes('/materias') 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Matérias
                  </Link>
                  <Link
                    to="/calendario"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.includes('/calendario') 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Calendário
                  </Link>
                </nav>
              </div>
              <div>
                {/* Botão de créditos */}
                <button
                  onClick={openCreditsModal}
                  className="p-2 rounded-full text-jumbo hover:bg-jumbo/10 transition-colors"
                  title="Créditos"
                >
                  <FiInfo className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Modal de créditos */}
          <CreditsModal isOpen={isCreditsModalOpen} closeModal={closeCreditsModal} />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={
                <div className="flex-1 overflow-hidden flex flex-col h-full">
                  {/* Chat container */}
                  <div className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                      {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                          <div className="mb-4">
                            <LuBrain className="w-16 h-16 text-jumbo mx-auto" />
                          </div>
                          <h1 className="text-2xl font-semibold text-gray-700 mb-3">Bem-vindo ao JumboIA</h1>
                          <p className="text-gray-500 max-w-md mb-8">
                            Pergunte a JumboIA qualquer dúvida sobre suas matérias escolares e obtenha respostas detalhadas e precisas.
                          </p>
                          <div className="space-y-4 w-full max-w-md">
                            <button 
                              onClick={() => setInput("Explique o ciclo da água de forma simples")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Explique o ciclo da água de forma simples
                            </button>
                            <button 
                              onClick={() => setInput("Como resolver equações de segundo grau?")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Como resolver equações de segundo grau?
                            </button>
                            <button 
                              onClick={() => setInput("Quais são os principais eventos da Segunda Guerra Mundial?")}
                              className="w-full p-3 border border-jumbo/30 rounded-lg text-left text-gray-700 hover:bg-jumbo/5 transition"
                            >
                              Quais são os principais eventos da Segunda Guerra Mundial?
                            </button>
                          </div>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`
                                max-w-[90%] md:max-w-2xl rounded-xl p-4
                                ${
                                  message.role === 'user'
                                    ? 'bg-jumbo text-white ml-4'
                                    : 'bg-white border border-gray-200 mr-4 shadow-sm'
                                }
                                relative
                              `}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div 
                                  className={`text-sm font-semibold ${
                                    message.role === 'user' ? 'text-blue-50' : 'text-jumbo'
                                  }`}
                                >
                                  {message.role === 'user' ? 'Você' : 'JumboIA'}
                                </div>
                                <div 
                                  className={`text-xs ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                                  } ml-2`}
                                >
                                  {message.timestamp}
                                </div>
                              </div>
                              {/* Renderizar conteúdo normal ou componente de pesquisa baseado no conteúdo */}
                              {message.role === 'assistant' && isPesquisaContent(message.content) ? (
                                <ResearchDisplay 
                                  content={message.content} 
                                  title="Resultado da Pesquisa" 
                                />
                              ) : (
                                <div 
                                  className={`prose prose-sm max-w-none ${
                                    message.role === 'user' ? 'prose-invert' : ''
                                  }`}
                                  dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                                />
                              )}
                              {message.role === 'assistant' && message.content.length > 200 && !isPesquisaContent(message.content) && (
                      <button
                                  onClick={() => handleHumanize(message.id, message.content)}
                                  disabled={humanizingMessageId === message.id}
                                  className={`
                                    mt-2 text-xs px-2 py-1 rounded 
                                    ${
                                      humanizingMessageId === message.id
                                        ? 'bg-gray-100 text-gray-400'
                                        : 'bg-blue-50 text-jumbo hover:bg-blue-100'
                                    }
                                    transition-colors
                                  `}
                                >
                                  {humanizingMessageId === message.id ? (
                                    <span className="flex items-center">
                                      <FiLoader className="animate-spin mr-1" />
                                      Humanizando...
                                    </span>
                                  ) : (
                                    'Humanizar texto'
                                  )}
                      </button>
                    )}
                  </div>
                </div>
                        ))
                      )}
            {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[90%] md:max-w-2xl rounded-xl p-4 bg-white border border-gray-200 mr-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-sm font-semibold text-jumbo">JumboIA</div>
                              <div className="text-xs text-gray-400 ml-2">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                  </div>
                  <TypingIndicator />
                </div>
              </div>
            )}
            {error && (
                        <div className="flex justify-center">
                          <div className="max-w-md rounded-xl p-4 bg-red-50 border border-red-200 text-red-600">
                            <p className="text-sm">{error}</p>
                          </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
                  </div>

                  {/* Input area */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <div className="max-w-4xl mx-auto relative">
                      <form onSubmit={sendMessage} className="flex flex-col gap-2 mb-8">
                        <div className="relative w-full">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                            placeholder="Digite sua pergunta aqui..."
                            className="w-full p-3 pl-3 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumbo focus:border-transparent"
                            disabled={isLoading}
                          />
                          <div className="text-xs text-gray-400 absolute bottom-[-20px] right-0">
                  {input.length}/{MAX_INPUT_LENGTH}
                </div>
              </div>
                        <div className="flex gap-2 mt-3 items-center justify-between">
                <button
                            type="button"
                            className="h-12 px-4 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-300 border border-gray-200 flex items-center justify-center"
                          >
                            <span 
                              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600" 
                              style={{ 
                                letterSpacing: '0.5px',
                                fontSize: '1.1rem'
                              }}
                            >
                              JumboIA
                            </span>
                </button>
                
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={clearChat}
                              className="p-3 bg-jumbo text-white rounded-lg hover:bg-jumbo/90 transition-colors w-10 h-10 flex items-center justify-center"
                              title="Limpar conversa"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                <CrystalBallButton 
                  onClick={generateImage} 
                              disabled={isLoading || isGeneratingImage || !input.trim()}
                />
                <CalendarButton 
                  onClick={createSchedule} 
                              disabled={isLoading || isCreatingSchedule || !input.trim()}
                            />
                            <LiveButton />
                            <button
                              type="submit"
                              disabled={isLoading || !input.trim()}
                              className="bg-jumbo text-white p-3 rounded-lg hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 flex items-center justify-center"
                            >
                              <FiSend className="w-5 h-5" />
                            </button>
              </div>
            </div>
          </form>
                      {error && (
                        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                          <p>{error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              } />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quizzes/:quizId" element={<QuizPage />} />
              <Route path="/calendario" element={<CalendarPage />} />
              <Route path="/live" element={<LiveDataPage />} />
              <Route path="/materias" element={
                <div className="p-6 max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Matérias Disponíveis</h1>
                  
                  {isCreatingStudyGuide ? (
                    <div className="flex flex-col items-center justify-center p-12">
                      <div className="text-center">
                        <FiLoader className="w-12 h-12 animate-spin text-jumbo mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Gerando guia de estudos...</p>
                        <p className="text-gray-500 text-sm">Isso levará apenas alguns instantes</p>
                      </div>
                    </div>
                  ) : studyGuide ? (
                    <>
                      <button 
                        onClick={() => setStudyGuide(null)} 
                        className="mb-4 px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        Voltar para matérias
                      </button>
                      <StudyGuideDisplay title={studyGuide.title} content={studyGuide.content} />
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          nome: 'Matemática',
                          descricao: 'Estudo dos números, quantidades, formas, espaço e mudanças. Desenvolve o raciocínio lógico e habilidades para resolver problemas do cotidiano à engenharia.',
                          topicos: 'Álgebra, Geometria, Trigonometria, Estatística, Cálculo, Matemática Financeira, Lógica Matemática',
                          icone: '➗'
                        },
                        {
                          nome: 'Português',
                          descricao: 'Estudo da língua portuguesa, gramática, literatura e produção textual. Fundamental para comunicação eficaz, interpretação de textos e expressão escrita.',
                          topicos: 'Gramática, Interpretação Textual, Redação, Gêneros Textuais, Linguística, Semântica, Fonologia',
                          icone: '📝'
                        },
                        {
                          nome: 'História',
                          descricao: 'Estudo do passado humano, civilizações e acontecimentos importantes. Analisa processos históricos que moldaram sociedades e ajuda a compreender o presente.',
                          topicos: 'História do Brasil, História Geral, Pré-História, Idade Antiga/Média/Moderna/Contemporânea, História da América, História Cultural',
                          icone: '🏛️'
                        },
                        {
                          nome: 'Geografia',
                          descricao: 'Estudo dos lugares, territórios, paisagens e fenômenos terrestres. Investiga relações entre sociedade e natureza, questões ambientais e geopolíticas.',
                          topicos: 'Geografia Física, Geografia Humana, Geopolítica, Cartografia, Meio Ambiente, Globalização, Geografia Urbana, Climatologia',
                          icone: '🌎'
                        },
                        {
                          nome: 'Ciências',
                          descricao: 'Estudo dos fenômenos naturais, seres vivos e matéria. Introduz conceitos básicos de física, química e biologia, incentivando o pensamento científico desde cedo.',
                          topicos: 'Biologia Básica, Física Básica, Química Básica, Ecologia, Corpo Humano, Astronomia Básica, Meio Ambiente, Saúde',
                          icone: '🔬'
                        },
                        {
                          nome: 'Física',
                          descricao: 'Estudo das leis fundamentais do universo, matéria e energia. Investiga desde partículas subatômicas até o cosmos, explicando fenômenos através de modelos matemáticos.',
                          topicos: 'Mecânica, Termodinâmica, Eletromagnetismo, Ondulatória, Física Moderna, Relatividade, Física Quântica, Cosmologia',
                          icone: '⚛️'
                        },
                        {
                          nome: 'Química',
                          descricao: 'Estudo da composição, estrutura e transformações da matéria. Fundamental para compreender substâncias, reações e desenvolver novos materiais e medicamentos.',
                          topicos: 'Química Orgânica, Química Inorgânica, Físico-Química, Tabela Periódica, Estequiometria, Química Analítica, Bioquímica',
                          icone: '🧪'
                        },
                        {
                          nome: 'Biologia',
                          descricao: 'Estudo dos seres vivos, sua estrutura, função e interações. Explora desde moléculas e células até ecossistemas complexos e a evolução da vida na Terra.',
                          topicos: 'Citologia, Genética, Ecologia, Evolução, Fisiologia, Botânica, Zoologia, Microbiologia, Biotecnologia',
                          icone: '🧬'
                        },
                        {
                          nome: 'Literatura',
                          descricao: 'Estudo das obras literárias, movimentos e autores importantes. Analisa expressões artísticas em texto, contextos históricos e o impacto cultural das produções literárias.',
                          topicos: 'Literatura Brasileira, Literatura Portuguesa, Escolas Literárias, Análise Textual, Teoria Literária, Literatura Contemporânea',
                          icone: '📚'
                        },
                        {
                          nome: 'Ensino Religioso',
                          descricao: 'Estudo das tradições religiosas, valores éticos e fenômenos sagrados. Explora as diversas crenças, rituais e visões de mundo, promovendo o diálogo inter-religioso e o respeito à diversidade.',
                          topicos: 'Religiões do Mundo, Tradições Espirituais, Ética e Valores, Filosofia das Religiões, Fenomenologia Religiosa, Textos Sagrados',
                          icone: '🕊️'
                        },
                        {
                          nome: 'Astronomia',
                          descricao: 'Estudo dos corpos celestes, fenômenos cósmicos e o universo. Investiga planetas, estrelas, galáxias e a origem e evolução do cosmo, combinando física, matemática, química e até biologia para explicar os fenômenos observados. O estudo astronômico abrange desde a mecânica celeste, que descreve os movimentos dos corpos no espaço, até a cosmologia, que investiga a origem, estrutura e destino do universo como um todo. O conhecimento astronômico, além de seu valor científico intrínseco, tem impulsionado avanços tecnológicos em áreas como navegação, telecomunicações e instrumentação, e nos ajuda a contextualizar nossa própria existência no vasto cosmos, respondendo a questões fundamentais sobre nossa origem cósmica e posição no universo.',
                          topicos: 'Sistema Solar, Estrelas e Galáxias, Cosmologia, Exploração Espacial, Astrofísica, Astrobiologia, Instrumentos Astronômicos',
                          icone: '🔭'
                        },
                        {
                          nome: 'Artes',
                          descricao: 'Estudo das manifestações artísticas, técnicas de expressão e história da arte. Abrange múltiplas formas de expressão criativa, desde pintura e escultura até música, dança e novas mídias.',
                          topicos: 'Artes Visuais, Música, Teatro, Dança, História da Arte, Movimentos Artísticos, Arte Digital, Fotografia',
                          icone: '🎨'
                        }
                      ].map((materia) => (
                        <div key={materia.nome} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <h2 className="text-xl font-semibold text-jumbo">{materia.nome}</h2>
                              <span className="text-2xl" role="img" aria-label={materia.nome}>{materia.icone}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{materia.descricao}</p>
                            <div className="bg-jumbo/10 p-3 rounded-md mb-4">
                              <p className="text-sm text-gray-800"><strong>Principais tópicos:</strong> {materia.topicos}</p>
                            </div>
                            <button 
                              className="w-full bg-jumbo text-white px-4 py-2 rounded-md text-sm hover:bg-jumbo/90 transition-colors"
                              onClick={() => openAnoDialog(materia.nome)}
                            >
                              Explorar {materia.nome}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Modal de seleção de ano escolar */}
                  {isAnoDiaglogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-bold text-gray-800">Explorar {selectedMateria}</h2>
                          <span className="text-2xl">
                            {selectedMateria === 'Matemática' ? '➗' : 
                             selectedMateria === 'Português' ? '📝' : 
                             selectedMateria === 'História' ? '🏛️' : 
                             selectedMateria === 'Geografia' ? '🌎' : 
                             selectedMateria === 'Ciências' ? '🔬' : 
                             selectedMateria === 'Física' ? '⚛️' : 
                             selectedMateria === 'Química' ? '🧪' : 
                             selectedMateria === 'Biologia' ? '🧬' : 
                             selectedMateria === 'Literatura' ? '📚' : 
                             selectedMateria === 'Ensino Religioso' ? '🕊️' : 
                             selectedMateria === 'Astronomia' ? '🔭' : 
                             selectedMateria === 'Artes' ? '🎨' : '📘'}
                          </span>
                        </div>
                        
                        <div className="mb-4 bg-jumbo/5 p-3 rounded">
                          <p className="text-sm text-gray-700">
                            {selectedMateria === 'Matemática' ? 'Desenvolva habilidades lógicas e resolva problemas com números, formas e equações. A matemática é essencial em todas as ciências e tecnologias modernas, além de ser fundamental para o desenvolvimento do pensamento crítico e da capacidade de analisar padrões e estruturas.' : 
                             selectedMateria === 'Português' ? 'Aprimore sua comunicação escrita e oral, além de analisar textos e compreender a estrutura da língua. O domínio da língua portuguesa abre portas para a expressão de ideias complexas, compreensão de textos em diferentes contextos e desenvolvimento da capacidade argumentativa.' : 
                             selectedMateria === 'História' ? 'Compreenda como eventos passados moldaram nosso mundo atual e as lições que podemos aprender com eles. A história nos permite analisar criticamente o presente, reconhecer padrões sociais e políticos, e entender as raízes culturais de diferentes povos e nações.' : 
                             selectedMateria === 'Geografia' ? 'Entenda as relações entre pessoas, lugares e ambientes, desde sua cidade até o mundo inteiro. A geografia integra conhecimentos físicos e humanos para explicar fenômenos como mudanças climáticas, migrações, urbanização e conflitos territoriais.' : 
                             selectedMateria === 'Ciências' ? 'Descubra os fundamentos do mundo natural através de observação, experimentação e análise. As ciências naturais estimulam a curiosidade e o pensamento científico, bases para compreender desde fenômenos cotidianos até os grandes desafios ambientais e tecnológicos.' : 
                             selectedMateria === 'Física' ? 'Explore as leis fundamentais que governam o universo, desde partículas subatômicas até galáxias. A física desenvolve modelos matemáticos que explicam e preveem fenômenos naturais, sendo a base para tecnologias como eletrônicos, telecomunicações e energia renovável.' : 
                             selectedMateria === 'Química' ? 'Investigue a composição da matéria e como diferentes substâncias interagem entre si. A química está presente em tudo ao nosso redor, dos medicamentos aos materiais, dos alimentos aos combustíveis, transformando elementos e moléculas para criar novos compostos.' : 
                             selectedMateria === 'Biologia' ? 'Estude a vida em todas suas formas, desde células microscópicas até ecossistemas complexos. A biologia nos ajuda a compreender processos vitais, doenças, biodiversidade e nossa própria natureza humana, sendo fundamental para avanços médicos e conservação ambiental.' : 
                             selectedMateria === 'Literatura' ? 'Mergulhe nas grandes obras literárias e entenda os contextos culturais e históricos que as influenciaram. A literatura permite explorar experiências humanas através das palavras, desenvolvendo empatia, senso crítico e apreciação estética pelo poder expressivo da linguagem.' : 
                             selectedMateria === 'Ensino Religioso' ? 'Explore as tradições religiosas, valores éticos e fenômenos sagrados para compreender diferentes visões de mundo. O estudo das religiões promove o respeito à diversidade de crenças, valores e práticas culturais, analisando como diferentes sociedades buscam respostas para questões existenciais.' : 
                             selectedMateria === 'Astronomia' ? 'Descubra os corpos celestes, fenômenos cósmicos e o universo em toda sua grandeza e mistério. A astronomia nos conecta com questões fundamentais sobre nossa origem cósmica, usando tanto observações telescópicas quanto modelos matemáticos para explorar desde exoplanetas até buracos negros.' : 
                             selectedMateria === 'Artes' ? 'Mergulhe nas manifestações artísticas, técnicas de expressão e história da arte em suas múltiplas formas. As artes cultivam a sensibilidade estética, a criatividade e o pensamento simbólico, oferecendo diferentes linguagens para expressar emoções e ideias através de cores, sons, movimentos e formas.' : 
                             'Explore este conteúdo com nossa ajuda personalizada, desenvolvendo habilidades e conhecimentos específicos para sua área de interesse.'}
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="anoEscolar" className="block text-sm font-medium text-gray-700 mb-1">
                            Qual o seu ano escolar?
                          </label>
                          <select
                            id="anoEscolar"
                            value={selectedAno}
                            onChange={(e) => setSelectedAno(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-jumbo"
                          >
                            <option value="">Selecione seu ano</option>
                            <optgroup label="Ensino Fundamental">
                              {Array.from({ length: 9 }, (_, i) => (
                                <option key={`fundamental-${i+1}`} value={`${i+1}º ano do Fundamental`}>
                                  {i+1}º ano do Fundamental
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Ensino Médio">
                              {Array.from({ length: 3 }, (_, i) => (
                                <option key={`medio-${i+1}`} value={`${i+1}º ano do Ensino Médio`}>
                                  {i+1}º ano do Ensino Médio
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="conteudoAprendendo" className="block text-sm font-medium text-gray-700 mb-1">
                            O que você está aprendendo?
                          </label>
                          <textarea
                            id="conteudoAprendendo"
                            value={learningTopic}
                            onChange={(e) => setLearningTopic(e.target.value)}
                            placeholder={
                              selectedMateria === 'Matemática' ? 'Ex: Equações de segundo grau, Teorema de Pitágoras, Frações...' : 
                              selectedMateria === 'Português' ? 'Ex: Análise sintática, Concordância verbal, Figuras de linguagem...' : 
                              selectedMateria === 'História' ? 'Ex: Segunda Guerra Mundial, Revolução Industrial, Brasil Colônia...' : 
                              selectedMateria === 'Geografia' ? 'Ex: Globalização, Clima e vegetação, Geopolítica...' : 
                              selectedMateria === 'Ciências' ? 'Ex: Sistema solar, Corpo humano, Cadeia alimentar...' : 
                              selectedMateria === 'Física' ? 'Ex: Leis de Newton, Termodinâmica, Eletromagnetismo...' : 
                              selectedMateria === 'Química' ? 'Ex: Tabela periódica, Reações químicas, Estequiometria...' : 
                              selectedMateria === 'Biologia' ? 'Ex: Genética, Evolução, Sistema digestório...' : 
                              selectedMateria === 'Literatura' ? 'Ex: Modernismo, Romantismo, José de Alencar...' : 
                              selectedMateria === 'Ensino Religioso' ? 'Ex: Religiões do Mundo, Tradições Espirituais...' : 
                              selectedMateria === 'Astronomia' ? 'Ex: Sistema Solar, Estrelas e Galáxias...' : 
                              selectedMateria === 'Artes' ? 'Ex: Artes Visuais, Música, Teatro, Dança...' : 
                              'Ex: O tema específico que você está estudando...'
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-jumbo"
                          ></textarea>
                        </div>
                        
                        <div className="flex flex-col space-y-3">
                          <button
                            onClick={() => handleAnoFormSubmit('guide')}
                            disabled={!selectedAno || !learningTopic.trim()}
                            className="w-full px-4 py-2 bg-jumbo text-white rounded-md hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <span className="mr-2">Criar guia de estudos</span> <LuBrain className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleAnoFormSubmit('chat')}
                            disabled={!selectedAno || !learningTopic.trim()}
                            className="w-full px-4 py-2 bg-jumbo/80 text-white rounded-md hover:bg-jumbo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Obter ajuda no chat
                          </button>
                          
                          <button
                            onClick={closeAnoDialog}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
      </div>
              } />
            </Routes>
          </main>

          {/* Notificações de compromissos */}
          {showCalendarNotification && calendarNotifications.length > 0 && (
            <div className="fixed bottom-4 right-4 max-w-sm z-50">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-jumbo">
                <div className="bg-jumbo text-white px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    <h3 className="font-medium">Lembretes de Agenda</h3>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCalendarNotification(false);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="p-4">
                  {calendarNotifications.map((notification, index) => (
                    <div key={index} className="mb-2 last:mb-0 text-sm">
                      {notification}
                    </div>
                  ))}
                  <div className="mt-3 flex justify-between">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/calendario');
                        setShowCalendarNotification(false);
                      }}
                      className="text-sm text-jumbo hover:underline"
                    >
                      Ver calendário
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCalendarNotification(false);
                      }}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App; 