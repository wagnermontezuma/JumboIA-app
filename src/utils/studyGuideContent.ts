// Função para obter conteúdo específico para temas históricos ou outros temas relevantes
export const getThematicContent = (materia: string, tema: string): string | null => {
  const temaLowerCase = tema.toLowerCase();
  
  // Temas de História
  if (materia === 'História') {
    if (temaLowerCase.includes('pré-história') || temaLowerCase.includes('pre historia') || temaLowerCase.includes('pre-historia')) {
      return `
        <p>A Pré-história é o período da história humana que antecede a invenção da escrita, abrangendo desde o surgimento dos primeiros hominídeos até aproximadamente 4.000 a.C. (com variações regionais). Este longo período é tradicionalmente dividido em três grandes eras: Paleolítico (Idade da Pedra Lascada), Neolítico (Idade da Pedra Polida) e Idade dos Metais.</p>
        
        <p>Durante este extenso período, os seres humanos desenvolveram ferramentas cada vez mais sofisticadas, domesticaram plantas e animais, formaram os primeiros assentamentos permanentes e iniciaram as primeiras manifestações artísticas e religiosas conhecidas.</p>
        
        <p><strong>Principais períodos:</strong></p>
        <ul>
          <li><strong>Paleolítico (2,5 milhões a 10.000 a.C.):</strong> Caracterizado pelo nomadismo, caça e coleta, primeiras ferramentas de pedra lascada e domínio do fogo</li>
          <li><strong>Neolítico (10.000 a 4.000 a.C.):</strong> Revolução agrícola, sedentarização, primeiros povoados, cerâmica e pedra polida</li>
          <li><strong>Idade dos Metais (5.000 a 1.000 a.C.):</strong> Metalurgia do cobre, bronze e ferro, desenvolvimento de cidades e complexificação social</li>
        </ul>
        
        <p><strong>Descobertas e desenvolvimentos:</strong></p>
        <ul>
          <li>Domínio do fogo (aproximadamente 500.000 anos atrás)</li>
          <li>Arte rupestre, como as pinturas de Lascaux e Altamira</li>
          <li>Surgimento da agricultura e da domesticação animal (Revolução Neolítica)</li>
          <li>Primeiras construções megalíticas, como Stonehenge e Göbekli Tepe</li>
          <li>Desenvolvimento da metalurgia, começando com o cobre e evoluindo para o bronze e o ferro</li>
        </ul>
      `;
    } else if (temaLowerCase.includes('revolução francesa')) {
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
    } else if (temaLowerCase.includes('idade média')) {
      return `
        <p>A Idade Média foi um período da história europeia que se estendeu aproximadamente do século V ao XV, situado entre a queda do Império Romano do Ocidente (476 d.C.) e o início do Renascimento. Frequentemente dividida em Alta Idade Média (séculos V-X) e Baixa Idade Média (séculos XI-XV), este período foi marcado por profundas transformações políticas, sociais e culturais.</p>
        
        <p>Durante a Idade Média, ocorreu a formação do feudalismo como sistema socioeconômico predominante na Europa, baseado nas relações de suserania e vassalagem. A Igreja Católica tornou-se a instituição mais poderosa, influenciando a política, a cultura e o cotidiano das pessoas. As Cruzadas, o surgimento das universidades e o desenvolvimento do comércio foram fenômenos decisivos deste período.</p>
        
        <p><strong>Principais características:</strong></p>
        <ul>
          <li><strong>Feudalismo:</strong> Sistema socioeconômico baseado na posse da terra e relações de suserania e vassalagem</li>
          <li><strong>Teocentrismo:</strong> Visão de mundo centrada em Deus, com forte influência da Igreja em todos os aspectos da vida</li>
          <li><strong>Sociedade estamental:</strong> Divisão rígida entre clero, nobreza e servos/camponeses</li>
          <li><strong>Economia agrária:</strong> Produção baseada principalmente na agricultura de subsistência em feudos</li>
          <li><strong>Descentralização política:</strong> Fragmentação do poder em múltiplos feudos e reinos</li>
        </ul>
        
        <p><strong>Acontecimentos importantes:</strong></p>
        <ul>
          <li>Invasões bárbaras e queda do Império Romano do Ocidente (século V)</li>
          <li>Império Carolíngio de Carlos Magno (séculos VIII-IX)</li>
          <li>Cruzadas (1096-1291) para reconquista da Terra Santa</li>
          <li>Surgimento das primeiras universidades (séculos XII-XIII)</li>
          <li>Peste Negra (1347-1351), dizimando cerca de um terço da população europeia</li>
          <li>Guerra dos Cem Anos (1337-1453) entre Inglaterra e França</li>
        </ul>
      `;
    } else if (temaLowerCase.includes('revolução industrial')) {
      return `
        <p>A Revolução Industrial foi um processo de transformação econômica, social e tecnológica iniciado na Inglaterra em meados do século XVIII e posteriormente espalhado pelo mundo. Marcou a transição dos métodos de produção artesanais para a fabricação por máquinas, a criação de fábricas e o desenvolvimento de novos sistemas de transporte e comunicação.</p>
        
        <p>Este período transformou radicalmente as relações de trabalho, os modos de vida e a organização das cidades. A produção em massa reduziu os custos e aumentou a disponibilidade de produtos, mas também trouxe consequências como as péssimas condições de trabalho, a exploração infantil e a poluição ambiental nas primeiras fases da industrialização.</p>
        
        <p><strong>Fases principais:</strong></p>
        <ul>
          <li><strong>Primeira Revolução Industrial (1760-1840):</strong> Mecanização têxtil, máquina a vapor, metalurgia do ferro</li>
          <li><strong>Segunda Revolução Industrial (1850-1945):</strong> Eletricidade, petróleo, aço, linha de montagem, produção em massa</li>
          <li><strong>Terceira Revolução Industrial (1950-2000):</strong> Eletrônica, computadores, telecomunicações, automação</li>
          <li><strong>Quarta Revolução Industrial (atual):</strong> Internet das coisas, inteligência artificial, robótica avançada</li>
        </ul>
        
        <p><strong>Principais inovações iniciais:</strong></p>
        <ul>
          <li>Máquina a vapor de James Watt (1769)</li>
          <li>Tear mecânico de Edmund Cartwright (1785)</li>
          <li>Locomotiva a vapor de George Stephenson (1814)</li>
          <li>Barco a vapor de Robert Fulton (1807)</li>
          <li>Telégrafo elétrico de Samuel Morse (1837)</li>
        </ul>
        
        <p><strong>Consequências sociais:</strong> Urbanização acelerada, surgimento do proletariado urbano, movimentos trabalhistas, crescimento populacional e novas classes sociais. A industrialização mudou fundamentalmente a relação da humanidade com o tempo, o trabalho e os recursos naturais.</p>
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
    } else if (temaLowerCase.includes('placas tectônicas') || temaLowerCase.includes('placas tectonicas')) {
      return `
        <p>As placas tectônicas são enormes segmentos da litosfera terrestre (camada sólida mais externa da Terra) que flutuam sobre o manto semilíquido. A teoria das placas tectônicas, consolidada na década de 1960, revolucionou nossa compreensão sobre a dinâmica do planeta, explicando fenômenos como terremotos, vulcões e a formação de montanhas.</p>
        
        <p>Atualmente, a crosta terrestre é dividida em sete grandes placas (Pacífica, Norte-Americana, Sul-Americana, Africana, Euroasiática, Indo-Australiana e Antártica) e várias placas menores. Estas placas se movimentam lentamente, a uma velocidade média de 2 a 10 centímetros por ano, impulsionadas pelas correntes de convecção do manto.</p>
        
        <p><strong>Tipos de limites entre placas:</strong></p>
        <ul>
          <li><strong>Limites convergentes:</strong> Placas colidem, formando cadeias montanhosas ou zonas de subducção</li>
          <li><strong>Limites divergentes:</strong> Placas se afastam, criando dorsais oceânicas e novos assoalhos oceânicos</li>
          <li><strong>Limites transformantes:</strong> Placas deslizam lateralmente uma em relação à outra</li>
        </ul>
        
        <p><strong>Consequências dos movimentos:</strong></p>
        <ul>
          <li>Terremotos, causados pelo acúmulo e liberação súbita de energia nas zonas de contato</li>
          <li>Atividade vulcânica, especialmente em zonas de subducção (Cinturão de Fogo do Pacífico)</li>
          <li>Formação de cadeias montanhosas (orogênese), como os Himalaias e os Andes</li>
          <li>Criação e fechamento de oceanos ao longo do tempo geológico</li>
          <li>Deriva continental, alterando a posição dos continentes ao longo de milhões de anos</li>
        </ul>
      `;
    } else if (temaLowerCase.includes('urbanização')) {
      return `
        <p>A urbanização é o processo de transformação de áreas rurais em urbanas e o consequente crescimento das cidades, tanto em tamanho quanto em população. Este fenômeno, intensificado desde a Revolução Industrial, representa uma das mudanças mais significativas na organização espacial humana nos últimos séculos.</p>
        
        <p>Em 2007, pela primeira vez na história, a população urbana mundial superou a rural. Atualmente, mais de 55% da população mundial vive em áreas urbanas, percentual que deve aumentar para 68% até 2050, segundo a ONU. Este processo ocorre de maneira desigual entre os países e regiões, com características e ritmos distintos.</p>
        
        <p><strong>Fases da urbanização:</strong></p>
        <ul>
          <li><strong>Urbanização clássica:</strong> Associada à industrialização nos países desenvolvidos (séculos XVIII-XIX)</li>
          <li><strong>Urbanização tardia:</strong> Ocorrida nos países em desenvolvimento (século XX), geralmente mais acelerada e desordenada</li>
          <li><strong>Metropolização:</strong> Formação de grandes centros urbanos e regiões metropolitanas</li>
          <li><strong>Megalopolização:</strong> Fusão de áreas metropolitanas, formando imensos corredores urbanos</li>
        </ul>
        
        <p><strong>Consequências da urbanização:</strong></p>
        <ul>
          <li><strong>Positivas:</strong> Maior acesso a serviços, oportunidades econômicas, intercâmbio cultural, inovação</li>
          <li><strong>Negativas:</strong> Segregação socioespacial, especulação imobiliária, problemas ambientais, infraestrutura deficiente</li>
        </ul>
        
        <p><strong>Desafios da urbanização contemporânea:</strong> Habitação adequada, mobilidade urbana, saneamento básico, sustentabilidade ambiental, redução das desigualdades e governança participativa. O conceito de "cidades inteligentes" tem ganhado destaque como abordagem para enfrentar estes desafios com uso de tecnologia e planejamento integrado.</p>
      `;
    }
  }
  
  // Temas de Português
  else if (materia === 'Português' || materia === 'Literatura') {
    if (temaLowerCase.includes('modernismo')) {
      return `
        <p>O Modernismo foi um movimento artístico e literário de ruptura com as tradições estabelecidas, que se desenvolveu na primeira metade do século XX. No Brasil, teve como marco inicial a Semana de Arte Moderna de 1922, realizada em São Paulo, e representou uma busca pela identidade cultural brasileira e pela renovação estética.</p>
        
        <p>Inspirado pelas vanguardas europeias (futurismo, cubismo, surrealismo), mas com características próprias, o Modernismo brasileiro propôs uma nova linguagem artística, valorizando temas nacionais, incorporando a linguagem coloquial e rompendo com o formalismo parnasiano e simbolista que dominava a literatura brasileira até então.</p>
        
        <p><strong>Fases do Modernismo brasileiro:</strong></p>
        <ul>
          <li><strong>Primeira fase (1922-1930):</strong> Fase heroica, de ruptura e experimentação, representada por autores como Mário de Andrade, Oswald de Andrade e Manuel Bandeira</li>
          <li><strong>Segunda fase (1930-1945):</strong> Fase de consolidação, com temáticas sociais e regionais, tendo como expoentes Graciliano Ramos, Jorge Amado e Carlos Drummond de Andrade</li>
          <li><strong>Terceira fase (1945-1980):</strong> Fase de experimentalismo formal e universalização temática, com autores como João Guimarães Rosa, Clarice Lispector e João Cabral de Melo Neto</li>
        </ul>
        
        <p><strong>Características principais:</strong></p>
        <ul>
          <li>Linguagem coloquial e valorização da fala brasileira</li>
          <li>Liberdade formal e experimentalismo estético</li>
          <li>Nacionalismo crítico e valorização da cultura brasileira</li>
          <li>Humor, ironia e paródia como recursos expressivos</li>
          <li>Temas do cotidiano e da realidade social brasileira</li>
        </ul>
        
        <p><strong>Obras fundamentais:</strong> "Macunaíma" de Mário de Andrade, "Memórias Sentimentais de João Miramar" de Oswald de Andrade, "Vidas Secas" de Graciliano Ramos, "Grande Sertão: Veredas" de Guimarães Rosa e "A Hora da Estrela" de Clarice Lispector são algumas das obras mais representativas deste movimento.</p>
      `;
    } else if (temaLowerCase.includes('sintaxe')) {
      return `
        <p>A sintaxe é a parte da gramática que estuda a estrutura, a formação e a classificação das frases e das relações entre as palavras. Ocupa-se da disposição das palavras na frase e das frases no discurso, bem como das relações lógicas estabelecidas entre esses elementos.</p>
        
        <p>O estudo sintático é fundamental para a compreensão e produção de textos coerentes e bem estruturados em qualquer língua. Na língua portuguesa, a sintaxe apresenta particularidades que a distinguem de outras línguas românicas, apesar das semelhanças estruturais básicas.</p>
        
        <p><strong>Conceitos fundamentais da sintaxe:</strong></p>
        <ul>
          <li><strong>Período:</strong> Enunciado linguístico com sentido completo, podendo ser simples (uma oração) ou composto (duas ou mais orações)</li>
          <li><strong>Oração:</strong> Unidade sintática organizada em torno de um verbo ou locução verbal</li>
          <li><strong>Termos da oração:</strong> Elementos que compõem a estrutura oracional (sujeito, predicado, objeto, adjunto, etc.)</li>
          <li><strong>Concordância:</strong> Harmonização morfológica entre os termos da oração (nominal e verbal)</li>
          <li><strong>Regência:</strong> Relação de dependência entre os termos regentes e regidos</li>
        </ul>
        
        <p><strong>Tipos de sujeito:</strong> Simples, composto, oculto, indeterminado, inexistente</p>
        <p><strong>Tipos de predicado:</strong> Verbal, nominal, verbo-nominal</p>
        <p><strong>Tipos de período composto:</strong> Por coordenação (orações independentes) e por subordinação (orações dependentes)</p>
        
        <p>A análise sintática é essencial para a compreensão do funcionamento da língua em seu nível estrutural e contribui significativamente para o desenvolvimento das habilidades de escrita, leitura crítica e interpretação textual.</p>
      `;
    }
  }
  
  // Temas de Ciências/Biologia
  else if (materia === 'Ciências' || materia === 'Biologia') {
    if (temaLowerCase.includes('evolução')) {
      return `
        <p>A teoria da evolução biológica explica como as populações de organismos mudam ao longo do tempo através de modificações em características hereditárias, resultando na diversidade de formas de vida na Terra. A teoria moderna da evolução, também chamada de síntese evolutiva moderna, integra a seleção natural de Charles Darwin com a genética mendeliana e outros avanços científicos.</p>
        
        <p>Proposta inicialmente em 1859 por Charles Darwin em "A Origem das Espécies", a teoria evolucionista revolucionou a biologia ao oferecer uma explicação natural para a diversidade biológica, sem recorrer a intervenções sobrenaturais. Hoje, a evolução é o conceito unificador da biologia, sustentado por evidências de múltiplos campos científicos.</p>
        
        <p><strong>Mecanismos evolutivos:</strong></p>
        <ul>
          <li><strong>Seleção natural:</strong> Processo pelo qual características adaptativas se tornam mais comuns em populações ao longo das gerações</li>
          <li><strong>Mutação:</strong> Alterações aleatórias no material genético, criando variabilidade</li>
          <li><strong>Deriva genética:</strong> Mudanças aleatórias nas frequências alélicas, especialmente em populações pequenas</li>
          <li><strong>Fluxo gênico:</strong> Troca de material genético entre populações diferentes</li>
          <li><strong>Isolamento reprodutivo:</strong> Mecanismos que impedem o cruzamento entre espécies, levando à especiação</li>
        </ul>
        
        <p><strong>Evidências da evolução:</strong></p>
        <ul>
          <li>Registro fóssil, documentando formas intermediárias e extintas</li>
          <li>Anatomia comparada, mostrando homologias entre estruturas de diferentes espécies</li>
          <li>Embriologia, revelando similaridades no desenvolvimento de organismos diferentes</li>
          <li>Distribuição geográfica (biogeografia) de espécies relacionadas</li>
          <li>Biologia molecular, demonstrando relações filogenéticas no DNA</li>
          <li>Evolução observável em organismos de reprodução rápida (ex: bactérias, insetos)</li>
        </ul>
      `;
    } else if (temaLowerCase.includes('corpo humano')) {
      return `
        <p>O corpo humano é uma estrutura biológica complexa composta por aproximadamente 37 trilhões de células organizadas em tecidos, órgãos e sistemas que trabalham em conjunto para manter a vida. Produto de milhões de anos de evolução, o corpo humano apresenta características únicas que nos distinguem de outras espécies, como o cérebro altamente desenvolvido, a postura bípede e a destreza manual.</p>
        
        <p>O estudo do corpo humano abrange diversas disciplinas, como anatomia, fisiologia, histologia, embriologia e bioquímica, cada uma focada em aspectos específicos de sua estrutura e funcionamento. A medicina e áreas correlatas aplicam esse conhecimento para prevenir e tratar doenças e promover a saúde.</p>
        
        <p><strong>Principais sistemas do corpo humano:</strong></p>
        <ul>
          <li><strong>Sistema Cardiovascular:</strong> Coração, vasos sanguíneos e sangue; responsável pela circulação e transporte</li>
          <li><strong>Sistema Respiratório:</strong> Pulmões e vias aéreas; realiza as trocas gasosas</li>
          <li><strong>Sistema Digestório:</strong> Boca até ânus; processa alimentos e absorve nutrientes</li>
          <li><strong>Sistema Nervoso:</strong> Cérebro, medula espinhal e nervos; controla e coordena funções</li>
          <li><strong>Sistema Endócrino:</strong> Glândulas que secretam hormônios; regula processos metabólicos</li>
          <li><strong>Sistema Musculoesquelético:</strong> Ossos, músculos e articulações; fornece suporte e movimento</li>
          <li><strong>Sistema Imunológico:</strong> Células e órgãos que defendem contra patógenos</li>
          <li><strong>Sistema Urinário:</strong> Rins e vias urinárias; filtra o sangue e elimina resíduos</li>
          <li><strong>Sistema Reprodutor:</strong> Órgãos responsáveis pela reprodução (feminino ou masculino)</li>
        </ul>
        
        <p><strong>Curiosidades:</strong> O corpo humano adulto contém aproximadamente 206 ossos, mais de 600 músculos, 100.000 km de vasos sanguíneos e cerca de 86 bilhões de neurônios no cérebro. Diariamente, um coração saudável bombeia aproximadamente 7.500 litros de sangue, e os pulmões processam cerca de 10.000 litros de ar.</p>
      `;
    }
  }
  
  // Temas de Física
  else if (materia === 'Física') {
    if (temaLowerCase.includes('lei') && temaLowerCase.includes('newton')) {
      return `
        <p>As Leis de Newton, formuladas pelo físico e matemático inglês Isaac Newton (1643-1727) em sua obra "Princípios Matemáticos da Filosofia Natural" (1687), são três princípios fundamentais que descrevem a relação entre as forças que atuam sobre um corpo e seu movimento. Estas leis formam a base da mecânica clássica e revolucionaram a compreensão científica do movimento.</p>
        
        <p>Newton construiu seu trabalho a partir das contribuições de Galileu Galilei, Johannes Kepler e René Descartes, entre outros. Suas leis do movimento, juntamente com sua lei da gravitação universal, explicaram uma vasta gama de fenômenos físicos e permitiram previsões precisas sobre o movimento dos corpos celestes e objetos na Terra.</p>
        
        <p><strong>As três leis do movimento:</strong></p>
        <ul>
          <li><strong>Primeira Lei (Lei da Inércia):</strong> "Um corpo permanece em repouso ou em movimento retilíneo uniforme, a menos que seja forçado a mudar seu estado por forças impressas sobre ele." Esta lei estabelece o conceito de inércia, a tendência dos corpos de resistir a mudanças em seu estado de movimento.</li>
          <li><strong>Segunda Lei (Lei Fundamental da Dinâmica):</strong> "A mudança de movimento é proporcional à força motora impressa, e ocorre na direção em que a força é aplicada." Matematicamente expressa como F = m·a (força = massa × aceleração), esta lei define quantitativamente a relação entre força, massa e aceleração.</li>
          <li><strong>Terceira Lei (Lei da Ação e Reação):</strong> "A cada ação há sempre uma reação igual e oposta: as ações mútuas de dois corpos um sobre o outro são sempre iguais e dirigidas em sentidos opostos." Esta lei estabelece que forças sempre ocorrem em pares, com cada par atuando em corpos diferentes.</li>
        </ul>
        
        <p><strong>Importância histórica:</strong> As Leis de Newton permitiram explicar uma ampla variedade de fenômenos, desde o movimento de projéteis até as órbitas planetárias, unificando a física terrestre e celeste. Elas dominaram o pensamento científico por mais de dois séculos até o desenvolvimento da relatividade e da mecânica quântica no século XX, que as complementaram para explicar fenômenos em escalas muito grandes, muito pequenas ou a velocidades próximas à da luz.</p>
      `;
    } else if (temaLowerCase.includes('eletromagnetismo')) {
      return `
        <p>O eletromagnetismo é um ramo da física que estuda os fenômenos elétricos e magnéticos e suas interações. A teoria eletromagnética, unificada pelo físico escocês James Clerk Maxwell no século XIX, demonstrou que a eletricidade e o magnetismo são manifestações de um mesmo fenômeno fundamental: o campo eletromagnético.</p>
        
        <p>Esta unificação, publicada nas "Equações de Maxwell" (1861-1862), representou uma das maiores sínteses da história da física, mostrando que a luz é uma onda eletromagnética e prevendo a existência de ondas de rádio, entre outros fenômenos. O eletromagnetismo é uma das quatro forças fundamentais da natureza, junto com a gravidade e as forças nucleares forte e fraca.</p>
        
        <p><strong>Conceitos fundamentais:</strong></p>
        <ul>
          <li><strong>Carga elétrica:</strong> Propriedade fundamental da matéria que produz forças elétricas; pode ser positiva ou negativa</li>
          <li><strong>Campo elétrico:</strong> Região do espaço onde cargas elétricas experimentam forças</li>
          <li><strong>Campo magnético:</strong> Região do espaço onde materiais magnéticos ou cargas em movimento experimentam forças</li>
          <li><strong>Lei de Coulomb:</strong> Descreve a força entre cargas elétricas</li>
          <li><strong>Lei de Ampère:</strong> Relaciona correntes elétricas a campos magnéticos</li>
          <li><strong>Lei de Faraday:</strong> Descreve a indução eletromagnética (geração de eletricidade a partir de magnetismo)</li>
        </ul>
        
        <p><strong>Aplicações práticas:</strong></p>
        <ul>
          <li>Geradores e motores elétricos</li>
          <li>Transformadores e distribuição de energia elétrica</li>
          <li>Telecomunicações (rádio, TV, telefonia, internet sem fio)</li>
          <li>Dispositivos eletrônicos e computadores</li>
          <li>Imageamento médico (ressonância magnética)</li>
          <li>Transporte (trens de levitação magnética)</li>
        </ul>
      `;
    }
  }
  
  // Temas de Química
  else if (materia === 'Química') {
    if (temaLowerCase.includes('tabela periódica') || temaLowerCase.includes('tabela periodica')) {
      return `
        <p>A Tabela Periódica dos Elementos é um arranjo sistemático dos elementos químicos, organizados em ordem crescente de número atômico e agrupados de acordo com suas propriedades químicas semelhantes. É uma das ferramentas mais importantes da química, pois permite visualizar padrões e relações entre os diferentes elementos conhecidos.</p>
        
        <p>Desenvolvida inicialmente pelo químico russo Dmitri Mendeleev em 1869, a tabela periódica moderna contém 118 elementos confirmados, do hidrogênio (número atômico 1) ao oganessônio (número atômico 118). Sua estrutura reflete a configuração eletrônica dos átomos, determinando suas propriedades químicas e físicas.</p>
        
        <p><strong>Organização da tabela:</strong></p>
        <ul>
          <li><strong>Períodos:</strong> Linhas horizontais, numeradas de 1 a 7, representando o nível de energia principal</li>
          <li><strong>Grupos:</strong> Colunas verticais (numeradas de 1 a 18), agrupando elementos com propriedades químicas semelhantes</li>
          <li><strong>Blocos:</strong> s, p, d e f, correspondendo ao subnível em que se encontra o último elétron adicionado</li>
        </ul>
        
        <p><strong>Classificação dos elementos:</strong></p>
        <ul>
          <li><strong>Metais:</strong> Maioria dos elementos, localizados à esquerda e no centro da tabela</li>
          <li><strong>Não metais:</strong> Localizados principalmente à direita da tabela</li>
          <li><strong>Semimetais (ou metaloides):</strong> Elementos com propriedades intermediárias entre metais e não metais</li>
          <li><strong>Gases nobres:</strong> Grupo 18, elementos com baixa reatividade química</li>
          <li><strong>Metais alcalinos:</strong> Grupo 1, altamente reativos</li>
          <li><strong>Metais alcalino-terrosos:</strong> Grupo 2, menos reativos que os alcalinos</li>
          <li><strong>Halogênios:</strong> Grupo 17, altamente reativos e formadores de sais</li>
        </ul>
        
        <p><strong>Importância:</strong> A tabela periódica permite prever propriedades físicas e químicas dos elementos, compreender a formação de compostos, projetar novos materiais e entender fenômenos químicos. É uma demonstração notável da ordem subjacente à natureza e um dos maiores triunfos da ciência em termos de classificação e previsão.</p>
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
