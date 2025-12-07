import { selectGameState } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import GameBoard from '@/view/GameBoard';
import GameControls from '@/view/GameControls';
import GameSettings from '@/view/GameSettings';
import ScoreDisplay from '@/view/ScoreDisplay';
import { useContext } from 'react';

function App() {
  const store = useContext(StoreContext);
  const gameState = useSelector(store, selectGameState);

  return (
    <div className="m-10 mx-auto flex w-fit flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-bold">Snake</h1>
      <GameSettings />
      <ScoreDisplay />
      <GameBoard />
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
