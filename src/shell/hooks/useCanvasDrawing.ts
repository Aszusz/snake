import { StoreContext } from '@/shell/store';
import { useContext, useEffect, RefObject } from 'react';

const CELL_SIZE = 24;

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
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
}

function drawFood(
  ctx: CanvasRenderingContext2D,
  food: { x: number; y: number },
) {
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(
  ctx: CanvasRenderingContext2D,
  snake: { x: number; y: number }[],
) {
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? '#16a34a' : '#22c55e';
    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  });
}

export function useCanvasDrawing(
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const store = useContext(StoreContext);

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

      drawGrid(ctx, width, height);
      drawFood(ctx, food);
      drawSnake(ctx, snake);
    };

    draw();
    return store.subscribe(draw);
  }, [store, canvasRef]);
}
