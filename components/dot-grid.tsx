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

      // Create dot grid - sleek spacing
      const spacing = 14;
      const cols = Math.ceil(rect.width / spacing);
      const rows = Math.ceil(rect.height / spacing);

      dotsRef.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseAlpha: 0.06,
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

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Store relative position even outside canvas for pre-fade calculation
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
      const radius = 80; // Tighter interaction radius
      const preFadeRadius = 60; // Distance outside canvas where effect starts

      dotsRef.current.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate edge fade (only affects base, not hover)
        const edgeFade = 100;
        const edgeFactorX = Math.min(dot.x, rect.width - dot.x) / edgeFade;
        const edgeFactorY = Math.min(dot.y, rect.height - dot.y) / edgeFade;
        const edgeFactor = Math.max(0, Math.min(1, Math.min(edgeFactorX, edgeFactorY)));

        // Calculate proximity effect with edge fade applied to hover too
        let targetAlpha = dot.baseAlpha * edgeFactor;
        let targetScale = 1;

        // Calculate pre-fade factor (for mouse approaching from outside)
        let preFadeFactor = 1;
        if (mouse.x < -preFadeRadius || mouse.x > rect.width + preFadeRadius ||
            mouse.y < -preFadeRadius || mouse.y > rect.height + preFadeRadius) {
          preFadeFactor = 0;
        } else {
          // Distance from nearest canvas edge
          const distFromEdgeX = Math.min(mouse.x + preFadeRadius, rect.width + preFadeRadius - mouse.x);
          const distFromEdgeY = Math.min(mouse.y + preFadeRadius, rect.height + preFadeRadius - mouse.y);
          const distFromCanvas = Math.min(distFromEdgeX, distFromEdgeY);
          preFadeFactor = Math.max(0, Math.min(1, distFromEdgeX / preFadeRadius, distFromEdgeY / preFadeRadius));
        }

        if (distance < radius) {
          const factor = 1 - distance / radius;
          // Stronger edge fade on hover - use power for more aggressive fade
          const hoverEdgeFactor = Math.pow(edgeFactor, 0.4);
          targetAlpha = dot.baseAlpha * edgeFactor + factor * 0.3 * hoverEdgeFactor * preFadeFactor;
          // Smoother, bigger scale at center - cubic curve for smooth peak
          targetScale = 1 + Math.pow(factor, 2.5) * 2.5 * hoverEdgeFactor * preFadeFactor;
        }

        // Smooth transitions
        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.15;
        dot.scale += (targetScale - dot.scale) * 0.15;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 0.8 * dot.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${dot.currentAlpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
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
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </motion.div>
  );
}
