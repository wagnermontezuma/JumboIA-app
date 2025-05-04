// Função para obter conteúdo específico para temas históricos ou outros temas relevantes
export const getThematicContent = (materia: string, tema: string): string | null => {
  const temaLowerCase = tema.toLowerCase();
  
  // Temas de História
  if (materia === 'História') {
    if (temaLowerCase.includes('revolução francesa')) {
      return `
        <p>A <strong>Revolução Francesa</strong> (1789-1799) foi um dos eventos mais importantes da história moderna que transformou não apenas a França, mas influenciou profundamente o pensamento político em todo o mundo. Começou com uma crise econômica e fiscal, tensões sociais entre a aristocracia e a crescente burguesia, e ideais iluministas de liberdade, igualdade e fraternidade.</p>
        
        <p><strong>Causas principais:</strong></p>
        <ul>
          <li><strong>Crise econômica:</strong> Más colheitas, aumento do preço do pão e alta inflação</li>
          <li><strong>Divisão social injusta:</strong> Sistema de três estados (clero, nobreza e terceiro estado)</li>
          <li><strong>Endividamento do Estado:</strong> Custos da participação francesa na Guerra da Independência Americana</li>
          <li><strong>Ideais iluministas:</strong> Influência de pensadores como Rousseau, Voltaire e Montesquieu</li>
        </ul>
        
        <p><strong>Fases principais:</strong></p>
        <ol>
          <li><strong>Estados Gerais e Assembleia Nacional (1789):</strong> Juramento do Jogo da Péla e tomada da Bastilha</li>
          <li><strong>Assembleia Constituinte (1789-1791):</strong> Criação da Declaração dos Direitos do Homem e do Cidadão</li>
          <li><strong>Assembleia Legislativa (1791-1792):</strong> Início das guerras revolucionárias</li>
          <li><strong>Convenção Nacional (1792-1795):</strong> Proclamação da República, execução de Luís XVI e o Terror de Robespierre</li>
          <li><strong>Diretório (1795-1799):</strong> Governo burguês até o golpe de estado de Napoleão Bonaparte</li>
        </ol>
        
        <p><strong>Legado:</strong> A revolução aboliu o antigo regime feudal, estabeleceu os princípios de cidadania e direitos civis, promoveu a separação entre Igreja e Estado, e difundiu ideais republicanos e democráticos pelo mundo. Influenciou movimentos revolucionários na América Latina e estabeleceu bases para o nacionalismo moderno e conceitos de soberania popular.</p>
      `;
    } else if (temaLowerCase.includes('independência do brasil')) {
      return `
        <p>A <strong>Independência do Brasil</strong> (1822) foi o processo histórico que separou o Brasil de Portugal, transformando a antiga colônia em um império independente. Diferentemente de outras independências na América Latina, ocorreu com relativamente pouco derramamento de sangue e manteve a monarquia como forma de governo.</p>
        
        <p><strong>Antecedentes principais:</strong></p>
        <ul>
          <li><strong>Transferência da corte portuguesa (1808):</strong> A família real portuguesa fugiu das tropas napoleônicas e estabeleceu-se no Rio de Janeiro</li>
          <li><strong>Elevação a Reino Unido (1815):</strong> Brasil deixou de ser colônia e tornou-se parte do Reino Unido de Portugal, Brasil e Algarves</li>
          <li><strong>Revolução do Porto (1820):</strong> Movimento liberal em Portugal que exigia o retorno do rei D. João VI e a recolonização do Brasil</li>
          <li><strong>Pressões econômicas:</strong> Elite brasileira resistente a perder os benefícios conquistados desde 1808</li>
        </ul>
        
        <p><strong>Processo de independência:</strong></p>
        <ol>
          <li><strong>Dia do Fico (9 de janeiro de 1822):</strong> D. Pedro decide permanecer no Brasil, contrariando ordens de Portugal</li>
          <li><strong>Convocação da Assembleia Constituinte (junho de 1822):</strong> Primeiro passo para criar instituições brasileiras autônomas</li>
          <li><strong>Grito do Ipiranga (7 de setembro de 1822):</strong> D. Pedro proclama a independência às margens do riacho Ipiranga</li>
          <li><strong>Coroação (1 de dezembro de 1822):</strong> D. Pedro torna-se imperador como D. Pedro I</li>
          <li><strong>Reconhecimento internacional (1825):</strong> Portugal reconhece a independência mediante pagamento de indenização</li>
        </ol>
        
        <p><strong>Características peculiares:</strong> A independência brasileira manteve a unidade territorial, adotou a monarquia como sistema de governo, preservou a escravidão, e foi liderada por um membro da família real portuguesa, criando uma experiência única na América Latina.</p>
      `;
    } else if (temaLowerCase.includes('guerra mundial') || temaLowerCase.includes('segunda guerra')) {
      return `
        <p>A <strong>Segunda Guerra Mundial</strong> (1939-1945) foi o conflito militar mais devastador da história, envolvendo mais de 30 países e resultando em 70-85 milhões de mortes. Começou com a invasão da Polônia pela Alemanha nazista e terminou com a rendição do Japão após os bombardeios atômicos.</p>
        
        <p><strong>Causas principais:</strong></p>
        <ul>
          <li><strong>Consequências do Tratado de Versalhes:</strong> Humilhação e penalidades severas impostas à Alemanha após a Primeira Guerra Mundial</li>
          <li><strong>Ascensão de regimes totalitários:</strong> Nazismo na Alemanha, Fascismo na Itália e militarismo no Japão</li>
          <li><strong>Grande Depressão:</strong> Crise econômica global que intensificou o nacionalismo e tensões internacionais</li>
          <li><strong>Falha da Liga das Nações:</strong> Incapacidade de evitar agressões e manter a paz</li>
          <li><strong>Política de apaziguamento:</strong> Potências democráticas permitiram anexações alemãs para evitar guerra</li>
        </ul>
        
        <p><strong>Principais acontecimentos:</strong></p>
        <ol>
          <li><strong>Invasão da Polônia (setembro 1939):</strong> Início oficial da guerra na Europa</li>
          <li><strong>Blitzkrieg (1939-1940):</strong> Conquista rápida da Europa Ocidental pela Alemanha</li>
          <li><strong>Batalha da Grã-Bretanha (1940):</strong> Resistência britânica contra bombardeios aéreos alemães</li>
          <li><strong>Operação Barbarossa (1941):</strong> Invasão alemã da União Soviética</li>
          <li><strong>Ataque a Pearl Harbor (dezembro 1941):</strong> Entrada dos EUA na guerra</li>
          <li><strong>Batalha de Stalingrado (1942-1943):</strong> Ponto de virada no front oriental</li>
          <li><strong>Desembarque na Normandia (junho 1944):</strong> Invasão aliada da Europa Ocidental</li>
          <li><strong>Rendição da Alemanha (maio 1945):</strong> Fim da guerra na Europa</li>
          <li><strong>Bombas atômicas em Hiroshima e Nagasaki (agosto 1945):</strong> Rendição do Japão e fim da guerra</li>
        </ol>
        
        <p><strong>Consequências:</strong> A guerra resultou na criação da ONU, início da Guerra Fria, descolonização da Ásia e África, ascensão dos EUA e URSS como superpotências, e estabelecimento de instituições internacionais para evitar futuros conflitos globais. O Holocausto levou ao reconhecimento do conceito de crimes contra a humanidade e ao estabelecimento do Estado de Israel.</p>
      `;
    }
  }
  
  // Temas de Geografia
  else if (materia === 'Geografia') {
    if (temaLowerCase.includes('globalização')) {
      return `
        <p>A <strong>Globalização</strong> é um processo de integração econômica, social, cultural e política em escala mundial que se intensificou nas últimas décadas do século XX. Caracteriza-se pela expansão do comércio internacional, fluxos de capital, migração, difusão cultural e avanços tecnológicos que aproximam pessoas e lugares.</p>
        
        <p><strong>Causas e fatores impulsionadores:</strong></p>
        <ul>
          <li><strong>Avanços tecnológicos:</strong> Revolução nas telecomunicações, internet e transportes</li>
          <li><strong>Liberalização econômica:</strong> Redução de barreiras comerciais e desregulamentação financeira</li>
          <li><strong>Fim da Guerra Fria:</strong> Expansão do capitalismo após o colapso do bloco soviético</li>
          <li><strong>Empresas multinacionais:</strong> Fragmentação da produção em cadeias globais de valor</li>
          <li><strong>Acordos internacionais:</strong> OMC, blocos econômicos regionais e tratados de livre comércio</li>
        </ul>
        
        <p><strong>Dimensões da globalização:</strong></p>
        <ul>
          <li><strong>Econômica:</strong> Comércio internacional, investimentos estrangeiros, sistemas financeiros integrados</li>
          <li><strong>Cultural:</strong> Difusão de ideias, valores, produtos culturais e estilos de vida</li>
          <li><strong>Política:</strong> Organizações internacionais, governança global e interdependência entre países</li>
          <li><strong>Social:</strong> Migrações internacionais, turismo global, redes sociais transnacionais</li>
          <li><strong>Ambiental:</strong> Problemas ecológicos transfronteiriços e acordos ambientais mundiais</li>
        </ul>
        
        <p><strong>Debates e controvérsias:</strong> A globalização gera intensos debates sobre seus impactos desiguais, com críticas relacionadas ao aumento da desigualdade, precarização do trabalho, homogeneização cultural, perda de soberania nacional e problemas ambientais. Por outro lado, defensores apontam para redução da pobreza global, difusão de conhecimento, inovação tecnológica e interdependência que dificulta conflitos.</p>
      `;
    }
  }
  
  // Temas de Matemática
  else if (materia === 'Matemática') {
    if (temaLowerCase.includes('teorema de pitágoras')) {
      return `
        <p>O <strong>Teorema de Pitágoras</strong> é um dos princípios mais fundamentais e antigos da geometria euclidiana. Estabelece que, em qualquer triângulo retângulo, o quadrado da hipotenusa (o lado oposto ao ângulo reto) é igual à soma dos quadrados dos outros dois lados (catetos).</p>
        
        <p><strong>Fórmula matemática:</strong> Em um triângulo retângulo com hipotenusa de comprimento <em>c</em> e catetos de comprimentos <em>a</em> e <em>b</em>:</p>
        <p style="text-align: center; font-size: 1.2em; font-weight: bold;">a² + b² = c²</p>
        
        <p><strong>Origens históricas:</strong> Embora atribuído a Pitágoras (século VI a.C.), evidências sugerem que civilizações anteriores, como babilônios, egípcios e chineses, já conheciam aplicações práticas do teorema. Pitágoras e sua escola foram provavelmente responsáveis pela primeira demonstração matemática formal.</p>
        
        <p><strong>Aplicações práticas:</strong></p>
        <ul>
          <li><strong>Construção civil:</strong> Verificação de ângulos retos em edificações</li>
          <li><strong>Navegação:</strong> Cálculo de distâncias e rotas</li>
          <li><strong>Agrimensura:</strong> Medição e demarcação de terrenos</li>
          <li><strong>Astronomia:</strong> Cálculo de distâncias entre corpos celestes</li>
          <li><strong>Tecnologia:</strong> Base para cálculos em GPS, processamento de imagens e compressão de dados</li>
        </ul>
        
        <p><strong>Demonstrações:</strong> Existem mais de 400 demonstrações diferentes do Teorema de Pitágoras, desde provas geométricas baseadas em áreas até demonstrações algébricas e trigonométricas, demonstrando sua centralidade na matemática.</p>
      `;
    }
  }
  
  // Se não houver conteúdo específico para o tema, retorna null
  return null;
};

// Funções para detalhar cada seção do guia de estudos
export const getBasicConcepts = (materia: string, tema: string): string => {
  return `Compreensão abrangente dos princípios básicos de ${tema.toLowerCase()}, incluindo definições fundamentais, contexto histórico inicial e estruturas conceituais que servem como fundamento para todo o estudo posterior.`;
};

export const getEssentialTerminology = (materia: string, tema: string): string => {
  return `Domínio do vocabulário técnico e específico relacionado a ${tema.toLowerCase()}, incluindo etimologia dos termos, variações contextuais e evolução histórica da terminologia na área.`;
};

export const getIntermediateConcepts = (materia: string, tema: string): string => {
  return `Estudo detalhado de conceitos mais complexos relacionados a ${tema.toLowerCase()}, incluindo teorias secundárias, debates contemporâneos e nuances que expandem a compreensão básica para níveis mais sofisticados.`;
};

export const getPracticalApplications = (materia: string, tema: string): string => {
  return `Implementação prática dos conhecimentos teóricos em contextos reais, resolvendo problemas de complexidade média relacionados a ${tema.toLowerCase()} e desenvolvendo habilidades aplicadas.`;
};

export const getConnections = (materia: string, tema: string): string => {
  return `Análise das interconexões entre ${tema.toLowerCase()} e outros tópicos relevantes da ${materia.toLowerCase()}, estabelecendo um mapa conceitual integrado que permite uma visão holística da disciplina.`;
};

export const getCriticalAnalysis = (materia: string, tema: string): string => {
  return `Desenvolvimento da capacidade de avaliar criticamente teorias, evidências e argumentos relacionados a ${tema.toLowerCase()}, identificando premissas, questionando metodologias e formulando contra-argumentos fundamentados.`;
};

export const getSpecialization = (materia: string, tema: string): string => {
  return `Foco em subcampos específicos de ${tema.toLowerCase()}, explorando áreas de nicho que representam as fronteiras do conhecimento atual e exigem especialização avançada.`;
};

export const getRealWorldApplications = (materia: string, tema: string): string => {
  return `Análise de como ${tema.toLowerCase()} é aplicado em contextos profissionais e acadêmicos avançados, incluindo estudos de caso reais, implementações industriais e aplicações multidisciplinares.`;
};

export const getRecommendedBooks = (materia: string, tema: string): string => {
  // Recomendações de livros por matéria
  switch (materia) {
    case 'História':
      return `"História Concisa de ${tema}" de autores especializados, "A Era das Revoluções" de Eric Hobsbawm, e obras específicas sobre ${tema.toLowerCase()} de historiadores renomados como Marc Bloch e Fernand Braudel.`;
    
    case 'Geografia':
      return `"Geografia Humana e Econômica" de Milton Santos, "Compreendendo ${tema}" de David Harvey, e "Atlas de ${tema.toLowerCase()}" com cartografia e análises detalhadas.`;
    
    case 'Matemática':
      return `"Fundamentos de ${tema}" de Ian Stewart, "A Matemática do Ensino Médio" (coleção do IMPA), e livros-problema com exercícios graduados em dificuldade para prática extensiva.`;
    
    case 'Português':
      return `"Nova Gramática do Português Contemporâneo" de Celso Cunha e Lindley Cintra, "Texto e Interação" de William Cereja, e manuais específicos sobre ${tema.toLowerCase()} para aprofundamento.`;
    
    default:
      return `Obras fundamentais de referência sobre ${tema.toLowerCase()}, manuais técnicos atualizados e compêndios acadêmicos que abordam desde os fundamentos até aplicações avançadas do tema.`;
  }
};
