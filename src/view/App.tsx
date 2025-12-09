import { selectGameState } from '@/core/selectors';
import { useAppSelector } from '@/shell/hooks';
import { useCanvasDrawing } from '@/shell/hooks';
import GameControls from '@/view/GameControls';
import GameSettings from '@/view/GameSettings';
import ScoreDisplay from '@/view/ScoreDisplay';
import { useRef } from 'react';

function App() {
  const gameState = useAppSelector(selectGameState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasDrawing(canvasRef);

  return (
    <div className="m-10 mx-auto flex w-fit flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Snake</h1>
      <GameSettings />
      <ScoreDisplay />
      <canvas ref={canvasRef} className="border border-gray-300" />
      <div
        className={`font-bold text-red-600 ${gameState !== 'game-over' ? 'invisible' : ''}`}
      >
        Game Over!
      </div>
      <GameControls />
    </div>
  );
}

export default App;
