import { State, FOODS_PER_LEVEL, BASE_INTERVAL, SPEED_COEF } from './state';

export const selectSnake = (state: State) => state.snake;
export const selectFood = (state: State) => state.food;
export const selectScore = (state: State) => state.score;
export const selectDirection = (state: State) => state.direction;
export const selectGameState = (state: State) => state.gameState;
export const selectWidth = (state: State) => state.width;
export const selectHeight = (state: State) => state.height;

// Derived selectors
export const selectFoodsEaten = (state: State) => state.snake.length - 1;
export const selectLevel = (state: State) => Math.floor(selectFoodsEaten(state) / FOODS_PER_LEVEL) + 1;
export const selectInterval = (state: State) => Math.floor(BASE_INTERVAL * SPEED_COEF ** (selectLevel(state) - 1));
