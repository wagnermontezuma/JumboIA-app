import { useEffect, useState } from 'react';
import splashLogoNew from '../assets/splash-logo-new.svg';

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
      <img
        src={splashLogoNew}
        alt="JumboIA Logo"
        className="w-40 h-40 animate-pulse"
      />
    </div>
  );
}; 