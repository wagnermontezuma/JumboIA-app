import React from 'react';

interface ResearchDisplayProps {
  content: string;
  title?: string;
}

export const ResearchDisplay: React.FC<ResearchDisplayProps> = ({ content, title = "Pesquisa" }) => {
  // Reformatar texto para remover marcações
  const cleanText = (text: string): string => {
    return text
      .replace(/#+\s/g, '')        // Remove marcadores de título
      .replace(/\*\*/g, '')        // Remove asteriscos duplos
      .replace(/\*/g, '')          // Remove asteriscos simples
      .replace(/#####/g, '')
      .replace(/####/g, '')
      .replace(/###/g, '')
      .trim();
  };

  // Identifica e processa seções numeradas
  const processSections = (text: string) => {
    const sections: { title: string; items: string[] }[] = [];
    const cleanedText = cleanText(text);
    
    // Divide em linhas
    const lines = cleanedText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    // Processamento de seções
    let currentSection: { title: string; items: string[] } | null = null;
    
    lines.forEach(line => {
      // Detecta início de seção numerada (ex: "1. Definição e Causa")
      const sectionMatch = line.match(/^(\d+\.\s+[\w\s]+):(.*)/);
      
      if (sectionMatch) {
        // Salva seção anterior
        if (currentSection) {
          sections.push(currentSection);
        }
        
        // Inicia nova seção
        const sectionTitle = sectionMatch[1].trim();
        const initialContent = sectionMatch[2].trim();
        
        currentSection = {
          title: sectionTitle,
          items: initialContent ? [initialContent] : []
        };
      } 
      // Detecta itens de lista começando com "-"
      else if (line.startsWith('-')) {
        if (currentSection) {
          currentSection.items.push(line.substring(1).trim());
        }
      } 
      // Se não é seção nem item, pode ser continuação ou informação adicional
      else if (currentSection) {
        currentSection.items.push(line);
      }
    });
    
    // Adiciona a última seção
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const sections = processSections(content);

  // Função para completar palavras cortadas no final
  const completeLastWord = (word: string): string => {
    const incompleteWords: Record<string, string> = {
      'higien': 'higienizados',
      'sangu': 'sangue',
      'contaminad': 'contaminados',
      'transmiss': 'transmissão'
    };
    
    for (const [incomplete, complete] of Object.entries(incompleteWords)) {
      if (word.endsWith(incomplete)) {
        return word.replace(new RegExp(`${incomplete}$`), complete);
      }
    }
    
    return word;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700 border-b pb-2">{title}</h2>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-lg mb-2 text-emerald-600">{section.title}</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-700">
                  {itemIndex === section.items.length - 1 
                    ? completeLastWord(item) 
                    : item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}; 