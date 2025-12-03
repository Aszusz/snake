import { ofType, union } from '@/lib/strict-union';
import { Direction } from './state';

export const Actions = union('type', 'payload', {
  ['start-game']: ofType<null>(),
  ['game-tick']: ofType<null>(),
  ['change-direction']: ofType<Direction>(),
} as const);

export type Action = typeof Actions.Union;
