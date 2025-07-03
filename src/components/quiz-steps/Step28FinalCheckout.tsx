
import React, { memo, useRef, useEffect, useState } from 'react';

interface QuizState {
  userName: string;
}

interface Step28FinalCheckoutProps {
  quizState: QuizState;
}

const Step28FinalCheckout: React.FC<Step28FinalCheckoutProps> = memo(({ quizState }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showUnmuteButton, setShowUnmuteButton] = useState(true);
  const [showCheckoutButton, setShowCheckoutButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Tentar reproduzir automaticamente
      video.play().catch(error => {
        console.log('Autoplay falhou:', error);
      });
      
      // Esconder botão se não estiver mutado
      if (!video.muted) {
        setShowUnmuteButton(false);
      }

      // Listener para mostrar o botão de checkout após 1:46 (106 segundos)
      const handleTimeUpdate = () => {
        if (video.currentTime >= 106 && !showCheckoutButton) {
          setShowCheckoutButton(true);
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [showCheckoutButton]);

  const unmuteVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play();
      setShowUnmuteButton(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              🎉 Parabéns, {quizState.userName}!
            </h1>
            <p className="text-lg text-gray-700">
              Seu plano personalizado está pronto!
            </p>
          </div>
          
          {/* Video */}
          <div className="max-w-2xl mx-auto text-center mb-8 relative">
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
              <video
                ref={videoRef}
                src="https://raw.githubusercontent.com/beliza0014/imagens-site/main/video-final-da-nutricionista.mp4"
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={(e) => {
                  e.currentTarget.pause();
                }}
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  display: 'block'
                }}
              >
                Seu navegador não suporta vídeo HTML5.
              </video>

              {showUnmuteButton && (
                <button
                  onClick={unmuteVideo}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '3px solid #10b981',
                    padding: '20px 40px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    zIndex: 999,
                    color: '#10b981',
                    minWidth: '200px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                  }}
                >
                  🔊 Ativar Som
                </button>
              )}
            </div>
          </div>

          {/* Checkout Button - só aparece após 1:46 */}
          {showCheckoutButton && (
            <div className="text-center">
              <a 
                href="https://pay.kiwify.com.br/I7LKmAh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse touch-manipulation"
                style={{
                  minHeight: '60px',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  touchAction: 'manipulation'
                }}
              >
                Pegar meu Plano Agora
              </a>
              <p className="text-sm text-gray-600 mt-4">
                Acesso imediato ao seu plano personalizado
              </p>
            </div>
          )}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
});

Step28FinalCheckout.displayName = 'Step28FinalCheckout';

export default Step28FinalCheckout;
