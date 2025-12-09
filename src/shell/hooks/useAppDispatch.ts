import { StoreContext } from '../store';
import type { Action } from '@/core/actions';
import type { State } from '@/core/state';
import { useDispatch } from '@/lib/strict-redux/hooks';
import { useContext } from 'react';

export function useAppDispatch() {
  const store = useContext(StoreContext);
  return useDispatch<State, Action>(store);
}
