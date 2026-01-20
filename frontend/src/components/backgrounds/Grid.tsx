import React, { useEffect, useRef } from 'react';

interface GridProps {
  className?: string;
}

const Grid: React.FC<GridProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.scale(ratio, ratio);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const gridSize = 40;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Couleur fixe (bleu très léger)
      ctx.strokeStyle = 'rgba(31, 72, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Grid;
