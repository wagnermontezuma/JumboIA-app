// Função para obter conteúdo específico para temas históricos ou outros temas relevantes
export const getThematicContent = (materia: string, tema: string): string | null => {
  const temaLowerCase = tema.toLowerCase();
  
  // Temas de História
  if (materia === 'História') {
    if (temaLowerCase.includes('revolução francesa')) {
      return `
        <p>Revolução Francesa foi o ciclo revolucionário que aconteceu na França entre 1789 e 1799 e que marcou o fim do absolutismo nesse país. Essa revolução, além de seu caráter burguês, teve uma grande participação popular e atingiu um alto grau de radicalismo, uma vez que a situação do povo francês era precária em virtude da crise que o país enfrentava.</p>
        
        <p>Essa revolução foi um marco na história da humanidade, porque inaugurou um processo que levou à universalização dos direitos sociais e das liberdades individuais a partir da Declaração dos Direitos do Homem e do Cidadão. Também abriu caminho para a consolidação de um sistema republicano pautado pela representatividade popular, hoje chamado de democracia representativa. A Revolução Francesa só foi possível graças à popularização dos ideais do Iluminismo.</p>
        
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
      `;
    } else if (temaLowerCase.includes('independência do brasil')) {
      return `
        <p>A independência do Brasil foi o processo histórico de separação entre o Brasil e Portugal ocorrido entre 1821 e 1825, que transformou a América Portuguesa em um país independente. O processo teve início com a Revolução do Porto em 1820 e culminou com o reconhecimento da independência em 1825.</p>
        
        <p>A transferência da corte portuguesa para o Brasil em 1808 alterou profundamente a condição da colônia, que foi elevada à categoria de Reino Unido a Portugal e Algarves em 1815. Entretanto, com a Revolução do Porto em 1820, Portugal exigia o retorno do rei D. João VI e a recolonização do Brasil, o que gerou resistência da elite local e do príncipe regente D. Pedro.</p>
        
        <p><strong>Processo de independência:</strong></p>
        <ol>
          <li><strong>Dia do Fico (9 de janeiro de 1822):</strong> D. Pedro decide permanecer no Brasil, contrariando ordens de Portugal</li>
          <li><strong>Convocação da Assembleia Constituinte (junho de 1822):</strong> Primeiro passo para criar instituições brasileiras autônomas</li>
          <li><strong>Grito do Ipiranga (7 de setembro de 1822):</strong> D. Pedro proclama a independência às margens do riacho Ipiranga</li>
          <li><strong>Coroação (1 de dezembro de 1822):</strong> D. Pedro torna-se imperador como D. Pedro I</li>
          <li><strong>Reconhecimento internacional (1825):</strong> Portugal reconhece a independência mediante pagamento de indenização</li>
        </ol>
        
        <p>A independência brasileira teve características peculiares no contexto latino-americano: manteve a unidade territorial, adotou a monarquia como sistema de governo, preservou a escravidão, e foi liderada por um membro da família real portuguesa.</p>
      `;
    } else if (temaLowerCase.includes('guerra mundial') || temaLowerCase.includes('segunda guerra')) {
      return `
        <p>A Segunda Guerra Mundial foi um conflito militar global que durou de 1939 a 1945, envolvendo a maioria das nações do mundo, incluindo todas as grandes potências, organizadas em duas alianças militares opostas: os Aliados (liderados por Reino Unido, Estados Unidos e União Soviética) e o Eixo (liderado por Alemanha, Itália e Japão).</p>
        
        <p>Foi o conflito mais mortal da história da humanidade, resultando na morte de 70 a 85 milhões de pessoas. Começou com a invasão da Polônia pela Alemanha nazista e terminou com as rendições do Eixo após os bombardeios atômicos de Hiroshima e Nagasaki. A guerra redefiniu as fronteiras políticas e a influência social no mundo.</p>
        
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
          <li><strong>Holocausto (1941-1945):</strong> Genocídio sistemático de mais de seis milhões de judeus e outros grupos</li>
          <li><strong>Batalha de Stalingrado (1942-1943):</strong> Ponto de virada no front oriental</li>
          <li><strong>Desembarque na Normandia (junho 1944):</strong> Invasão aliada da Europa Ocidental</li>
          <li><strong>Bombas atômicas (agosto 1945):</strong> Ataques a Hiroshima e Nagasaki e rendição do Japão</li>
        </ol>
      `;
    } else if (temaLowerCase.includes('inconfidência mineira')) {
      return `
        <p>A Inconfidência Mineira foi uma conspiração de natureza separatista que ocorreu na então capitania de Minas Gerais, em 1789, no Brasil colonial. Inspirado nos ideais iluministas e na independência dos Estados Unidos, o movimento foi uma reação à opressão política e econômica da Coroa Portuguesa, especialmente à derrama, cobrança forçada de impostos atrasados.</p>
        
        <p>Liderado por figuras como Tiradentes, Cláudio Manuel da Costa, Tomás Antônio Gonzaga e outros intelectuais, militares e proprietários de terra, o movimento foi denunciado antes de se concretizar. Após julgamento, Tiradentes foi o único condenado à morte, enforcado e esquartejado em 21 de abril de 1792, tornando-se posteriormente um símbolo nacional de luta pela liberdade.</p>
        
        <p><strong>Causas principais:</strong></p>
        <ul>
          <li><strong>Excessiva tributação:</strong> Principalmente o quinto do ouro e a iminente derrama</li>
          <li><strong>Influência iluminista:</strong> Ideais de liberdade, igualdade e fraternidade</li>
          <li><strong>Independência dos EUA:</strong> Inspiração e modelo de colônia que se libertou</li>
          <li><strong>Restrições comerciais:</strong> Monopólio português sobre o comércio colonial</li>
        </ul>
        
        <p><strong>Características e legado:</strong></p>
        <ul>
          <li>Movimento elitista, com pouca participação popular</li>
          <li>Propunha a criação de uma república independente</li>
          <li>Projetava o desenvolvimento manufatureiro e universitário para Minas Gerais</li>
          <li>Pretendiam adotar uma bandeira com a inscrição "Libertas Quae Sera Tamen" (Liberdade Ainda Que Tardia)</li>
          <li>Tornou-se símbolo do nacionalismo brasileiro e da luta contra a opressão colonial</li>
        </ul>
      `;
    }
  }
  
  // Temas de Geografia
  else if (materia === 'Geografia') {
    if (temaLowerCase.includes('globalização')) {
      return `
        <p>A globalização é o processo de aproximação entre as diversas sociedades e nações existentes por todo o mundo, seja no âmbito econômico, social, cultural ou político. Trata-se de um fenômeno que transformou profundamente a organização socioespacial e as relações internacionais a partir da segunda metade do século XX.</p>
        
        <p>As distâncias foram drasticamente reduzidas graças aos avanços tecnológicos nos meios de comunicação e transporte, permitindo maior fluxo de pessoas, mercadorias, capital e informações. A interdependência entre economias nacionais aumentou significativamente, com empresas transnacionais operando em escalas cada vez mais amplas.</p>
        
        <p><strong>Dimensões da globalização:</strong></p>
        <ul>
          <li><strong>Econômica:</strong> Comércio internacional, investimentos estrangeiros, sistemas financeiros integrados</li>
          <li><strong>Cultural:</strong> Difusão de ideias, valores, produtos culturais e estilos de vida</li>
          <li><strong>Política:</strong> Organizações internacionais, governança global e interdependência entre países</li>
          <li><strong>Social:</strong> Migrações internacionais, turismo global, redes sociais transnacionais</li>
          <li><strong>Ambiental:</strong> Problemas ecológicos transfronteiriços e acordos ambientais mundiais</li>
        </ul>
        
        <p><strong>Características principais:</strong></p>
        <ul>
          <li>Expansão dos mercados financeiros e sistemas bancários internacionais</li>
          <li>Formação de blocos econômicos regionais (União Europeia, Mercosul, NAFTA)</li>
          <li>Crescimento das empresas multinacionais e transnacionais</li>
          <li>Revolução tecnológica na informática e telecomunicações</li>
          <li>Aumento das desigualdades entre países desenvolvidos e em desenvolvimento</li>
          <li>Intensificação dos problemas ambientais em escala global</li>
        </ul>
      `;
    } else if (temaLowerCase.includes('aquecimento global')) {
      return `
        <p>O aquecimento global é o aumento da temperatura média da superfície terrestre observado nas últimas décadas, principalmente devido às emissões de gases de efeito estufa (GEE) produzidas por atividades humanas. Este fenômeno está causando mudanças significativas nos padrões climáticos e representa uma das maiores ameaças ambientais da atualidade.</p>
        
        <p>Segundo o Painel Intergovernamental sobre Mudanças Climáticas (IPCC), a temperatura média global aumentou aproximadamente 1,1°C acima dos níveis pré-industriais. Sem ações concretas para reduzir drasticamente as emissões, esse aumento pode chegar a 1,5°C entre 2030 e 2052, com consequências potencialmente catastróficas.</p>
        
        <p><strong>Causas principais:</strong></p>
        <ul>
          <li><strong>Emissão de gases de efeito estufa:</strong> CO2, metano, óxido nitroso, entre outros</li>
          <li><strong>Queima de combustíveis fósseis:</strong> Petróleo, carvão e gás natural para geração de energia</li>
          <li><strong>Desmatamento:</strong> Redução de florestas que capturam CO2 da atmosfera</li>
          <li><strong>Agropecuária:</strong> Especialmente a criação de gado, que emite grandes quantidades de metano</li>
          <li><strong>Processos industriais:</strong> Produção de cimento, aço e outros produtos intensivos em energia</li>
        </ul>
        
        <p><strong>Consequências:</strong></p>
        <ul>
          <li>Aumento do nível dos oceanos e inundação de áreas costeiras</li>
          <li>Intensificação de eventos climáticos extremos (furacões, secas, inundações)</li>
          <li>Alteração nos regimes de chuvas e nas estações do ano</li>
          <li>Perda de biodiversidade e extinção de espécies</li>
          <li>Impactos na produção de alimentos e segurança alimentar</li>
          <li>Propagação de doenças tropicais para novas regiões</li>
        </ul>
      `;
    }
  }
  
  // Temas de Matemática
  else if (materia === 'Matemática') {
    if (temaLowerCase.includes('teorema de pitágoras')) {
      return `
        <p>O Teorema de Pitágoras é um princípio fundamental da geometria euclidiana que estabelece a relação entre os lados de um triângulo retângulo. Segundo este teorema, em qualquer triângulo retângulo, o quadrado da hipotenusa (o lado oposto ao ângulo reto) é igual à soma dos quadrados dos outros dois lados (catetos).</p>
        
        <p>A fórmula matemática que expressa o Teorema de Pitágoras é a² + b² = c², onde a e b são os comprimentos dos catetos e c é o comprimento da hipotenusa. Esta relação é uma das mais conhecidas e aplicadas em matemática, física e engenharia.</p>
        
        <p>Embora o teorema leve o nome de Pitágoras, matemático grego que viveu no século VI a.C., evidências históricas sugerem que civilizações anteriores, como os babilônios e egípcios, já conheciam esta relação. A contribuição de Pitágoras foi possivelmente a primeira demonstração formal do teorema.</p>
        
        <p><strong>Aplicações práticas:</strong></p>
        <ul>
          <li><strong>Construção civil:</strong> Para garantir ângulos retos em edificações</li>
          <li><strong>Navegação:</strong> Cálculo de distâncias em rotas marítimas e aéreas</li>
          <li><strong>Agrimensura:</strong> Medição e demarcação de terrenos</li>
          <li><strong>Astronomia:</strong> Cálculo de distâncias entre corpos celestes</li>
          <li><strong>Tecnologia:</strong> GPS, cartografia, processamento de imagens</li>
        </ul>
        
        <p>O teorema também possui diversas demonstrações diferentes (mais de 400 documentadas), desde métodos geométricos baseados em áreas até abordagens algébricas e trigonométricas, o que demonstra sua centralidade na matemática.</p>
      `;
    } else if (temaLowerCase.includes('equações de segundo grau')) {
      return `
        <p>As equações de segundo grau, também chamadas de equações quadráticas, são expressões algébricas que podem ser escritas na forma ax² + bx + c = 0, onde a, b e c são números reais e a ≠ 0. Estas equações são caracterizadas pela presença da variável x elevada ao quadrado como termo de maior grau.</p>
        
        <p>A resolução de equações de segundo grau é um dos tópicos fundamentais da álgebra. O método mais conhecido para encontrar suas raízes (soluções) é a fórmula de Bhaskara, que determina os valores de x que satisfazem a equação:</p>
        
        <p style="text-align: center; font-size: 1.2em;">x = (-b ± √(b² - 4ac)) / 2a</p>
        
        <p>O termo b² - 4ac é chamado de discriminante (Δ) e determina a quantidade e natureza das raízes:</p>
        <ul>
          <li>Se Δ > 0: a equação possui duas raízes reais e distintas</li>
          <li>Se Δ = 0: a equação possui uma raiz real (raiz dupla)</li>
          <li>Se Δ < 0: a equação não possui raízes reais (as raízes são números complexos)</li>
        </ul>
        
        <p><strong>Métodos de resolução:</strong></p>
        <ul>
          <li><strong>Fórmula de Bhaskara:</strong> Método geral aplicável a qualquer equação de segundo grau</li>
          <li><strong>Fatoração:</strong> Decomposição em fatores do primeiro grau quando possível</li>
          <li><strong>Completamento de quadrados:</strong> Transformação da equação para a forma (x + p)² = q</li>
          <li><strong>Soma e produto das raízes:</strong> Se x₁ e x₂ são as raízes, então x₁ + x₂ = -b/a e x₁ × x₂ = c/a</li>
        </ul>
        
        <p><strong>Aplicações:</strong> As equações quadráticas são amplamente utilizadas para modelar fenômenos físicos como movimento de projéteis, otimização de áreas, análise de lucros e custos, entre muitas outras aplicações práticas.</p>
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
