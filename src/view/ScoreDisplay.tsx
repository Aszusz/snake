import { selectScore, selectLevel } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import { useContext } from 'react';

function ScoreDisplay() {
  const store = useContext(StoreContext);
  const score = useSelector(store, selectScore);
  const level = useSelector(store, selectLevel);

  return (
    <div className="mt-4 text-xl font-semibold">
      Level {level} | Score: {score}
    </div>
  );
}

export default ScoreDisplay;
