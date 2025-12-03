import { Actions, Action } from './actions';
import { initialState, initilaizeGameFrame, State, Point, Direction } from './state';

const opposites: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

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
        gameOver: false,
      };
    }

    case Actions.type['engine/game-tick']: {
      if (state.gameOver) return state;

      const newHead = moveHead(state.snake[0], state.direction);

      if (checkCollision(newHead, state.snake, state.width, state.height)) {
        return { ...state, gameOver: true };
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
      if (state.gameOver) return state;
      if (opposites[action.payload] === state.direction) return state;
      return { ...state, direction: action.payload };
    }

    default:
      return state;
  }
};
