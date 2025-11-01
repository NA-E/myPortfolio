import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const { theme } = useTheme();
  
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    if (!window.matchMedia('(pointer: coarse)').matches) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        const target = e.target as HTMLElement;
        setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      };
      
      document.body.style.cursor = 'none';
      window.addEventListener('mousemove', updatePosition);
      
      return () => {
        document.body.style.cursor = 'auto';
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('resize', checkTouchDevice);
      };
    }

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  const cursorColor = '#FF6EC7';
  const cursorGlow = theme === 'dark' 
    ? '0 0 10px rgba(255, 110, 199, 0.4), 0 0 20px rgba(255, 110, 199, 0.2)'
    : '0 0 8px rgba(255, 110, 199, 0.6), 0 0 16px rgba(255, 110, 199, 0.3)';

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
        mass: 0.1
      }}
      style={{
        width: '12px',
        height: '20px',
        clipPath: 'polygon(0 0, 0 12px, 3px 15px, 6px 12px, 12px 15px, 12px 12px, 9px 9px, 9px 0)',
        border: `1px solid ${cursorColor}`,
        backgroundColor: 'transparent',
        transform: 'translate(-25%, -25%)',
        boxShadow: cursorGlow,
        opacity: 0.9,
      }}
    />
  );
};

export default CustomCursor;