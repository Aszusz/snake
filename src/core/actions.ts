import { ofType, union } from '@/lib/strict-union';
import { Direction, Point } from './state';

export const Actions = union('type', 'payload', {
  ['player/start-game']: ofType<null>(),
  ['engine/game-tick']: ofType<null>(),
  ['player/change-direction']: ofType<Direction>(),
  ['engine/place-food']: ofType<Point>(),
} as const);

export type Action = typeof Actions.Union;
