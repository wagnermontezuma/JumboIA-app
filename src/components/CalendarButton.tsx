import React from 'react';

interface CalendarButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-12 h-12 rounded-xl overflow-hidden shadow-lg
        transition-all duration-300 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none
        bg-jumbo hover:bg-jumbo-dark p-3
      `}
      title="Criar cronograma"
    >
      {/* Ícone de calendário */}
      <div className="w-full h-full flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white calendar-animation"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Moldura do calendário */}
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          {/* Linhas para os dias da semana */}
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          {/* Linha separadora do cabeçalho */}
          <line x1="3" y1="10" x2="21" y2="10" />
          {/* Indicador de data */}
          <circle cx="12" cy="15" r="2" fill="currentColor" />
        </svg>
      </div>
      
      {/* Estado de carregamento */}
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}; 