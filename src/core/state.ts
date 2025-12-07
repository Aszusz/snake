export type Point = {
  x: number;
  y: number;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export const FOODS_PER_LEVEL = 3;
export const BASE_INTERVAL = 300;
export const SPEED_COEF = 0.75;

export type GameFrame = {
  snake: Point[];
  direction: Direction;
  food: Point;
  score: number;
  gameOver: boolean;
}

export type GameMeta = {
  width: number;
  height: number;
}

export type State = GameFrame & GameMeta;

export const initialGameMeta: GameMeta = {
  width: 10,
  height: 10,
}

export function initilaizeGameFrame(): GameFrame {
  return {
    snake: [{ x: 0, y: 0 }],
    direction: 'right',
    food: { x: 5, y: 5 },
    score: 0,
    gameOver: false,
  }
}

export const initialState: State = {
  ...initialGameMeta,
  ...initilaizeGameFrame(),
}