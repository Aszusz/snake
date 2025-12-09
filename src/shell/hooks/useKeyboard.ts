import { useAppDispatch } from './useAppDispatch';
import { Actions } from '@/core/actions';
import { Direction } from '@/core/state';
import { useEffect } from 'react';

const keyToDirection: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

export function useKeyboard() {
  const dispatch = useAppDispatch();

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
}
