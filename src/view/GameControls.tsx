import { Actions } from '@/core/actions';
import { selectGameState } from '@/core/selectors';
import { Direction } from '@/core/state';
import { useAppSelector, useAppDispatch } from '@/shell/hooks';
import { Button } from '@/view/components/shadcn/button';
import { useEffect } from 'react';

const keyToDirection: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

function GameControls() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(selectGameState);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        dispatch(Actions.create['player/start-game'](null));
        return;
      }
      const dir = keyToDirection[e.key];
      if (dir) {
        e.preventDefault();
        dispatch(Actions.create['player/change-direction'](dir));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  const startGame = () => dispatch(Actions.create['player/start-game'](null));

  return (
    <Button
      size="lg"
      variant="default"
      className="font-semibold"
      onClick={startGame}
    >
      {gameState === 'idle' ? 'Start Game' : 'Restart Game'}
    </Button>
  );
}

export default GameControls;
