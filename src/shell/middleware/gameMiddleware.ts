import { Action, Actions } from '@/core/actions';
import { State } from '@/core/state';
import { selectInterval, selectGameOver } from '@/core/selectors';
import { createInterval } from '@/shell/effects';
import { Middleware } from '@/lib/strict-redux/types';

let cleanup: (() => void) | null = null;

export const gameMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (Actions.is['player/start-game'](action)) {
      cleanup?.();
      cleanup = createInterval(
        () => store.dispatch(Actions.create['engine/game-tick'](null)),
        selectInterval(store.getState()),
        () => selectGameOver(store.getState())
      );
    }

    return result;
  };
