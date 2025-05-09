// Função para obter conteúdo específico para temas históricos ou outros temas relevantes
export const getThematicContent = (materia: string, tema: string): string | null => {
  const temaLowerCase = tema.toLowerCase();
  
  // Temas de História
  if (materia === 'História') {
    if ((temaLowerCase.includes('pré-história') || temaLowerCase.includes('pre historia') || temaLowerCase.includes('pre-historia')) && 
        (temaLowerCase.includes('brasil') || temaLowerCase.includes('brasileira'))) {
      return `
        <p>A pré-história brasileira refere-se ao período anterior à chegada dos portugueses em 1500, abrangendo aproximadamente 50 mil anos de ocupação humana no território que hoje corresponde ao Brasil. Este período pré-cabraliano é caracterizado pela presença de diversas populações indígenas que desenvolveram culturas sofisticadas adaptadas aos diferentes ambientes do território brasileiro.</p>
        
        <p>Os vestígios arqueológicos encontrados no Brasil mostram que os primeiros habitantes chegaram durante o período Paleolítico Superior, migrando provavelmente pela Beríngia (ponte terrestre entre Ásia e América) e se dispersando pelo continente americano. Sítios arqueológicos importantes como Pedra Furada (PI), Lagoa Santa (MG) e Serra da Capivara (PI) revelam a antiguidade e complexidade dessa ocupação.</p>
        
        <p><strong>Principais períodos e características:</strong></p>
        <ul>
          <li><strong>Período Paleoindígena (12.000 a 8.000 a.C.):</strong> Primeiros habitantes, caçadores-coletores que utilizavam tecnologia lítica, como pontas de projétil. O sítio arqueológico de Pedra Furada, no Piauí, apresenta datações controversas que podem recuar a presença humana para até 50.000 anos atrás.</li>
          <li><strong>Período Arcaico (8.000 a 4.000 a.C.):</strong> Desenvolvimento de tecnologias mais adaptadas ao ambiente tropical, início da domesticação de plantas e formação de aldeamentos mais estáveis.</li>
          <li><strong>Período Formativo (4.000 a.C. a 1.500 d.C.):</strong> Surgimento da cerâmica, agricultura mais desenvolvida, formação de sociedades complexas e redes de comércio entre diferentes grupos.</li>
        </ul>
        
        <p><strong>Principais culturas pré-cabralinas:</strong></p>
        <ul>
          <li><strong>Sambaquis:</strong> Monumentais depósitos de conchas construídos por povos pescadores-coletores no litoral brasileiro entre 8.000 e 2.000 anos atrás, alguns chegando a 30 metros de altura.</li>
          <li><strong>Cultura Marajoara:</strong> Sociedade complexa desenvolvida na Ilha de Marajó entre os séculos IV e XIV, conhecida por sua sofisticada cerâmica decorada e organização social hierarquizada.</li>
          <li><strong>Povos da Terra Preta:</strong> Comunidades da Amazônia que desenvolveram técnicas agrícolas avançadas, criando solos férteis antropogênicos (terra preta de índio) capazes de sustentar grandes populações.</li>
          <li><strong>Geoglifos amazônicos:</strong> Enormes desenhos geométricos escavados no solo, descobertos recentemente após o desmatamento, indicando organizações sociais complexas capazes de mobilizar grande força de trabalho.</li>
          <li><strong>Civilização Tapajônica:</strong> Sociedade complexa que habitou a região do baixo Tapajós, com cerâmica elaborada e possível organização em cacicados.</li>
        </ul>
        
        <p><strong>Legado e importância:</strong> Estima-se que cerca de 5 milhões de indígenas habitavam o território brasileiro em 1500, falando mais de 1.000 línguas diferentes. Esses povos desenvolveram conhecimentos sofisticados sobre o meio ambiente, incluindo manejos florestais sustentáveis que moldaram a biodiversidade amazônica. Práticas agrícolas como o cultivo de mandioca, milho, batata-doce, amendoim e diversas frutas foram contribuições fundamentais dessas populações, assim como tecnologias de processamento desses alimentos. A complexidade das organizações sociais e culturais dos povos pré-cabralinos tem sido cada vez mais reconhecida pela arqueologia contemporânea, desafiando visões simplistas sobre esses povos.</p>
      `;
    } else if (temaLowerCase.includes('pré-história') || temaLowerCase.includes('pre historia') || temaLowerCase.includes('pre-historia')) {
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
    } else if (temaLowerCase.includes('descobrimento do brasil') || temaLowerCase.includes('chegada dos portugueses')) {
      return `
        <p>O chamado "descobrimento do Brasil" ocorreu em 22 de abril de 1500, quando a esquadra portuguesa comandada por Pedro Álvares Cabral chegou ao litoral do atual estado da Bahia. Este evento marca oficialmente o início da colonização europeia no território brasileiro, embora existam evidências e debates historiográficos sobre visitas anteriores de outros navegadores europeus.</p>
        
        <p>A expedição de Cabral fazia parte da expansão marítima portuguesa e tinha como destino principal as Índias, buscando estabelecer rotas comerciais para as especiarias. O desvio para o oeste que resultou na chegada ao Brasil pode ter sido acidental, resultante de correntes marítimas e ventos, ou intencional, como parte de uma estratégia geopolítica portuguesa.</p>
        
        <p><strong>Contexto histórico:</strong></p>
        <ul>
          <li><strong>Tratado de Tordesilhas (1494):</strong> Acordo entre Portugal e Espanha que dividia o mundo a ser "descoberto" entre as duas potências</li>
          <li><strong>Era das Grandes Navegações:</strong> Período de expansão marítima europeia motivado por interesses comerciais, religiosos e políticos</li>
          <li><strong>Viagem de Colombo (1492):</strong> Precedeu o "descobrimento" do Brasil e iniciou a colonização europeia na América</li>
          <li><strong>Viagem de Vasco da Gama (1497-1499):</strong> Estabeleceu a rota marítima para as Índias contornando a África</li>
        </ul>
        
        <p><strong>Primeiros contatos e registros:</strong></p>
        <ul>
          <li><strong>Carta de Pero Vaz de Caminha:</strong> Primeiro documento escrito sobre o Brasil, descrevendo a terra e seus habitantes aos reis de Portugal</li>
          <li><strong>Primeiros contatos com os povos Tupiniquins:</strong> Descritos como pacíficos nos relatos portugueses</li>
          <li><strong>Missa celebrada por Frei Henrique de Coimbra:</strong> Primeira cerimônia religiosa católica realizada em solo brasileiro</li>
          <li><strong>Posse da terra:</strong> Cabral tomou posse do território para a Coroa Portuguesa, denominando-o inicialmente de "Ilha de Vera Cruz"</li>
        </ul>
        
        <p><strong>Perspectivas críticas contemporâneas:</strong> A historiografia atual problematiza o termo "descobrimento", reconhecendo que o território já era habitado por milhões de indígenas com culturas complexas e organizadas. Alguns historiadores preferem termos como "achamento", "invasão" ou "conquista" para designar este processo que iniciou profundas transformações demográficas, culturais e ambientais nas terras que viriam a formar o Brasil. O evento representa o encontro (muitas vezes violento) entre civilizações com visões de mundo drasticamente diferentes e o início de um processo colonizador que resultou no genocídio de grande parte da população nativa.</p>
      `;
    } else if (temaLowerCase.includes('brasil colônia') || temaLowerCase.includes('brasil colonia') || temaLowerCase.includes('período colonial brasileiro')) {
      return `
        <p>O Brasil Colônia foi o período que se estendeu de 1500 a 1822, durante o qual o território brasileiro esteve sob domínio português. Nestes três séculos, foram estabelecidas as bases da formação territorial, populacional e cultural do Brasil, através de um processo de colonização marcado pela exploração econômica, miscigenação étnica e imposição cultural europeia.</p>
        
        <p>A colonização brasileira seguiu o modelo de exploração mercantilista, visando principalmente a extração de recursos para enriquecer a metrópole portuguesa. Este período foi caracterizado pelo estabelecimento de uma sociedade patriarcal, escravocrata e latifundiária, com forte influência da Igreja Católica.</p>
        
        <p><strong>Fases da colonização:</strong></p>
        <ul>
          <li><strong>Pré-Colonial (1500-1530):</strong> Exploração do pau-brasil através do escambo com indígenas, presença de feitorias no litoral, ameaças de invasões estrangeiras</li>
          <li><strong>Brasil Colonial (1530-1822):</strong> Implementação do sistema de capitanias hereditárias (1534), estabelecimento do Governo-Geral (1549), ciclos econômicos sucessivos, ocupação do interior</li>
        </ul>
        
        <p><strong>Principais ciclos econômicos:</strong></p>
        <ul>
          <li><strong>Ciclo do Pau-Brasil (século XVI):</strong> Primeira atividade econômica, baseada na extração da madeira para tinturaria</li>
          <li><strong>Ciclo da Cana-de-Açúcar (séculos XVI-XVII):</strong> Baseado na plantation, com latifúndios, monocultura e mão de obra escravizada africana</li>
          <li><strong>Ciclo do Ouro (século XVIII):</strong> Descoberta de ouro em Minas Gerais, Goiás e Mato Grosso, intensificando a ocupação do interior</li>
          <li><strong>Ciclo do Algodão (final do século XVIII):</strong> Desenvolvido principalmente no Maranhão e Nordeste</li>
          <li><strong>Ciclo do Café (século XIX):</strong> Iniciado no final do período colonial e expandido após a independência</li>
        </ul>
        
        <p><strong>Sociedade colonial:</strong></p>
        <ul>
          <li><strong>Estrutura hierárquica:</strong> No topo, a elite branca (senhores de engenho, mineradores, grandes comerciantes); no meio, homens livres pobres, mestiços e libertos; na base, escravizados indígenas e africanos</li>
          <li><strong>Escravidão:</strong> Base do sistema produtivo colonial, com cerca de 4 milhões de africanos trazidos forçadamente ao Brasil durante o período</li>
          <li><strong>Resistência:</strong> Formação de quilombos (como Palmares), revoltas e outras formas de resistência à escravidão e ao domínio português</li>
          <li><strong>Miscigenação:</strong> Processo de formação de uma sociedade multiétnica através da mistura entre europeus, indígenas e africanos</li>
        </ul>
        
        <p><strong>Movimentos nativistas e emancipacionistas:</strong></p>
        <ul>
          <li><strong>Guerra dos Emboabas (1707-1709)</strong></li>
          <li><strong>Guerra dos Mascates (1710-1711)</strong></li>
          <li><strong>Revolta de Felipe dos Santos (1720)</strong></li>
          <li><strong>Inconfidência Mineira (1789)</strong></li>
          <li><strong>Conjuração Baiana (1798)</strong></li>
          <li><strong>Revolução Pernambucana (1817)</strong></li>
        </ul>
        
        <p>O período colonial terminou oficialmente com a Independência do Brasil em 1822, quando D. Pedro I rompeu os laços políticos com Portugal. No entanto, muitas estruturas socioeconômicas do período colonial persistiram no Brasil independente, como a escravidão (abolida apenas em 1888), o latifúndio e a economia agroexportadora.</p>
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
    } else if (temaLowerCase.includes('império do brasil') || temaLowerCase.includes('imperio do brasil') || temaLowerCase.includes('brasil império') || temaLowerCase.includes('brasil imperio')) {
      return `
        <p>O Império do Brasil foi o período da história brasileira compreendido entre a independência de Portugal em 1822 e a Proclamação da República em 1889. Durante esse intervalo de 67 anos, o Brasil foi governado por dois imperadores: D. Pedro I (1822-1831) e seu filho D. Pedro II (1831-1889), sendo que este último assumiu efetivamente o poder apenas em 1840, após o período regencial.</p>
        
        <p>Este período foi marcado pela consolidação do Estado brasileiro, expansão territorial, desenvolvimento econômico baseado na agricultura de exportação (principalmente café), permanência da escravidão até 1888 e pela gradual modernização das instituições e infraestrutura do país.</p>
        
        <p><strong>Primeiro Reinado (1822-1831):</strong></p>
        <ul>
          <li><strong>Governo de D. Pedro I:</strong> Marcado por conflitos entre tendências absolutistas e liberais</li>
          <li><strong>Constituição de 1824:</strong> Primeira constituição brasileira, outorgada pelo imperador, estabeleceu o Poder Moderador</li>
          <li><strong>Confederação do Equador (1824):</strong> Revolta republicana e separatista no Nordeste</li>
          <li><strong>Guerra da Cisplatina (1825-1828):</strong> Conflito que resultou na independência do Uruguai</li>
          <li><strong>Crise política:</strong> Desgaste do imperador levou à sua abdicação em 7 de abril de 1831</li>
        </ul>
        
        <p><strong>Período Regencial (1831-1840):</strong></p>
        <ul>
          <li><strong>Regências Trina Provisória, Trina Permanente e Una:</strong> Governos que substituíram o imperador menor de idade</li>
          <li><strong>Reformas liberais:</strong> Código de Processo Criminal (1832) e Ato Adicional (1834)</li>
          <li><strong>Revoltas provinciais:</strong> Cabanagem (PA), Sabinada (BA), Balaiada (MA), Farroupilha (RS), entre outras</li>
          <li><strong>Regresso conservador:</strong> Reação às reformas liberais e centralização do poder</li>
          <li><strong>Golpe da Maioridade (1840):</strong> Antecipação da maioridade de D. Pedro II para estabilizar o país</li>
        </ul>
        
        <p><strong>Segundo Reinado (1840-1889):</strong></p>
        <ul>
          <li><strong>Consolidação do Estado:</strong> Pacificação das províncias e fortalecimento das instituições nacionais</li>
          <li><strong>Parlamentarismo às avessas:</strong> Sistema político com alternância entre liberais e conservadores</li>
          <li><strong>Guerra do Paraguai (1864-1870):</strong> Maior conflito militar da América do Sul, consolidou o exército brasileiro</li>
          <li><strong>Questão Religiosa (1872-1875):</strong> Conflito entre a Igreja Católica e a Maçonaria que envolveu o governo imperial</li>
          <li><strong>Questão abolicionista:</strong> Processo gradual de abolição da escravidão (Lei Eusébio de Queirós, Lei do Ventre Livre, Lei dos Sexagenários e Lei Áurea)</li>
          <li><strong>Questão militar:</strong> Conflitos entre o exército e o governo imperial</li>
          <li><strong>Movimento republicano:</strong> Crescimento do ideal republicano, especialmente após o Manifesto Republicano de 1870</li>
        </ul>
        
        <p><strong>Economia e sociedade imperial:</strong></p>
        <ul>
          <li><strong>Economia agroexportadora:</strong> Baseada principalmente no café, que se tornou o principal produto de exportação</li>
          <li><strong>Início da industrialização:</strong> Especialmente no final do período, com investimentos do Barão de Mauá e outros empreendedores</li>
          <li><strong>Imigração europeia:</strong> Intensificada após 1850, visando substituir gradualmente a mão de obra escravizada</li>
          <li><strong>Urbanização:</strong> Crescimento das cidades e melhorias urbanas, especialmente no Rio de Janeiro</li>
          <li><strong>Modernização dos transportes:</strong> Construção de ferrovias, navegação a vapor e implementação do telégrafo</li>
        </ul>
        
        <p>O Império do Brasil terminou com a Proclamação da República em 15 de novembro de 1889, quando um golpe militar liderado pelo Marechal Deodoro da Fonseca depôs D. Pedro II, encerrando a monarquia no Brasil e inaugurando o período republicano.</p>
      `;
    } else if (temaLowerCase.includes('república velha') || temaLowerCase.includes('republica velha') || temaLowerCase.includes('primeira república')) {
      return `
        <p>A República Velha, também conhecida como Primeira República, foi o período inicial da história republicana brasileira, estendendo-se da Proclamação da República em 15 de novembro de 1889 até a Revolução de 1930. Durante estas quatro décadas, o Brasil passou por profundas transformações políticas, econômicas e sociais, consolidando-se como república federativa.</p>
        
        <p>Este período foi caracterizado pelo domínio político das oligarquias rurais, especialmente dos cafeicultores paulistas e dos pecuaristas mineiros, que se alternavam no poder federal através da chamada "política do café-com-leite". Ao mesmo tempo, testemunhou-se o crescimento urbano, o início da industrialização e a emergência de novos atores sociais como o operariado e a classe média urbana.</p>
        
        <p><strong>República da Espada (1889-1894):</strong></p>
        <ul>
          <li><strong>Governos militares:</strong> Deodoro da Fonseca (1889-1891) e Floriano Peixoto (1891-1894)</li>
          <li><strong>Constituição de 1891:</strong> Estabeleceu o sistema presidencialista, federalismo e separação entre Igreja e Estado</li>
          <li><strong>Encilhamento:</strong> Crise financeira durante o governo Deodoro, resultante de políticas monetárias expansionistas</li>
          <li><strong>Revoltas:</strong> Revolta da Armada (1891 e 1893-1894) e Revolução Federalista (1893-1895)</li>
        </ul>
        
        <p><strong>República Oligárquica (1894-1930):</strong></p>
        <ul>
          <li><strong>Política dos Governadores:</strong> Sistema que garantia a autonomia estadual em troca de apoio ao governo federal</li>
          <li><strong>Política do café-com-leite:</strong> Alternância no poder entre São Paulo (café) e Minas Gerais (leite)</li>
          <li><strong>Coronelismo:</strong> Sistema de poder local baseado em grandes proprietários rurais que controlavam o voto de seus dependentes</li>
          <li><strong>Voto de cabresto:</strong> Prática de controle do eleitorado pelos coronéis, em um sistema de voto aberto e não-secreto</li>
          <li><strong>Política de valorização do café:</strong> Intervenção estatal para manter os preços do café no mercado internacional</li>
        </ul>
        
        <p><strong>Revoltas e movimentos sociais:</strong></p>
        <ul>
          <li><strong>Canudos (1896-1897):</strong> Movimento messiânico liderado por Antônio Conselheiro no interior da Bahia</li>
          <li><strong>Revolta da Vacina (1904):</strong> Protestos populares contra a vacinação obrigatória no Rio de Janeiro</li>
          <li><strong>Revolta da Chibata (1910):</strong> Motim de marinheiros contra castigos físicos na Marinha</li>
          <li><strong>Contestado (1912-1916):</strong> Conflito messiânico no sul do país</li>
          <li><strong>Greves operárias (1917-1919):</strong> Mobilizações trabalhistas nas principais cidades</li>
          <li><strong>Tenentismo:</strong> Movimento de jovens oficiais do exército contra as oligarquias (Revolta do Forte de Copacabana em 1922, Revolução de 1924, Coluna Prestes)</li>
        </ul>
        
        <p><strong>Transformações econômicas e sociais:</strong></p>
        <ul>
          <li><strong>Economia cafeeira:</strong> Principal atividade econômica, com forte influência política</li>
          <li><strong>Industrialização incipiente:</strong> Estimulada pela Primeira Guerra Mundial e acumulação de capital do café</li>
          <li><strong>Urbanização:</strong> Crescimento das cidades, especialmente São Paulo e Rio de Janeiro</li>
          <li><strong>Imigração:</strong> Entrada de milhões de imigrantes, principalmente europeus (italianos, portugueses, espanhóis)</li>
          <li><strong>Formação da classe operária:</strong> Surgimento de organizações sindicais e influência de ideias anarquistas e socialistas</li>
        </ul>
        
        <p><strong>Crise e fim da Primeira República:</strong></p>
        <ul>
          <li><strong>Crise de 1929:</strong> Quebra da bolsa de Nova York e seus impactos na economia cafeeira</li>
          <li><strong>Eleições de 1930:</strong> Derrota de Getúlio Vargas e ruptura da política café-com-leite</li>
          <li><strong>Revolução de 1930:</strong> Movimento armado liderado por Getúlio Vargas que pôs fim à República Velha</li>
        </ul>
        
        <p>A República Velha encerrou-se oficialmente em 24 de outubro de 1930, quando Getúlio Vargas assumiu o poder, iniciando a Era Vargas e promovendo transformações significativas na estrutura política, econômica e social do Brasil.</p>
      `;
    } else if (temaLowerCase.includes('era vargas') || temaLowerCase.includes('getúlio vargas') || temaLowerCase.includes('getulio vargas')) {
      return `
        <p>A Era Vargas corresponde ao período de 15 anos (1930-1945) em que Getúlio Vargas governou o Brasil ininterruptamente, primeiro como chefe do Governo Provisório (1930-1934), depois como presidente eleito pelo Congresso Nacional (1934-1937) e, finalmente, como ditador durante o Estado Novo (1937-1945). Este período representou uma profunda transformação no país, com centralização política, modernização econômica e ampliação dos direitos sociais, especialmente trabalhistas.</p>
        
        <p>Vargas chegou ao poder através da Revolução de 1930, movimento armado que pôs fim à República Velha e ao domínio das oligarquias cafeeiras. Sua longa permanência no poder foi marcada por uma política ambígua, ora pendendo para tendências autoritárias, ora para medidas populistas e progressistas.</p>
        
        <p><strong>Governo Provisório (1930-1934):</strong></p>
        <ul>
          <li><strong>Centralização política:</strong> Nomeação de interventores nos estados, substituindo os antigos governadores</li>
          <li><strong>Revolução Constitucionalista de 1932:</strong> Revolta de São Paulo contra o governo Vargas, exigindo uma nova constituição</li>
          <li><strong>Criação de ministérios:</strong> Trabalho, Indústria e Comércio, Educação e Saúde Pública</li>
          <li><strong>Primeiras leis trabalhistas:</strong> Jornada de 8 horas, férias remuneradas, trabalho feminino e de menores</li>
        </ul>
        
        <p><strong>Governo Constitucional (1934-1937):</strong></p>
        <ul>
          <li><strong>Constituição de 1934:</strong> Estabeleceu o voto secreto, o voto feminino e a legislação trabalhista</li>
          <li><strong>Polarização política:</strong> Surgimento da Ação Integralista Brasileira (AIB, fascista) e Aliança Nacional Libertadora (ANL, de esquerda)</li>
          <li><strong>Intentona Comunista (1935):</strong> Levante comunista liderado por Luís Carlos Prestes, rapidamente sufocado</li>
          <li><strong>Lei de Segurança Nacional:</strong> Instrumento legal para repressão política</li>
        </ul>
        
        <p><strong>Estado Novo (1937-1945):</strong></p>
        <ul>
          <li><strong>Golpe de Estado:</strong> Em 10 de novembro de 1937, com apoio militar, Vargas implantou uma ditadura</li>
          <li><strong>Constituição de 1937 ("Polaca"):</strong> Inspirada em modelos fascistas, concentrou poderes no Executivo</li>
          <li><strong>Departamento de Imprensa e Propaganda (DIP):</strong> Órgão de censura e propaganda do regime</li>
          <li><strong>Plano Cohen:</strong> Documento forjado sobre uma suposta conspiração comunista, usado para justificar o golpe</li>
          <li><strong>Repressão política:</strong> Perseguição a opositores, principalmente comunistas e integralistas</li>
          <li><strong>Política externa pragmática:</strong> Inicialmente equidistante e depois alinhada aos Aliados na Segunda Guerra Mundial</li>
          <li><strong>Participação na Segunda Guerra:</strong> Envio da Força Expedicionária Brasileira (FEB) para combater na Itália</li>
        </ul>
        
        <p><strong>Política econômica e social:</strong></p>
        <ul>
          <li><strong>Nacional-desenvolvimentismo:</strong> Modelo econômico voltado para a industrialização e substituição de importações</li>
          <li><strong>Empresas estatais:</strong> Criação da Companhia Siderúrgica Nacional (CSN), Companhia Vale do Rio Doce, entre outras</li>
          <li><strong>Consolidação das Leis do Trabalho (CLT):</strong> Unificação da legislação trabalhista em 1943</li>
          <li><strong>Sindicatos oficiais:</strong> Incorporação dos sindicatos ao Estado, com estrutura corporativista</li>
          <li><strong>Salário mínimo:</strong> Instituído em 1940</li>
          <li><strong>Justiça do Trabalho:</strong> Criada para mediar conflitos trabalhistas</li>
          <li><strong>Nacionalismo econômico:</strong> Proteção à indústria nacional e controle de recursos estratégicos</li>
        </ul>
        
        <p><strong>Fim do Estado Novo:</strong></p>
        <ul>
          <li><strong>Contradição:</strong> Brasil lutando contra o fascismo na Europa enquanto mantinha um regime autoritário internamente</li>
          <li><strong>Manifesto dos Mineiros (1943):</strong> Documento de intelectuais e políticos pedindo redemocratização</li>
          <li><strong>Queremismo:</strong> Movimento popular de apoio a Vargas ("Queremos Getúlio")</li>
          <li><strong>Deposição:</strong> Em 29 de outubro de 1945, Vargas foi deposto por um golpe militar</li>
        </ul>
        
        <p>Apesar de deposto em 1945, Getúlio Vargas retornaria à presidência em 1951, eleito democraticamente, governando até seu suicídio em 1954. Seu legado é complexo e contraditório, sendo considerado o principal estadista brasileiro do século XX, responsável por modernizar o país e implementar direitos sociais, mas também criticado pelo autoritarismo e práticas populistas.</p>
      `;
    } else if (temaLowerCase.includes('ditadura militar') || temaLowerCase.includes('regime militar') || temaLowerCase.includes('golpe de 64')) {
      return `
        <p>A Ditadura Militar no Brasil foi o regime autoritário que vigorou de 1964 a 1985, instaurado a partir do golpe de estado que derrubou o presidente democraticamente eleito João Goulart. Durante 21 anos, o país foi governado por sucessivos presidentes militares, em um período marcado por repressão política, censura, perseguição a opositores e, paradoxalmente, por intenso crescimento econômico em determinados momentos.</p>
        
        <p>O regime militar representou uma ruptura com o processo democrático e foi caracterizado pela supressão de direitos políticos e civis, pela forte intervenção estatal na economia e pelo alinhamento com os Estados Unidos no contexto da Guerra Fria.</p>
        
        <p><strong>Antecedentes e golpe de 1964:</strong></p>
        <ul>
          <li><strong>Governo João Goulart (1961-1964):</strong> Marcado por instabilidade política e polarização ideológica</li>
          <li><strong>Reformas de Base:</strong> Propostas progressistas de Jango (reforma agrária, urbana, tributária e educacional) que assustaram as elites conservadoras</li>
          <li><strong>Comício da Central do Brasil (13/03/1964):</strong> Evento em que Goulart anunciou medidas que aceleraram a conspiração golpista</li>
          <li><strong>Marcha da Família com Deus pela Liberdade:</strong> Manifestações conservadoras contra o governo Goulart</li>
          <li><strong>Golpe militar (31/03/1964):</strong> Movimento militar que depôs Goulart com apoio civil e dos Estados Unidos</li>
        </ul>
        
        <p><strong>Institucionalização do regime:</strong></p>
        <ul>
          <li><strong>Atos Institucionais:</strong> Decretos do Executivo que se sobrepunham à Constituição (destaque para o AI-5 de 1968, que suspendeu garantias constitucionais)</li>
          <li><strong>Bipartidarismo forçado:</strong> ARENA (apoio ao governo) e MDB (oposição controlada)</li>
          <li><strong>"Eleições" indiretas:</strong> Presidentes escolhidos pelo Congresso controlado pelos militares</li>
          <li><strong>Constituição de 1967:</strong> Institucionalizou o regime autoritário</li>
          <li><strong>Serviço Nacional de Informações (SNI):</strong> Órgão de inteligência e espionagem interna</li>
          <li><strong>Doutrina de Segurança Nacional:</strong> Base ideológica do regime, focada no combate ao "inimigo interno" (comunismo)</li>
        </ul>
        
        <p><strong>Fases do regime militar:</strong></p>
        <ul>
          <li><strong>Governo Castello Branco (1964-1967):</strong> "Institucionalização" do regime e reformas econômicas</li>
          <li><strong>Governo Costa e Silva (1967-1969):</strong> Radicalização com o AI-5 e intensificação da repressão</li>
          <li><strong>Governo Médici (1969-1974):</strong> "Anos de chumbo", auge da repressão e do "milagre econômico"</li>
          <li><strong>Governo Geisel (1974-1979):</strong> Início da "distensão lenta, gradual e segura"</li>
          <li><strong>Governo Figueiredo (1979-1985):</strong> Continuação da abertura política e anistia</li>
        </ul>
        
        <p><strong>Repressão e resistência:</strong></p>
        <ul>
          <li><strong>Operação Bandeirantes (OBAN) e DOI-CODI:</strong> Órgãos de repressão e tortura</li>
          <li><strong>Censura:</strong> Controle da imprensa, artes, cultura e educação</li>
          <li><strong>Exílio político:</strong> Milhares de brasileiros forçados a deixar o país</li>
          <li><strong>Resistência armada:</strong> Grupos que adotaram a luta armada como ALN, MR-8, VPR</li>
          <li><strong>Resistência pacífica:</strong> Movimentos estudantis, artísticos, intelectuais, religiosos e sindicais</li>
          <li><strong>Guerrilha do Araguaia:</strong> Movimento guerrilheiro rural organizado pelo PCdoB, duramente reprimido</li>
        </ul>
        
        <p><strong>Economia:</strong></p>
        <ul>
          <li><strong>"Milagre econômico" (1968-1973):</strong> Período de crescimento econômico acelerado (média de 11% ao ano)</li>
          <li><strong>Grandes obras:</strong> Ponte Rio-Niterói, Transamazônica, Itaipu, Programa Nuclear</li>
          <li><strong>Endividamento externo:</strong> Crescimento baseado em empréstimos internacionais</li>
          <li><strong>Crise do petróleo:</strong> Impacto negativo na economia a partir de 1973</li>
          <li><strong>Concentração de renda:</strong> Aumento da desigualdade social ("o bolo cresceu, mas não foi dividido")</li>
        </ul>
        
        <p><strong>Transição democrática:</strong></p>
        <ul>
          <li><strong>Lei da Anistia (1979):</strong> Perdão aos crimes políticos de ambos os lados</li>
          <li><strong>Reforma partidária (1979):</strong> Fim do bipartidarismo</li>
          <li><strong>Diretas Já (1983-1984):</strong> Movimento popular pela volta das eleições diretas para presidente</li>
          <li><strong>Eleição indireta de Tancredo Neves (1985):</strong> Marco do fim do regime militar</li>
          <li><strong>Posse de José Sarney:</strong> Devido à doença e morte de Tancredo, assumiu seu vice</li>
        </ul>
        
        <p><strong>Legado:</strong> Os efeitos da ditadura militar permanecem presentes na sociedade brasileira. Enquanto houve modernização em alguns setores, o período deixou como herança problemas como concentração de renda, endividamento público, cultura política autoritária, violência policial e feridas sociais ainda não completamente cicatrizadas. A Lei de Anistia, que impediu a punição dos crimes cometidos por agentes do Estado, continua sendo objeto de debates sobre justiça de transição.</p>
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
  
  // Temas de Português/Literatura
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
  
  // Temas de Ensino Religioso
  else if (materia === 'Ensino Religioso') {
    if (temaLowerCase.includes('religiões do mundo') || temaLowerCase.includes('religioes do mundo')) {
      return `
        <p>As religiões do mundo representam diversos sistemas de crenças, práticas e tradições que diferentes sociedades desenvolveram para entender questões fundamentais sobre a existência, o sagrado e a moralidade. Apesar da grande diversidade, as religiões compartilham elementos como narrativas mitológicas, símbolos, rituais e códigos éticos.</p>
        
        <p><strong>Principais tradições religiosas:</strong></p>
        <ul>
          <li><strong>Cristianismo:</strong> Religião abraâmica baseada na vida e ensinamentos de Jesus Cristo. Dividida em denominações como Catolicismo, Ortodoxia e Protestantismo, tem cerca de 2,4 bilhões de seguidores.</li>
          <li><strong>Islamismo:</strong> Religião monoteísta seguindo os ensinamentos do profeta Maomé e o Alcorão. Divide-se principalmente entre Sunitas e Xiitas, com aproximadamente 1,9 bilhão de seguidores.</li>
          <li><strong>Hinduísmo:</strong> Um conjunto diversificado de tradições, filosofias e práticas originárias da Índia. Reconhece múltiplas manifestações divinas e ciclos de reencarnação, com cerca de 1,2 bilhão de seguidores.</li>
          <li><strong>Budismo:</strong> Sistema filosófico-religioso baseado nos ensinamentos de Sidarta Gautama (Buda). Foca no desenvolvimento espiritual e libertação do sofrimento, com aproximadamente 500 milhões de seguidores.</li>
          <li><strong>Judaísmo:</strong> Religião monoteísta do povo judeu, baseada na Torá, enfatizando a relação entre Deus e o povo de Israel, com cerca de 15 milhões de seguidores.</li>
          <li><strong>Religiões tradicionais africanas:</strong> Conjunto diverso de crenças indígenas da África, caracterizadas por culto aos antepassados, animismo e tradições orais.</li>
          <li><strong>Religiões indígenas:</strong> Sistemas de crenças de povos nativos das Américas, Oceania e outras regiões, frequentemente ligadas à natureza e ancestralidade.</li>
        </ul>
        
        <p><strong>Elementos comuns entre religiões:</strong></p>
        <ul>
          <li>Crenças sobre o divino ou sagrado</li>
          <li>Textos ou tradições sagradas</li>
          <li>Práticas rituais e celebrações</li>
          <li>Comunidades de praticantes</li>
          <li>Códigos morais e éticos</li>
          <li>Conceitos sobre vida após a morte</li>
        </ul>
        
        <p>O estudo comparativo das religiões permite compreender como diferentes culturas abordam questões universais, promovendo o diálogo inter-religioso e a compreensão mútua em um mundo cada vez mais diverso e interconectado.</p>
      `;
    }
    
    if (temaLowerCase.includes('ética') || temaLowerCase.includes('valores')) {
      return `
        <p>A ética e os valores são fundamentais para as tradições religiosas ao redor do mundo, fornecendo orientações sobre como viver uma vida boa e virtuosa. Embora cada religião apresente seu próprio conjunto de princípios éticos, existem notáveis convergências em valores fundamentais que transcendem fronteiras culturais e teológicas.</p>
        
        <p><strong>Valores compartilhados entre tradições religiosas:</strong></p>
        <ul>
          <li><strong>Compaixão:</strong> Presente em praticamente todas as religiões, significa reconhecer o sofrimento alheio e agir para aliviá-lo. No budismo, é um valor central; no cristianismo, exemplificado pelo "amar ao próximo"; no judaísmo e islamismo, através da caridade obrigatória.</li>
          <li><strong>Justiça:</strong> Um princípio universal que abrange equidade, direitos humanos e responsabilidade social. Nas tradições abraâmicas, é vista como atributo divino e dever humano.</li>
          <li><strong>Honestidade:</strong> Valorizada em todas as tradições como base da confiança social e integridade pessoal.</li>
          <li><strong>Respeito pela vida:</strong> Expresso de várias formas, desde o "não matarás" judeu-cristão até o conceito de "ahimsa" (não-violência) no hinduísmo, jainismo e budismo.</li>
          <li><strong>Humildade:</strong> Contraponto ao orgulho e arrogância, presente em ensinamentos religiosos como caminho para o autoconhecimento e relacionamento adequado com o divino.</li>
        </ul>
        
        <p><strong>Aplicação prática nas religiões:</strong></p>
        <ul>
          <li><strong>Cristianismo:</strong> Expressa ética através do amor a Deus e ao próximo, como nas Bem-aventuranças e na Regra de Ouro.</li>
          <li><strong>Islamismo:</strong> Estabelece valores por meio dos Cinco Pilares e do conceito de adab (comportamento apropriado).</li>
          <li><strong>Judaísmo:</strong> Articula ética através dos 613 mandamentos (mitzvot) e princípios de justiça social.</li>
          <li><strong>Hinduísmo:</strong> Desenvolve valores através do conceito de dharma (dever) e karma (consequência de ações).</li>
          <li><strong>Budismo:</strong> Orienta comportamento ético pelo Caminho Óctuplo e Cinco Preceitos.</li>
        </ul>
        
        <p>Na educação contemporânea, o estudo da ética religiosa contribui para a formação cidadã, promovendo diálogo inter-religioso, compreensão cultural e desenvolvimento de valores universais que transcendem diferenças teológicas.</p>
      `;
    }
    
    if (temaLowerCase.includes('textos sagrados') || temaLowerCase.includes('livros sagrados')) {
      return `
        <p>Os textos sagrados são documentos de importância fundamental para as tradições religiosas, considerados por seus devotos como contendo sabedoria divina, ensinamentos espirituais e orientações éticas. Estes textos variam em formato, incluindo livros, poemas, cânticos, narrativas orais posteriormente transcritas e compilações de leis e preceitos.</p>
        
        <p>A autoridade atribuída a estes textos varia entre as religiões, desde aquelas que os consideram diretamente inspirados ou revelados pela divindade até tradições que os veem como expressões humanas de sabedoria espiritual. O estudo destes textos frequentemente envolve complexas tradições de interpretação e comentário.</p>
        
        <p><strong>Principais textos sagrados nas tradições religiosas:</strong></p>
        <ul>
          <li><strong>Cristianismo:</strong> A Bíblia, dividida em Antigo Testamento (compartilhado com o judaísmo) e Novo Testamento (contendo os Evangelhos, Atos dos Apóstolos, Epístolas e Apocalipse).</li>
          <li><strong>Judaísmo:</strong> A Torá (os cinco primeiros livros do Antigo Testamento), o Tanakh (Bíblia Hebraica completa) e textos interpretativos como o Talmude e a Mishná.</li>
          <li><strong>Islamismo:</strong> O Alcorão, considerado a palavra literal de Deus revelada ao profeta Maomé, e os Hadith, relatos dos ditos e ações do profeta.</li>
          <li><strong>Hinduísmo:</strong> Os Vedas (textos mais antigos), Upanishads (textos filosóficos), Bhagavad Gita (parte do épico Mahabharata), Puranas e Ramayana.</li>
          <li><strong>Budismo:</strong> O Tripitaka (Três Cestos) no budismo Theravada, que inclui o Vinaya Pitaka (regras monásticas), Sutta Pitaka (discursos do Buda) e Abhidhamma Pitaka (análises filosóficas). Diferentes sutras são enfatizados nas tradições Mahayana e Vajrayana.</li>
          <li><strong>Sikhismo:</strong> O Guru Granth Sahib, uma coleção de hinos escritos pelos gurus sikhs e outros santos.</li>
          <li><strong>Jainismo:</strong> Os Agamas e a literatura canônica jainista, preservando os ensinamentos de Mahavira.</li>
          <li><strong>Zoroastrismo:</strong> O Avesta, incluindo o Yasna com os Gathas (hinos atribuídos a Zaratustra).</li>
          <li><strong>Confucionismo:</strong> Os Cinco Clássicos e os Quatro Livros, incluindo os Analectos de Confúcio.</li>
          <li><strong>Taoísmo:</strong> O Tao Te Ching atribuído a Lao Tsé e o Zhuangzi.</li>
        </ul>
        
        <p><strong>Abordagens interpretativas:</strong></p>
        <ul>
          <li><strong>Literalismo:</strong> Interpretação das escrituras como literalmente verdadeiras em todos os aspectos.</li>
          <li><strong>Contextualismo:</strong> Considera o contexto histórico e cultural em que os textos foram produzidos.</li>
          <li><strong>Interpretação alegórica:</strong> Busca significados simbólicos além do sentido literal.</li>
          <li><strong>Hermenêutica:</strong> Métodos formais de interpretação textual desenvolvidos por tradições religiosas.</li>
          <li><strong>Estudos críticos:</strong> Abordagem acadêmica que analisa textos usando métodos históricos, literários e arqueológicos.</li>
        </ul>
        
        <p>O estudo comparativo dos textos sagrados revela tanto diferenças quanto surpreendentes similaridades entre tradições religiosas, oferecendo insights sobre valores humanos universais e diversas compreensões da realidade espiritual.</p>
      `;
    }
  }
  
  // Temas de Astronomia
  else if (materia === 'Astronomia') {
    if (temaLowerCase.includes('sistema solar')) {
      return `
        <p>O Sistema Solar é o conjunto formado pelo Sol e todos os corpos celestes que orbitam ao seu redor devido à sua força gravitacional. Localizado na Via Láctea, nossa galáxia, o Sistema Solar se formou há aproximadamente 4,6 bilhões de anos a partir de uma nuvem de gás e poeira em colapso gravitacional.</p>
        
        <p><strong>Estrutura do Sistema Solar:</strong></p>
        <ul>
          <li><strong>Sol:</strong> Estrela central que contém mais de 99,8% da massa total do Sistema Solar. É uma estrela de tipo G da sequência principal, produzindo energia através da fusão nuclear de hidrogênio em hélio.</li>
          <li><strong>Planetas:</strong> Oito corpos celestes principais que orbitam o Sol: Mercúrio, Vênus, Terra, Marte (planetas rochosos/terrestres) e Júpiter, Saturno, Urano, Netuno (planetas gasosos/jovianos).</li>
          <li><strong>Planetas anões:</strong> Corpos como Plutão, Ceres, Haumea, Makemake e Eris, que orbitam o Sol e têm massa suficiente para serem aproximadamente esféricos, mas não limparam suas órbitas de outros objetos.</li>
          <li><strong>Luas:</strong> Mais de 200 satélites naturais orbitando os planetas e planetas anões.</li>
          <li><strong>Asteroides:</strong> Corpos rochosos menores, principalmente concentrados no Cinturão de Asteroides entre Marte e Júpiter.</li>
          <li><strong>Cometas:</strong> Corpos gelados que desenvolvem caudas quando se aproximam do Sol, originários principalmente da Nuvem de Oort e do Cinturão de Kuiper.</li>
          <li><strong>Meteoroides:</strong> Pequenos fragmentos rochosos ou metálicos que, ao entrarem na atmosfera terrestre, produzem meteoros (estrelas cadentes) e, se atingirem a superfície, meteoritos.</li>
          <li><strong>Poeira interplanetária:</strong> Partículas microscópicas que preenchem o espaço entre os planetas.</li>
        </ul>
        
        <p><strong>Características notáveis:</strong></p>
        <ul>
          <li>A maioria dos planetas, luas e asteroides orbita o Sol no mesmo sentido (anti-horário visto do norte) e aproximadamente no mesmo plano orbital (eclíptica).</li>
          <li>As órbitas planetárias são elípticas, seguindo as leis de Kepler.</li>
          <li>O Sistema Solar está em constante movimento – o Sol orbita o centro da Via Láctea a cada 225-250 milhões de anos.</li>
          <li>A região mais externa do Sistema Solar é delimitada pela heliopausa, onde o vento solar encontra o meio interestelar.</li>
        </ul>
        
        <p>O estudo do Sistema Solar continua revelando novos corpos celestes e aprofundando nossa compreensão sobre a formação e evolução dos sistemas planetários, fundamentais para entender nosso lugar no universo.</p>
      `;
    }
    
    if (temaLowerCase.includes('cosmologia') || temaLowerCase.includes('universo')) {
      return `
        <p>A Cosmologia é o estudo científico da origem, evolução, estrutura e destino final do Universo como um todo. Esta área combina física teórica, astrofísica observacional e filosofia para construir modelos que expliquem nosso cosmos em grande escala.</p>
        
        <p><strong>O Big Bang e a expansão do Universo:</strong></p>
        <p>A teoria do Big Bang é o modelo cosmológico predominante, propondo que o Universo teve início há aproximadamente 13,8 bilhões de anos, a partir de um estado extremamente quente e denso. Evidências como a expansão do Universo, a radiação cósmica de fundo e a abundância de elementos leves dão forte suporte a esta teoria.</p>
        <p>O astrônomo Edwin Hubble descobriu em 1929 que as galáxias estão se afastando umas das outras, indicando que o Universo está em expansão. Observações posteriores revelaram que esta expansão está acelerando, possivelmente devido à influência de uma misteriosa energia escura.</p>
        
        <p><strong>Estrutura em larga escala do Universo:</strong></p>
        <ul>
          <li><strong>Galáxias:</strong> Vastos sistemas estelares contendo bilhões de estrelas, poeira e gás. A Via Láctea é nossa galáxia, com aproximadamente 100-400 bilhões de estrelas.</li>
          <li><strong>Aglomerados de galáxias:</strong> Grupos de dezenas a milhares de galáxias unidas pela gravidade.</li>
          <li><strong>Superaglomerados:</strong> Vastas coleções de aglomerados de galáxias formando algumas das maiores estruturas conhecidas.</li>
          <li><strong>Filamentos e vazios cósmicos:</strong> O Universo apresenta uma estrutura semelhante a uma "teia cósmica", com galáxias concentradas em filamentos que cercam enormes vazios.</li>
        </ul>
        
        <p><strong>Matéria e energia do Universo:</strong></p>
        <p>As observações cosmológicas sugerem uma composição surpreendente do Universo:</p>
        <ul>
          <li><strong>Energia escura:</strong> Aproximadamente 68% do conteúdo do Universo, responsável pela aceleração da expansão cósmica.</li>
          <li><strong>Matéria escura:</strong> Cerca de 27%, detectada apenas por seus efeitos gravitacionais, não interage com a luz.</li>
          <li><strong>Matéria normal (bariônica):</strong> Apenas 5%, constituindo tudo o que podemos ver ou detectar diretamente.</li>
        </ul>
        
        <p><strong>Questões fundamentais:</strong></p>
        <p>A cosmologia moderna ainda enfrenta grandes questões não resolvidas:</p>
        <ul>
          <li>O que aconteceu nos primeiros instantes após o Big Bang?</li>
          <li>Qual é a natureza da matéria escura e da energia escura?</li>
          <li>O Universo é infinito ou finito?</li>
          <li>Qual será o destino final do Universo?</li>
          <li>Existem múltiplos universos (multiverso)?</li>
        </ul>
        
        <p>A cosmologia continua evoluindo com novas observações e teorias, mostrando como nossa compreensão do Universo está em constante refinamento, enquanto buscamos respostas para algumas das questões mais profundas da existência.</p>
      `;
    }
    
    if (temaLowerCase.includes('exploração espacial') || temaLowerCase.includes('exploracao espacial') || temaLowerCase.includes('astronáutica')) {
      return `
        <p>A exploração espacial representa o conjunto de esforços humanos para investigar corpos celestes além da Terra, utilizando tecnologias como foguetes, satélites, sondas espaciais e naves tripuladas. Iniciada no contexto da Guerra Fria como uma competição entre superpotências, evoluiu para uma colaboração internacional científica que tem expandido significativamente nossa compreensão do universo.</p>
        
        <p><strong>Marcos históricos da exploração espacial:</strong></p>
        <ul>
          <li><strong>Era dos pioneiros (1940s-1950s):</strong> 
            <ul>
              <li>Desenvolvimento dos primeiros foguetes V-2 durante a Segunda Guerra Mundial</li>
              <li>Lançamento do Sputnik 1 (1957), primeiro satélite artificial, pela União Soviética</li>
              <li>Criação da NASA (1958) pelos Estados Unidos</li>
              <li>Missão Vostok 1 (1961) com Yuri Gagarin, primeiro ser humano no espaço</li>
            </ul>
          </li>
          <li><strong>Corrida Espacial (1960s-1970s):</strong>
            <ul>
              <li>Programa Mercury: primeiros astronautas americanos no espaço</li>
              <li>Programa Gemini: desenvolvimento de técnicas de encontro espacial</li>
              <li>Programa Apollo: missões Apollo 11-17 levando humanos à Lua (1969-1972)</li>
              <li>Primeiras estações espaciais: Salyut (URSS) e Skylab (EUA)</li>
            </ul>
          </li>
          <li><strong>Era da exploração robótica (1970s-presente):</strong>
            <ul>
              <li>Sondas Voyager 1 e 2 (1977): exploraram planetas exteriores e continuam em operação no espaço interestelar</li>
              <li>Mars Pathfinder (1997): primeiro rover em Marte</li>
              <li>Telescópio Espacial Hubble (1990-presente): revolucionou nossa visão do cosmos</li>
              <li>Curiosity e Perseverance: rovers avançados em Marte</li>
              <li>New Horizons: primeira sonda a explorar Plutão (2015)</li>
              <li>Telescópio Espacial James Webb (2021): sucessor do Hubble</li>
            </ul>
          </li>
          <li><strong>Cooperação internacional (1990s-presente):</strong>
            <ul>
              <li>Estação Espacial Internacional (desde 1998): projeto colaborativo de 15 países</li>
              <li>Missões comerciais: SpaceX, Blue Origin, Virgin Galactic</li>
              <li>Parcerias internacionais para missões lunares e marcianas</li>
            </ul>
          </li>
        </ul>
        
        <p><strong>Tecnologias e desafios da exploração espacial:</strong></p>
        <ul>
          <li><strong>Propulsão:</strong> Sistemas químicos convencionais, propulsão iônica, velas solares e conceitos avançados como propulsão nuclear</li>
          <li><strong>Suporte à vida:</strong> Sistemas para manter humanos em ambientes extraterrestres hostis</li>
          <li><strong>Radiação espacial:</strong> Proteção contra radiação solar e cósmica</li>
          <li><strong>Efeitos fisiológicos:</strong> Microgravidade causando perda óssea e muscular em astronautas</li>
          <li><strong>Comunicações:</strong> Transmissão de dados através de vastas distâncias espaciais</li>
          <li><strong>Custos:</strong> Desenvolvimento de tecnologias mais acessíveis para democratizar o acesso ao espaço</li>
        </ul>
        
        <p><strong>Futuro da exploração espacial:</strong></p>
        <ul>
          <li>Missões tripuladas a Marte previstas para as próximas décadas</li>
          <li>Estabelecimento de bases permanentes na Lua (Programa Artemis)</li>
          <li>Mineração de asteroides e utilização de recursos espaciais</li>
          <li>Telescópios espaciais cada vez mais poderosos para procurar exoplanetas habitáveis</li>
          <li>Turismo espacial e comercialização da órbita baixa terrestre</li>
          <li>Missões para investigar os oceanos subsuperficiais de luas como Europa e Encélado, buscando vida extraterrestre</li>
        </ul>
        
        <p>A exploração espacial continua sendo uma das maiores aventuras da humanidade, combinando desafios tecnológicos, descobertas científicas e aspirações filosóficas sobre nosso lugar no cosmos.</p>
      `;
    }
  }
  
  // Temas de Artes
  else if (materia === 'Artes') {
    if (temaLowerCase.includes('história da arte') || temaLowerCase.includes('movimentos artísticos') || temaLowerCase.includes('movimentos artisticos')) {
      return `
        <p>A História da Arte é o estudo da evolução das expressões artísticas humanas através do tempo, desde as pinturas rupestres pré-históricas até as formas contemporâneas digitais e conceituais. Os movimentos artísticos representam tendências estéticas, filosóficas e culturais que caracterizam diferentes períodos históricos.</p>
        
        <p><strong>Principais períodos e movimentos artísticos:</strong></p>
        <ul>
          <li><strong>Arte Pré-histórica (35.000-2.500 a.C.):</strong> Primeiras expressões artísticas humanas, incluindo pinturas rupestres em cavernas (Lascaux, Altamira), esculturas e monumentos megalíticos (Stonehenge).</li>
          
          <li><strong>Arte Antiga (3.500 a.C.-500 d.C.):</strong> Desenvolvimentos nas civilizações egípcia (arte monumental, hierática), mesopotâmica, grega (ideal de beleza, proporção) e romana (realismo, pragmatismo).</li>
          
          <li><strong>Arte Medieval (500-1400):</strong> Arte Bizantina (mosaicos, ícones), Românica (arquitetura maciça, esculturas) e Gótica (catedrais com vitrais, verticalidade).</li>
          
          <li><strong>Renascimento (1400-1600):</strong> Redescoberta dos ideais clássicos, desenvolvimento da perspectiva, humanismo. Artistas como Leonardo da Vinci, Michelangelo e Rafael.</li>
          
          <li><strong>Barroco e Rococó (1600-1750):</strong> Drama, movimento, contraste luz/som (Caravaggio, Rembrandt, Bernini); seguido pelo Rococó mais leve e decorativo.</li>
          
          <li><strong>Neoclassicismo e Romantismo (1750-1850):</strong> Retorno à clareza clássica versus expressão emocional e sublime do Romantismo.</li>
          
          <li><strong>Realismo e Impressionismo (1850-1900):</strong> Foco em temas cotidianos, classe trabalhadora (Courbet, Millet); Impressionistas (Monet, Renoir) capturando luz e momento.</li>
          
          <li><strong>Movimentos modernos (1900-1970):</strong>
            <ul>
              <li>Expressionismo: Emoção sobre aparência (Munch, Kandinsky)</li>
              <li>Cubismo: Múltiplas perspectivas simultâneas (Picasso, Braque)</li>
              <li>Dadaísmo e Surrealismo: Anti-arte e exploração do inconsciente (Duchamp, Dalí)</li>
              <li>Abstracionismo: Abandono da representação figurativa (Mondrian, Malevich)</li>
              <li>Expressionismo Abstrato: Técnicas espontâneas, pintura gestual (Pollock, Rothko)</li>
              <li>Pop Art: Apropriação de imagens da cultura popular (Warhol, Lichtenstein)</li>
            </ul>
          </li>
          
          <li><strong>Arte Contemporânea (1970-presente):</strong> Diversidade de abordagens, incluindo arte conceitual, instalação, performance, arte digital, video art, e práticas pós-modernas que questionam fronteiras e definições tradicionais.</li>
        </ul>
        
        <p><strong>Importância do estudo da História da Arte:</strong></p>
        <ul>
          <li>Proporciona compreensão cultural e histórica das sociedades através das suas expressões visuais</li>
          <li>Desenvolve capacidade crítica e analítica ao interpretar imagens e objetos artísticos</li>
          <li>Revela conexões entre arte, política, religião, tecnologia e transformações sociais</li>
          <li>Oferece inspiração e contexto para artistas contemporâneos</li>
          <li>Preserva e valoriza o patrimônio cultural material e imaterial da humanidade</li>
        </ul>
        
        <p>A arte continua sendo um reflexo das preocupações, ideais e experiências humanas, sempre se transformando para dialogar com seu tempo, enquanto mantém conexões com tradições e inovações do passado.</p>
      `;
    }
    
    if (temaLowerCase.includes('artes visuais') || temaLowerCase.includes('pintura') || temaLowerCase.includes('escultura')) {
      return `
        <p>As Artes Visuais constituem uma das mais antigas e diversas formas de expressão humana, abrangendo a criação de obras que são primariamente visuais em natureza. Esta ampla categoria inclui desde técnicas tradicionais como pintura e escultura até formas contemporâneas como instalação, performance e arte digital.</p>
        
        <p><strong>Elementos fundamentais das Artes Visuais:</strong></p>
        <ul>
          <li><strong>Linha:</strong> O caminho visível criado pelo movimento de um ponto, definindo formas, contornos e direções.</li>
          <li><strong>Forma:</strong> Objetos bidimensionais (formas) ou tridimensionais (volumes) criados quando linhas se encontram.</li>
          <li><strong>Espaço:</strong> A área tridimensional em que objetos existem, ou a ilusão de profundidade em obras bidimensionais.</li>
          <li><strong>Cor:</strong> Resultado da luz refletida, com propriedades de matiz (tipo de cor), saturação (intensidade) e valor (luminosidade).</li>
          <li><strong>Textura:</strong> Qualidade tátil, real ou simulada, de uma superfície.</li>
          <li><strong>Valor:</strong> A luminosidade ou escuridão de cores e tons, criando contraste.</li>
        </ul>
        
        <p><strong>Principais disciplinas das Artes Visuais:</strong></p>
        <ul>
          <li><strong>Desenho:</strong> A base da maioria das práticas artísticas, usando linhas e valores para criar imagens.</li>
          <li><strong>Pintura:</strong> Aplicação de pigmentos líquidos coloridos a superfícies, usando materiais como óleo, acrílico, aquarela, guache, têmpera.</li>
          <li><strong>Escultura:</strong> Criação de formas tridimensionais através de processos aditivos (modelagem), subtrativos (talha) ou construtivos (assemblage).</li>
          <li><strong>Gravura:</strong> Criação de imagens através da transferência de desenhos de matrizes para papel ou outros suportes.</li>
          <li><strong>Fotografia:</strong> Captação de imagens através de processos que utilizam luz e materiais fotossensíveis ou tecnologia digital.</li>
          <li><strong>Cerâmica:</strong> Modelagem e queima de argila para criar objetos funcionais ou escultóricos.</li>
          <li><strong>Instalação:</strong> Obras que transformam o espaço e frequentemente envolvem múltiplos meios, criando ambientes imersivos.</li>
          <li><strong>Arte digital:</strong> Criação usando tecnologias como computadores, realidade virtual e aumentada, e diversos softwares.</li>
        </ul>
        
        <p><strong>Abordagens contemporâneas:</strong></p>
        <ul>
          <li><strong>Arte conceitual:</strong> Prioriza ideias e conceitos sobre a estética formal.</li>
          <li><strong>Performance:</strong> Utiliza o corpo do artista como meio, frequentemente combinado com elementos visuais.</li>
          <li><strong>Arte socialmente engajada:</strong> Aborda questões sociais, políticas e ambientais, frequentemente envolvendo comunidades.</li>
          <li><strong>Arte interativa:</strong> Requer participação ativa do espectador para completar a obra.</li>
          <li><strong>Arte multimídia:</strong> Combina diversos meios visuais com som, movimento e tecnologia.</li>
        </ul>
        
        <p>As artes visuais continuam evoluindo, incorporando novas tecnologias e respondendo a questões contemporâneas, enquanto mantêm conexões com técnicas e tradições milenares. Através delas, artistas exploram a percepção, comunicam ideias complexas e convidam à reflexão sobre a experiência humana.</p>
      `;
    }
    
    if (temaLowerCase.includes('música') || temaLowerCase.includes('musica') || temaLowerCase.includes('teoria musical')) {
      return `
        <p>A música é uma forma de expressão artística que utiliza sons organizados no tempo, combinando elementos como melodia, harmonia, ritmo, timbre e forma. Presente em todas as culturas conhecidas, a música atua como linguagem universal, capaz de transmitir emoções, ideias e identidades culturais sem necessariamente recorrer a palavras.</p>
        
        <p><strong>Elementos fundamentais da música:</strong></p>
        <ul>
          <li><strong>Melodia:</strong> Sequência de notas que formam uma linha musical reconhecível, o elemento mais imediatamente identificável de uma composição.</li>
          <li><strong>Harmonia:</strong> Combinação simultânea de notas que formam acordes e progressões, criando o "tecido" sonoro que sustenta a melodia.</li>
          <li><strong>Ritmo:</strong> Organização temporal dos sons, definindo padrões de duração e acentuação que dão movimento à música.</li>
          <li><strong>Timbre:</strong> Qualidade sonora que permite distinguir diferentes instrumentos ou vozes tocando a mesma nota.</li>
          <li><strong>Dinâmica:</strong> Variações de intensidade (volume) que criam contrastes expressivos.</li>
          <li><strong>Textura:</strong> Relação entre as diferentes vozes ou linhas musicais (monofonia, polifonia, homofonia).</li>
          <li><strong>Forma:</strong> Estrutura organizacional da música, como a sonata, rondó, tema e variações.</li>
        </ul>
        
        <p><strong>Desenvolvimento histórico na tradição ocidental:</strong></p>
        <ul>
          <li><strong>Música medieval (500-1400):</strong> Canto gregoriano, desenvolvimento da notação musical, polifonia inicial.</li>
          <li><strong>Renascença (1400-1600):</strong> Refinamento da polifonia, música vocal a cappella, madrigais.</li>
          <li><strong>Barroco (1600-1750):</strong> Contraponto elaborado, desenvolvimento da ópera, concerto e baixo contínuo.</li>
          <li><strong>Clássico (1750-1820):</strong> Formas equilibradas, sonata, sinfonias e música de câmara (Mozart, Haydn, Beethoven).</li>
          <li><strong>Romântico (1820-1900):</strong> Expressão emocional intensificada, virtuosismo, música programática.</li>
          <li><strong>Modernismo (1900-1950):</strong> Ruptura com a tonalidade tradicional, experimentação com atonalidade, dodecafonismo.</li>
          <li><strong>Contemporâneo (1950-presente):</strong> Pluralidade de estilos, música eletrônica, minimalismo, fusões interculturais.</li>
        </ul>
        
        <p><strong>Tradições musicais não-ocidentais:</strong></p>
        <ul>
          <li><strong>Música indiana:</strong> Sistema de ragas e talas, improvisação estruturada.</li>
          <li><strong>Música chinesa:</strong> Pentatonismo, instrumentos tradicionais como erhu e guqin.</li>
          <li><strong>Música africana:</strong> Complexidade rítmica, tradição de percussão, música comunitária.</li>
          <li><strong>Música árabe:</strong> Sistema de maqamat, ornamentação melódica elaborada.</li>
          <li><strong>Música japonesa:</strong> Conceitos de ma (espaço/silêncio), instrumentos como koto e shakuhachi.</li>
        </ul>
        
        <p><strong>Música popular e contemporânea:</strong></p>
        <ul>
          <li><strong>Jazz:</strong> Improvisação, swing, blues, bebop, fusion</li>
          <li><strong>Rock:</strong> Do rock'n'roll às múltiplas vertentes como punk, metal, alternativo</li>
          <li><strong>Música eletrônica:</strong> Techno, house, ambient, experimental</li>
          <li><strong>Hip-hop:</strong> Rap, sampling, beatmaking, cultura urbana</li>
          <li><strong>World Music:</strong> Fusões de tradições musicais globais</li>
        </ul>
        
        <p>A música continua evoluindo através de inovações tecnológicas, fusões culturais e experimentações, mantendo seu papel fundamental na expressão humana e na construção de comunidades. Seja como experiência estética, prática cultural ou ferramenta terapêutica, a música permanece uma das formas mais poderosas e acessíveis de arte.</p>
      `;
    }
  }
  
  // Se não houver conteúdo específico para o tema, retorna null
  return null;
};

// Funções para detalhar cada seção do guia de estudos
export const getBasicConcepts = (materia: string, tema: string): string => {
  return `Compreensão abrangente dos princípios básicos de ${tema.toLowerCase()}, incluindo definições fundamentais, contexto histórico inicial e estruturas conceituais que servem como fundamento para todo o estudo posterior. Esta fase estabelece a linguagem comum e os conceitos essenciais para avançar no conhecimento específico, permitindo que você construa uma base sólida antes de explorar aspectos mais complexos.`;
};

export const getEssentialTerminology = (materia: string, tema: string): string => {
  return `Domínio do vocabulário técnico e específico relacionado a ${tema.toLowerCase()}, incluindo etimologia dos termos, variações contextuais e evolução histórica da terminologia na área. A familiaridade com estes termos específicos é crucial para a comunicação precisa dentro do campo de estudo, permitindo não apenas entender textos especializados, mas também expressar ideias com clareza e precisão científica.`;
};

export const getIntermediateConcepts = (materia: string, tema: string): string => {
  return `Estudo detalhado de conceitos mais complexos relacionados a ${tema.toLowerCase()}, incluindo teorias secundárias, debates contemporâneos e nuances que expandem a compreensão básica para níveis mais sofisticados. Neste estágio, você começa a perceber as interconexões entre diferentes aspectos do tema, desenvolvendo um entendimento mais profundo das complexidades e contradições dentro da área de conhecimento.`;
};

export const getPracticalApplications = (materia: string, tema: string): string => {
  return `Implementação prática dos conhecimentos teóricos em contextos reais, resolvendo problemas de complexidade média relacionados a ${tema.toLowerCase()} e desenvolvendo habilidades aplicadas. A transição da teoria para a prática permite visualizar a relevância do conhecimento adquirido, experimentar diferentes abordagens metodológicas e desenvolver competências técnicas específicas que são valorizadas em ambientes acadêmicos e profissionais.`;
};

export const getConnections = (materia: string, tema: string): string => {
  return `Análise das interconexões entre ${tema.toLowerCase()} e outros tópicos relevantes da ${materia.toLowerCase()}, estabelecendo um mapa conceitual integrado que permite uma visão holística da disciplina. Esta perspectiva interdisciplinar revela como diferentes áreas de conhecimento se influenciam mutuamente, proporcionando insights inovadores e uma compreensão mais rica e contextualizada sobre o tema em estudo.`;
};

export const getCriticalAnalysis = (materia: string, tema: string): string => {
  return `Desenvolvimento da capacidade de avaliar criticamente teorias, evidências e argumentos relacionados a ${tema.toLowerCase()}, identificando premissas, questionando metodologias e formulando contra-argumentos fundamentados. Esta abordagem analítica incentiva o pensamento independente, a capacidade de distinguir fatos de opiniões e a habilidade de considerar múltiplas perspectivas antes de chegar a conclusões, competências essenciais tanto no ambiente acadêmico quanto na vida profissional.`;
};

export const getSpecialization = (materia: string, tema: string): string => {
  return `Foco em subcampos específicos de ${tema.toLowerCase()}, explorando áreas de nicho que representam as fronteiras do conhecimento atual e exigem especialização avançada. A especialização permite aprofundar aspectos particulares que despertam maior interesse ou têm relevância estratégica para sua formação, desenvolvendo expertise diferenciada em temas que estão na vanguarda da pesquisa ou que apresentam aplicações inovadoras no mundo contemporâneo.`;
};

export const getRealWorldApplications = (materia: string, tema: string): string => {
  return `Análise de como ${tema.toLowerCase()} é aplicado em contextos profissionais e acadêmicos avançados, incluindo estudos de caso reais, implementações industriais, inovações tecnológicas e aplicações multidisciplinares. Compreender estas aplicações práticas revela o impacto tangível do conhecimento teórico na sociedade, na economia e no desenvolvimento tecnológico, inspirando novas possibilidades de carreira e áreas de atuação profissional alinhadas com suas habilidades e interesses.`;
};

export const getRecommendedBooks = (materia: string, tema: string): string => {
  // Recomendações de livros por matéria
  switch (materia) {
    case 'História':
      return `"História Concisa de ${tema}" de autores especializados, "A Era das Revoluções" de Eric Hobsbawm, "Nova História Crítica" de Mario Schmidt, e obras específicas sobre ${tema.toLowerCase()} de historiadores renomados como Marc Bloch, Fernand Braudel e Jacques Le Goff, que oferecem diferentes perspectivas historiográficas e metodológicas para uma compreensão mais nuançada dos processos históricos.`;
    
    case 'Geografia':
      return `"Geografia Humana e Econômica" de Milton Santos, "Compreendendo ${tema}" de David Harvey, "Geografia: Pequena História Crítica" de Antonio Carlos Robert Moraes, e "Atlas de ${tema.toLowerCase()}" com cartografia e análises detalhadas, além de obras que abordam questões contemporâneas como globalização, meio ambiente e geopolítica, fundamentais para entender as transformações espaciais do mundo atual.`;
    
    case 'Matemática':
      return `"Fundamentos de ${tema}" de Ian Stewart, "A Matemática do Ensino Médio" (coleção do IMPA), "O Homem que Calculava" de Malba Tahan para uma abordagem lúdica, e livros-problema com exercícios graduados em dificuldade para prática extensiva, como a série "Desafios Matemáticos" e obras que contextualizam historicamente o desenvolvimento dos conceitos matemáticos em estudo.`;
    
    case 'Português':
      return `"Nova Gramática do Português Contemporâneo" de Celso Cunha e Lindley Cintra, "Texto e Interação" de William Cereja, "Português: Linguagens" de William Cereja e Thereza Cochar, e manuais específicos sobre ${tema.toLowerCase()} para aprofundamento, além de dicionários etimológicos e obras que exploram a riqueza da literatura como fonte de exemplos para análise linguística e estilística.`;
    
    case 'Física':
      return `"Curso de Física Básica" de H. Moysés Nussenzveig, "Física Conceitual" de Paul G. Hewitt para uma abordagem mais intuitiva, "Fundamentos de Física" de Halliday e Resnick para tratamento mais aprofundado de ${tema.toLowerCase()}, e obras de divulgação científica como as de Stephen Hawking e Michio Kaku que tornam acessíveis conceitos complexos de física moderna e contemporânea.`;

    case 'Química':
      return `"Química Geral" de John C. Kotz, "Princípios de Química" de Peter Atkins, "Química Orgânica" de Solomons para tópicos específicos de ${tema.toLowerCase()}, e "A Tabela Periódica" de Primo Levi que oferece uma perspectiva única sobre os elementos químicos, além de guias práticos de laboratório e obras que exploram as aplicações da química no cotidiano e na indústria.`;

    case 'Biologia':
      return `"Biologia" de Campbell, obra de referência abrangente, "Fundamentos da Biologia Moderna" de Amabis e Martho, "O Gene Egoísta" de Richard Dawkins para uma perspectiva evolutiva, e títulos específicos sobre ${tema.toLowerCase()} como os da coleção "Ciência Aberta", além de atlas de anatomia e fisiologia, e obras que discutem os avanços recentes em biotecnologia e suas implicações éticas.`;

    case 'Ensino Religioso':
      return `"História das Crenças e das Ideias Religiosas" de Mircea Eliade, "O Sagrado e o Profano" também de Eliade, "Tratado de História das Religiões" para uma visão antropológica, e obras específicas sobre ${tema.toLowerCase()} de autores como Karen Armstrong e Huston Smith, que abordam as tradições religiosas com respeito e profundidade, explorando seus fundamentos filosóficos e práticas culturais.`;

    case 'Astronomia':
      return `"Astronomia: Uma Visão Geral do Universo" de Kepler de Oliveira, "Cosmos" de Carl Sagan para uma introdução inspiradora, "Breve História do Tempo" de Stephen Hawking para conceitos de cosmologia, e obras especializadas em ${tema.toLowerCase()} da coleção "Fundamentos da Astronomia Moderna", além de guias de observação do céu e livros que exploram as mais recentes descobertas astronômicas e missões espaciais.`;

    case 'Artes':
      return `"História da Arte" de E.H. Gombrich, obra clássica e abrangente, "A Arte Moderna" de Giulio Carlo Argan para movimentos contemporâneos, "O Poder da Arte" de Simon Schama com abordagem narrativa envolvente, e livros específicos sobre ${tema.toLowerCase()} de autores como Ernst Fischer e Fayga Ostrower, que discutem tanto aspectos técnicos quanto filosóficos da criação artística em diferentes linguagens e períodos históricos.`;

    default:
      return `Obras fundamentais de referência sobre ${tema.toLowerCase()}, manuais técnicos atualizados e compêndios acadêmicos que abordam desde os fundamentos até aplicações avançadas do tema, complementados por textos de divulgação científica que tornam conceitos complexos mais acessíveis e por periódicos acadêmicos especializados que trazem as pesquisas mais recentes e discussões contemporâneas na área.`;
  }
};

/**
 * Retorna o URL de uma imagem temática baseada no assunto e tema
 */
export function getThematicImage(subject: string, topic: string): string | null {
  const topicLower = topic.toLowerCase();
  
  // Imagens para História
  if (subject === 'História') {
    // Idade Média
    if (topicLower.includes('idade média') || topicLower.includes('medieval') || topicLower.includes('feudalismo')) {
      return 'https://images.unsplash.com/photo-1599431238918-7d8f7f0cf0d1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Grécia Antiga
    if (topicLower.includes('grécia') || topicLower.includes('grecia antiga') || topicLower.includes('grego')) {
      return 'https://images.unsplash.com/photo-1603566541830-a1b70c67cb12?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Roma Antiga
    if (topicLower.includes('roma') || topicLower.includes('império romano') || topicLower.includes('romanos')) {
      return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2796&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Revolução Francesa
    if (topicLower.includes('revolução francesa') || topicLower.includes('frança revolucionária')) {
      return 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Segunda Guerra Mundial
    if (topicLower.includes('segunda guerra') || topicLower.includes('guerra mundial') || topicLower.includes('nazismo')) {
      return 'https://images.unsplash.com/photo-1541863141-dea510626619?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Pré-história
    if (topicLower.includes('pré-história') || topicLower.includes('pre historia') || topicLower.includes('período paleolítico')) {
      return 'https://images.unsplash.com/photo-1598524374912-8d7a9d9a6b8d?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Brasil Colônia
    if (topicLower.includes('brasil colônia') || topicLower.includes('período colonial') || topicLower.includes('colonização do brasil')) {
      return 'https://images.unsplash.com/photo-1544989163-df6cdad91d03?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de História
    return 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Imagens para Geografia
  if (subject === 'Geografia') {
    // Clima e vegetação
    if (topicLower.includes('clima') || topicLower.includes('vegetação') || topicLower.includes('biomas')) {
      return 'https://images.unsplash.com/photo-1543964198-d54e4f2a356d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Globalização
    if (topicLower.includes('globalização') || topicLower.includes('economia global')) {
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Urbanização
    if (topicLower.includes('urbanização') || topicLower.includes('cidades') || topicLower.includes('urbano')) {
      return 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de Geografia
    return 'https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Imagens para Ciências/Biologia
  if (subject === 'Ciências' || subject === 'Biologia') {
    // Corpo humano
    if (topicLower.includes('corpo humano') || topicLower.includes('anatomia') || topicLower.includes('sistema')) {
      return 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Ecologia
    if (topicLower.includes('ecologia') || topicLower.includes('meio ambiente') || topicLower.includes('ecossistema')) {
      return 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Genética
    if (topicLower.includes('genética') || topicLower.includes('dna') || topicLower.includes('genes')) {
      return 'https://images.unsplash.com/photo-1607360288331-64f89bb89b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de Ciências/Biologia
    return 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Imagens para Ensino Religioso
  if (subject === 'Ensino Religioso') {
    // Religiões do mundo
    if (topicLower.includes('religião') || topicLower.includes('religiões') || topicLower.includes('tradições religiosas')) {
      return 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Ética e valores
    if (topicLower.includes('ética') || topicLower.includes('valores') || topicLower.includes('moral')) {
      return 'https://images.unsplash.com/photo-1604882355705-d4865c150c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de Ensino Religioso
    return 'https://images.unsplash.com/photo-1556202555-c0c2e95ca84f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Imagens para Astronomia
  if (subject === 'Astronomia') {
    // Sistema Solar
    if (topicLower.includes('sistema solar') || topicLower.includes('planetas')) {
      return 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Cosmos e universo
    if (topicLower.includes('universo') || topicLower.includes('cosmos') || topicLower.includes('galáxia') || topicLower.includes('cosmologia')) {
      return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Estrelas e astros
    if (topicLower.includes('estrelas') || topicLower.includes('astros') || topicLower.includes('constelação')) {
      return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de Astronomia
    return 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Imagens para Artes
  if (subject === 'Artes') {
    // Artes visuais e pintura
    if (topicLower.includes('artes visuais') || topicLower.includes('pintura') || topicLower.includes('desenho')) {
      return 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // História da arte
    if (topicLower.includes('história da arte') || topicLower.includes('movimentos artísticos')) {
      return 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Música
    if (topicLower.includes('música') || topicLower.includes('musica') || topicLower.includes('som')) {
      return 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Teatro e dança
    if (topicLower.includes('teatro') || topicLower.includes('dança') || topicLower.includes('performance')) {
      return 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    
    // Imagem geral de Artes
    return 'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
  
  // Se não encontrar um tema específico, retorna null
  return null;
}
