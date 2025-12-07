import { Action, Actions } from '@/core/actions';
import { selectInterval, selectGameState } from '@/core/selectors';
import { State } from '@/core/state';
import { Middleware } from '@/lib/strict-redux/types';
import { createTimeout } from '@/shell/effects';

let cleanup: (() => void) | null = null;

export const gameMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      Actions.is['player/start-game'](action) ||
      Actions.is['engine/game-tick'](action)
    ) {
      if (selectGameState(store.getState()) === 'playing') {
        cleanup?.();
        cleanup = createTimeout(
          () => store.dispatch(Actions.create['engine/game-tick'](null)),
          selectInterval(store.getState()),
        );
      }
    }

    return result;
  };
