import { Actions } from '@/core/actions';
import { selectGameState } from '@/core/selectors';
import { useAppDispatch, useAppSelector } from '@/shell/hooks';
import { Button } from '@/view/components/shadcn/button';

export function GameMessage() {
  const gameState = useAppSelector(selectGameState);
  return (
    <div
      className={`font-bold text-red-600 ${gameState !== 'game-over' ? 'invisible' : ''}`}
    >
      Game Over!
    </div>
  );
}

export function StartButton() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(selectGameState);
  return (
    <Button
      size="lg"
      variant="default"
      className="font-semibold"
      onClick={() => dispatch(Actions.create['player/start-game'](null))}
    >
      {gameState === 'idle' ? 'Start Game' : 'Restart Game'}
    </Button>
  );
}
