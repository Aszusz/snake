import { Action, Actions } from '@/core/actions';
import { State, Point } from '@/core/state';
import { random } from '@/shell/effects';
import { Middleware } from '@/lib/strict-redux/types';

function randomFood(width: number, height: number, snake: Point[]): Point {
  let food: Point;
  do {
    food = { x: random(0, width - 1), y: random(0, height - 1) };
  } while (snake.some(p => p.x === food.x && p.y === food.y));
  return food;
}

export const foodMiddleware: Middleware<State, Action> =
  (store) => (next) => (action) => {
    const prevScore = store.getState().score;
    const result = next(action);
    const state = store.getState();

    if (Actions.is['engine/game-tick'](action) && state.score > prevScore) {
      store.dispatch(Actions.create['engine/place-food'](
        randomFood(state.width, state.height, state.snake)
      ));
    }

    return result;
  };
