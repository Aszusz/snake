import GameBoard from '@/view/GameBoard';
import GameControls from '@/view/GameControls';

function App() {
  return (
    <div className="m-10 mx-auto flex max-w-md flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <GameBoard />
      <GameControls />
    </div>
  );
}

export default App;
