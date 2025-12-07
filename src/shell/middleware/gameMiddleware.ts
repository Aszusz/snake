import { Action, Actions } from '@/core/actions';
import { State } from '@/core/state';
import { selectInterval, selectGameOver } from '@/core/selectors';
import { createTimeout } from '@/shell/effects';
import { Middleware } from '@/lib/strict-redux/types';

let cleanup: (() => void) | null = null;

export const gameMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (Actions.is['player/start-game'](action) || Actions.is['engine/game-tick'](action)) {
      if (!selectGameOver(store.getState())) {
        cleanup?.();
        cleanup = createTimeout(
          () => store.dispatch(Actions.create['engine/game-tick'](null)),
          selectInterval(store.getState())
        );
      }
    }

    return result;
  };
