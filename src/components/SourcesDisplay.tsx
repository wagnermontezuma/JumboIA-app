import React from 'react';
import uolLogoNew from '../assets/logo-uol-new.svg';
import g1LogoNew from '../assets/logo-g1-new.svg';

interface Source {
  name: string;
  url: string;
  logo: string;
}

interface SourcesDisplayProps {
  showSources: boolean;
  messageContent?: string; // Conteúdo da mensagem para análise
}

export const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ 
  showSources, 
  messageContent = '' 
}) => {
  const sources: Source[] = [
    {
      name: 'UOL',
      url: 'https://www.uol.com.br',
      logo: uolLogoNew
    },
    {
      name: 'G1',
      url: 'https://g1.globo.com',
      logo: g1LogoNew
    }
  ];

  // Verifica se o conteúdo da mensagem parece ser uma pesquisa detalhada
  const isPesquisaDetalhada = () => {
    const termosPesquisa = [
      'pesquisa', 'pesquisar', 'estudo', 'doença', 'chagas', 
      'análise', 'investigação', 'relatório', 'levantamento',
      'história', 'dados', 'estatísticas', 'informações'
    ];
    
    const contentLowerCase = messageContent.toLowerCase();
    
    // Verifica se o conteúdo contém algum dos termos de pesquisa
    return termosPesquisa.some(termo => contentLowerCase.includes(termo)) && 
           contentLowerCase.length > 50; // Mensagem deve ter mais de 50 caracteres para ser considerada detalhada
  };

  // Se não deve mostrar fontes ou não é uma pesquisa detalhada, retorna null
  if (!showSources || !isPesquisaDetalhada()) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-2">Fontes:</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <a 
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <img 
              src={source.logo} 
              alt={`Logo ${source.name}`} 
              className="w-5 h-5 rounded"
            />
            <span className="text-xs font-medium">{source.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}; 