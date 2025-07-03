
import React, { useState, useRef, useEffect, memo } from 'react';
import { Play, Pause } from 'lucide-react';
import { useMobileAutoplay } from '../../hooks/use-mobile-autoplay';
import { MobileButton } from '../ui/mobile-button';
import OptimizedImage from '../ui/optimized-image';
import { preloadAudio } from '../../utils/media-preloader';

interface Step23NutritionistAudioProps {
  nextStep: () => void;
}

const Step23NutritionistAudio: React.FC<Step23NutritionistAudioProps> = memo(({
  nextStep
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { canAutoplay, playMedia } = useMobileAutoplay();

  useEffect(() => {
    // Preload audio for better performance
    preloadAudio("https://raw.githubusercontent.com/beliza0014/audio-dra.alice-site/main/Voz%20Dra.%20Alice.mp3").catch(console.log);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    const playAudio = async () => {
      if (canAutoplay) {
        const success = await playMedia(audio);
        if (success) {
          setIsPlaying(true);
        }
      }
    };

    audio.addEventListener('timeupdate', updateTime, { passive: true });
    audio.addEventListener('loadedmetadata', updateDuration, { passive: true });
    audio.addEventListener('ended', handleEnded, { passive: true });

    if (audio.readyState >= 2) {
      playAudio();
    } else {
      audio.addEventListener('loadeddata', playAudio, { passive: true });
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadeddata', playAudio);
    };
  }, [canAutoplay, playMedia]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const success = await playMedia(audio);
      if (success) {
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Ouça o meu áudio urgente!</h2>
          
          {/* Modern WhatsApp style audio player */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-sm mx-auto">
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-4 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
                  DA
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white">Dra. Alice</p>
                  <p className="text-green-100 text-sm">Nutricionista</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors shadow-lg touch-manipulation"
                    style={{
                      minHeight: '48px',
                      minWidth: '48px'
                    }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-white/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-white h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-green-100">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            src="https://raw.githubusercontent.com/beliza0014/audio-dra.alice-site/main/Voz%20Dra.%20Alice.mp3"
            autoPlay
            playsInline
            preload="auto"
          >
            Seu navegador não suporta o elemento de áudio.
          </audio>

          {/* IMC Image */}
          <div className="mb-8">
            <OptimizedImage
              src="https://beliza0014.github.io/imagens-site/grafico-imc.png"
              alt="Índice de massa corporal (IMC)"
              className="max-w-full h-auto mx-auto rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Progress Circle */}
          <div className="mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.54)}`}
                  strokeLinecap="round"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  className="text-lg font-bold fill-orange-500 transform rotate-90"
                  style={{ transformOrigin: '60px 60px' }}
                >
                  54%
                </text>
              </svg>
            </div>
            <p className="text-orange-500 font-medium">Você está aqui</p>
          </div>

          {/* Motivational text */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
            <p className="text-lg font-bold text-green-800">
              Você pode perder de 9KG a 15KG em 3 semanas com os Chás ideais!
            </p>
          </div>

          {/* Results Expected Text */}
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Resultados Esperados
          </h3>

          {/* Green Bar Charts */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div
                className="bg-green-500 w-16 rounded-t-lg mx-auto mb-2"
                style={{ height: '80px' }}
              ></div>
              <p className="font-bold text-green-700">-5kg</p>
              <p className="text-sm text-gray-600">7 dias</p>
            </div>
            <div className="text-center">
              <div
                className="bg-green-500 w-16 rounded-t-lg mx-auto mb-2"
                style={{ height: '120px' }}
              ></div>
              <p className="font-bold text-green-700">-9kg</p>
              <p className="text-sm text-gray-600">14 dias</p>
            </div>
            <div className="text-center">
              <div
                className="bg-green-500 w-16 rounded-t-lg mx-auto mb-2"
                style={{ height: '160px' }}
              ></div>
              <p className="font-bold text-green-700">-15kg</p>
              <p className="text-sm text-gray-600">21 dias</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-green-800 mb-6">
            Veja a transformação da Barbara!
          </h3>

          <div className="mb-8">
            <OptimizedImage
              src="https://beliza0014.github.io/imagens-site/barbara-transformacao.png"
              alt="Transformação da Bárbara - Antes e Depois"
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-left">
            <p className="text-gray-700 italic mb-4">
              <strong>Depoimento:</strong> "Gente, tô chocada! Nunca imaginei que um chá faria tanta diferença assim. Em 3 semanas, meu inchaço sumiu e a balança já mostrou 15kg a menos! Já tinha tentado de tudo. Esse chá é diferente... parece que ele acordou meu metabolismo! Recomendo demais!"
            </p>
            <p className="text-green-700 font-medium text-right">
              Bárbara Alves - 46 anos - Nova Lima – MG
            </p>
          </div>

          <MobileButton
            onClick={nextStep}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
          >
            Continuar
          </MobileButton>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
});

Step23NutritionistAudio.displayName = 'Step23NutritionistAudio';
export default Step23NutritionistAudio;
