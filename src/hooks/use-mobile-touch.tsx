
import { useEffect, useRef } from 'react';

export function useMobileTouch() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      element.style.transform = 'scale(0.98)';
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      element.style.transform = 'scale(1)';
      
      // Trigger click event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(clickEvent);
    };

    const handleTouchCancel = () => {
      element.style.transform = 'scale(1)';
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);

  return elementRef;
}
