import { StoreContext } from '../store';
import type { State } from '@/core/state';
import { useSelector } from '@/lib/strict-redux/hooks';
import type { StrictData } from '@/lib/strict-types';
import { useContext } from 'react';

export function useAppSelector<T extends StrictData>(
  selector: (state: State) => T,
): T {
  const store = useContext(StoreContext);
  return useSelector(store, selector);
}
