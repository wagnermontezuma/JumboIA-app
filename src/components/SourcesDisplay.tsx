import React from 'react';
import uolLogo from '../assets/logo-uol.svg';
import g1Logo from '../assets/logo-g1.svg';

interface Source {
  name: string;
  url: string;
  logo: string;
}

interface SourcesDisplayProps {
  showSources: boolean;
}

export const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ showSources }) => {
  const sources: Source[] = [
    {
      name: 'UOL',
      url: 'https://www.uol.com.br',
      logo: uolLogo
    },
    {
      name: 'G1',
      url: 'https://g1.globo.com',
      logo: g1Logo
    }
  ];

  if (!showSources) {
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