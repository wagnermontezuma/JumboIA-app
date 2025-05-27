import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface MateriasButtonProps {
  className?: string;
}

const MateriasButton: React.FC<MateriasButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/materias');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${className}`}
    >
      <AcademicCapIcon className="h-5 w-5" />
      <span>Matérias</span>
    </button>
  );
};

export default MateriasButton; 