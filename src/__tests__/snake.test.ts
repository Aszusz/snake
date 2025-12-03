import { Actions } from '@/core/actions';
import { reducer } from '@/core/reducer';
import { selectSnake, selectScore, selectGameOver, selectDirection } from '@/core/selectors';
import { initialState } from '@/core/state';
import { describe, it, expect } from 'vitest';

describe('Snake Game', () => {
  it('should initialize snake at origin', () => {
    const snake = selectSnake(initialState);
    expect(snake).toEqual([{ x: 0, y: 0 }]);
  });

  it('should move snake right on game-tick', () => {
    let state = initialState;
    state = reducer(state, Actions.create['engine/game-tick'](null));
    const snake = selectSnake(state);
    expect(snake[0]).toEqual({ x: 1, y: 0 });
  });

  it('should change direction', () => {
    let state = initialState;
    state = reducer(state, Actions.create['player/change-direction']('down'));
    expect(selectDirection(state)).toBe('down');
  });

  it('should prevent 180 degree turns', () => {
    let state = initialState; // direction: right
    state = reducer(state, Actions.create['player/change-direction']('left'));
    expect(selectDirection(state)).toBe('right');
  });

  it('should set gameOver on wall collision', () => {
    let state = initialState;
    state = reducer(state, Actions.create['player/change-direction']('left'));
    // Snake at 0,0 moving left hits wall
    // But direction won't change due to 180 rule, so move up
    state = reducer(state, Actions.create['player/change-direction']('up'));
    state = reducer(state, Actions.create['engine/game-tick'](null));
    expect(selectGameOver(state)).toBe(true);
  });

  it('should grow snake and increase score when eating food', () => {
    // Create state where snake head will land on food
    let state = { ...initialState, food: { x: 1, y: 0 } };
    const initialLength = selectSnake(state).length;
    state = reducer(state, Actions.create['engine/game-tick'](null));
    expect(selectSnake(state).length).toBe(initialLength + 1);
    expect(selectScore(state)).toBe(1);
  });

  it('should reset game on start-game', () => {
    let state = initialState;
    state = reducer(state, Actions.create['engine/game-tick'](null));
    state = reducer(state, Actions.create['player/start-game'](null));
    expect(selectSnake(state)).toEqual([{ x: 0, y: 0 }]);
    expect(selectScore(state)).toBe(0);
    expect(selectGameOver(state)).toBe(false);
  });
});
