
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from './button';
import { useMobileTouch } from '../../hooks/use-mobile-touch';
import { useIsMobile } from '../../hooks/use-mobile';

interface MobileButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ children, onClick, className, ...props }, ref) => {
    const isMobile = useIsMobile();
    const touchRef = useMobileTouch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={isMobile ? touchRef as React.RefObject<HTMLButtonElement> : ref}
        onClick={handleClick}
        className={`${className} touch-manipulation select-none`}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
          cursor: 'pointer',
          minHeight: '44px',
          minWidth: '44px',
          ...props.style
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MobileButton.displayName = 'MobileButton';

export { MobileButton };
