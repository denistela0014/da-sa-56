
import React, { memo, useRef, useEffect, useState } from 'react';
import { MobileButton } from '../ui/mobile-button';

interface Step12Props {
  nextStep: () => void;
}

const Step12VideoVSL: React.FC<Step12Props> = memo(({ nextStep }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);

  const handleContinueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Continue button clicked on Step 12');
    if (typeof nextStep === 'function') {
      nextStep();
    } else {
      console.error('nextStep is not a function:', nextStep);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Tentar reproduzir automaticamente
      video.play().catch(error => {
        console.log('Autoplay falhou:', error);
      });

      // Listener para mostrar o botão após 38 segundos
      const handleTimeUpdate = () => {
        if (video.currentTime >= 38 && !showButton) {
          setShowButton(true);
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [showButton]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Mensagem da Dra. Alice
          </h2>
          
          <div className="relative rounded-lg mb-8 bg-gray-100 overflow-hidden">
            <video
              ref={videoRef}
              src="https://raw.githubusercontent.com/beliza0014/vsl-alice-continuar/main/202507022355-1_Z8miFl3r.mp4"
              autoPlay
              playsInline
              preload="metadata"
              onEnded={(e) => {
                e.currentTarget.pause();
              }}
              className="w-full h-auto"
              style={{
                display: 'block',
                border: 'none',
                pointerEvents: 'none'
              }}
            >
              Seu navegador não suporta o elemento de vídeo.
            </video>
            <style>{`
              video::-webkit-media-controls {
                display: none !important;
              }
              video::-webkit-media-controls-enclosure {
                display: none !important;
              }
            `}</style>
          </div>
          
          {showButton && (
            <MobileButton
              onClick={handleContinueClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-20 rounded-lg transition-all duration-300 text-xl w-full max-w-md"
            >
              Continuar
            </MobileButton>
          )}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
});

Step12VideoVSL.displayName = 'Step12VideoVSL';

export default Step12VideoVSL;
