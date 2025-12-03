import { Action, Actions } from '@/core/actions';
import { State } from '@/core/state';
import { selectInterval, selectGameOver } from '@/core/selectors';
import { Middleware } from '@/lib/strict-redux/types';

let intervalId: ReturnType<typeof setInterval> | null = null;

export const gameMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (Actions.is['start-game'](action)) {
      if (intervalId) clearInterval(intervalId);
      const interval = selectInterval(store.getState());
      intervalId = setInterval(() => {
        if (selectGameOver(store.getState())) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          return;
        }
        store.dispatch(Actions.create['game-tick'](null));
      }, interval);
    }

    return result;
  };
