import { Action } from '@/core/actions';
import { selectInterval } from '@/core/selectors';
import { State } from '@/core/state';
import { Middleware } from '@/lib/strict-redux/types';

let lastTickTime = performance.now();
let lastTarget: number | null = null;

export const loggerMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === 'engine/game-tick') {
      const now = performance.now();
      const elapsed = now - lastTickTime;
      const drift = lastTarget !== null ? elapsed - lastTarget : null;
      console.log(
        'tick',
        elapsed.toFixed(3),
        'ms',
        'target',
        lastTarget,
        'drift',
        drift?.toFixed(3),
      );
      lastTickTime = now;
      lastTarget = selectInterval(store.getState());
    }
    return result;
  };
