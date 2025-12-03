import { Actions } from '@/core/actions';
import { Direction } from '@/core/state';
import { StoreContext } from '@/shell/store';
import { Button } from '@/view/components/shadcn/button';
import { useContext, useEffect } from 'react';

const keyToDirection: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

function GameControls() {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        dispatch(Actions.create['start-game'](null));
        return;
      }
      const dir = keyToDirection[e.key];
      if (dir) {
        e.preventDefault();
        dispatch(Actions.create['change-direction'](dir));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  const startGame = () => dispatch(Actions.create['start-game'](null));

  return (
    <Button size="lg" variant="default" className="font-semibold" onClick={startGame}>
      Start Game
    </Button>
  );
}

export default GameControls;
