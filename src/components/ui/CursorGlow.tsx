import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    springX.set(mousePos.x - 200);
    springY.set(mousePos.y - 200);
  }, [mousePos, springX, springY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none z-0"
    />
  );
}
