import { selectSnake, selectFood, selectWidth, selectHeight, selectScore, selectGameOver } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import { useContext } from 'react';

function GameBoard() {
  const store = useContext(StoreContext);
  const snake = useSelector(store, selectSnake);
  const food = useSelector(store, selectFood);
  const width = useSelector(store, selectWidth);
  const height = useSelector(store, selectHeight);
  const score = useSelector(store, selectScore);
  const gameOver = useSelector(store, selectGameOver);

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isSnake = snake.some(p => p.x === x && p.y === y);
      const isFood = food.x === x && food.y === y;
      cells.push(
        <div
          key={`${x}-${y}`}
          className={`w-6 h-6 border border-gray-300 ${
            isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-white'
          }`}
        />
      );
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xl font-semibold">Score: {score}</div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${width}, 1.5rem)` }}
      >
        {cells}
      </div>
      {gameOver && <div className="text-red-600 font-bold">Game Over!</div>}
    </div>
  );
}

export default GameBoard;
