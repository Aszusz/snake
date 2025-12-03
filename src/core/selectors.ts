import { State } from './state';

export const selectSnake = (state: State) => state.snake;
export const selectFood = (state: State) => state.food;
export const selectScore = (state: State) => state.score;
export const selectDirection = (state: State) => state.direction;
export const selectGameOver = (state: State) => state.gameOver;
export const selectWidth = (state: State) => state.width;
export const selectHeight = (state: State) => state.height;
export const selectInterval = (state: State) => state.interval;
