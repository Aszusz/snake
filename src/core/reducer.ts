import { Actions, Action } from './actions';
import { initialState, initilaizeGameFrame, State, Point, Direction } from './state';

function cameFrom(snake: Point[]): Direction | null {
  if (snake.length < 2) return null;
  const [head, neck] = snake;
  if (neck.x < head.x) return 'left';
  if (neck.x > head.x) return 'right';
  if (neck.y < head.y) return 'up';
  if (neck.y > head.y) return 'down';
  return null;
}

function moveHead(head: Point, direction: Direction): Point {
  switch (direction) {
    case 'up': return { x: head.x, y: head.y - 1 };
    case 'down': return { x: head.x, y: head.y + 1 };
    case 'left': return { x: head.x - 1, y: head.y };
    case 'right': return { x: head.x + 1, y: head.y };
  }
}

function checkCollision(head: Point, snake: Point[], width: number, height: number): boolean {
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) return true;
  return snake.slice(1).some(p => p.x === head.x && p.y === head.y);
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case Actions.type['player/start-game']: {
      return {
        ...state,
        ...initilaizeGameFrame(),
        gameState: 'playing',
      };
    }

    case Actions.type['engine/game-tick']: {
      if (state.gameState !== 'playing') return state;

      const newHead = moveHead(state.snake[0], state.direction);

      if (checkCollision(newHead, state.snake, state.width, state.height)) {
        return { ...state, gameState: 'game-over' };
      }

      const ateFood = newHead.x === state.food.x && newHead.y === state.food.y;
      const newSnake = ateFood
        ? [newHead, ...state.snake]
        : [newHead, ...state.snake.slice(0, -1)];

      return {
        ...state,
        snake: newSnake,
        score: ateFood ? state.score + 1 : state.score,
      };
    }

    case Actions.type['engine/place-food']: {
      return { ...state, food: action.payload };
    }

    case Actions.type['player/change-direction']: {
      if (state.gameState !== 'playing') return state;
      if (action.payload === cameFrom(state.snake)) return state;
      return { ...state, direction: action.payload };
    }

    default:
      return state;
  }
};
