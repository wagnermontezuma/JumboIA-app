import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Inicia o fade out após 2.5 segundos
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    
    // Remove o splash após 3 segundos
    const finishTimer = setTimeout(onFinish, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">JumboIA</p>
        <p className="text-sm text-blue-500">by <span className="uppercase">Gotta</span></p>
      </div>
    </div>
  );
}; 