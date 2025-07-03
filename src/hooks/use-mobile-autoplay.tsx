
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

export function useMobileAutoplay() {
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setCanAutoplay(true);
      return;
    }

    const handleUserInteraction = () => {
      setUserInteracted(true);
      setCanAutoplay(true);
    };

    // Listen for any user interaction on mobile
    const events = ['touchstart', 'touchend', 'click', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isMobile]);

  const playMedia = async (mediaElement: HTMLVideoElement | HTMLAudioElement) => {
    if (!mediaElement) return false;

    try {
      await mediaElement.play();
      return true;
    } catch (error) {
      console.log('Autoplay failed, waiting for user interaction:', error);
      
      if (isMobile && !userInteracted) {
        // On mobile, wait for user interaction then try to play
        const handleInteraction = async () => {
          try {
            await mediaElement.play();
            setCanAutoplay(true);
          } catch (e) {
            console.log('Play after interaction failed:', e);
          }
        };

        document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
        document.addEventListener('click', handleInteraction, { once: true, passive: true });
      }
      
      return false;
    }
  };

  return { canAutoplay, userInteracted, playMedia };
}
