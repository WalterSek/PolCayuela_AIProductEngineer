'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Dot {
  x: number;
  y: number;
  baseAlpha: number;
  currentAlpha: number;
  scale: number;
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Create dot grid - dense
      const spacing = 14;
      const cols = Math.ceil(rect.width / spacing);
      const rows = Math.ceil(rect.height / spacing);

      dotsRef.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseAlpha: 0.15,
            currentAlpha: 0.15,
            scale: 1,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const radius = 80; // Interaction radius

      dotsRef.current.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate proximity effect
        if (distance < radius) {
          const factor = 1 - distance / radius;
          dot.currentAlpha = dot.baseAlpha + factor * 0.4;
          dot.scale = 1 + factor * 1.5;
        } else {
          dot.currentAlpha += (dot.baseAlpha - dot.currentAlpha) * 0.1;
          dot.scale += (1 - dot.scale) * 0.1;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2 * dot.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${dot.currentAlpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full relative"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ display: 'block' }}
      />
      {/* Edge fade masks for seamless blend */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-zinc-50/80 via-transparent to-zinc-50/80" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-zinc-50/60 via-transparent to-zinc-50/60" />
    </motion.div>
  );
}
