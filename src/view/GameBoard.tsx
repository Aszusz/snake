import { selectScore, selectGameOver, selectLevel } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import { useContext, useRef, useEffect } from 'react';

const CELL_SIZE = 24;

function GameBoard() {
  const store = useContext(StoreContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const score = useSelector(store, selectScore);
  const gameOver = useSelector(store, selectGameOver);
  const level = useSelector(store, selectLevel);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { snake, food, width, height } = store.getState();

      canvas.width = width * CELL_SIZE;
      canvas.height = height * CELL_SIZE;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, height * CELL_SIZE);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(width * CELL_SIZE, y * CELL_SIZE);
        ctx.stroke();
      }

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

      ctx.fillStyle = '#22c55e';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });
    };

    draw();
    return store.subscribe(draw);
  }, [store]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xl font-semibold">Level {level} | Score: {score}</div>
      <canvas ref={canvasRef} className="border border-gray-300" />
      {gameOver && <div className="text-red-600 font-bold">Game Over!</div>}
    </div>
  );
}

export default GameBoard;
