import React from 'react';

interface CrystalBallButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const CrystalBallButton: React.FC<CrystalBallButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-10 h-10 rounded-full overflow-hidden
        transition-all duration-300 transform hover:scale-110
        disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none
        ${disabled ? '' : 'hover:shadow-md'}
      `}
      title="Criar imagem"
    >
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 opacity-90" />
      
      {/* Efeito de brilho */}
      <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white opacity-60 blur-[1px]" />
      
      {/* Ícone de estrela cintilante (mais parecido com o emoji 💫) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white sparkle-animation"
          fill="currentColor"
          stroke="none"
        >
          {/* Estrela central maior */}
          <path d="M12 17L8.55 19.1l.65-4.5L6.1 11.5l4.4-.75L12 6.9l1.5 3.85 4.4.75-3.1 3.1.65 4.5z" />
          
          {/* Estrelas pequenas ao redor */}
          <path d="M5 8l-.75-1.75L2.5 5.5l1.75-.75L5 3l.75 1.75 1.75.75-1.75.75z" />
          <path d="M19 8l-.75-1.75L16.5 5.5l1.75-.75L19 3l.75 1.75 1.75.75-1.75.75z" />
          <path d="M8 21l-.5-1.2-1.2-.5 1.2-.5.5-1.2.5 1.2 1.2.5-1.2.5z" />
          <path d="M17 21l-.5-1.2-1.2-.5 1.2-.5.5-1.2.5 1.2 1.2.5-1.2.5z" />
        </svg>
      </div>
      
      {/* Efeito de reflexo */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-10" />
    </button>
  );
}; 