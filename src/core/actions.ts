import { Direction, Point } from './state';
import { ofType, union } from '@/lib/strict-union';

export const Actions = union('type', 'payload', {
  ['player/start-game']: ofType<null>(),
  ['engine/game-tick']: ofType<null>(),
  ['player/change-direction']: ofType<Direction>(),
  ['engine/place-food']: ofType<Point>(),
  ['settings/set-dimensions']: ofType<{ width: number; height: number }>(),
} as const);

export type Action = typeof Actions.Union;
