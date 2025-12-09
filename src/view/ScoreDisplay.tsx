import { selectScore, selectLevel } from '@/core/selectors';
import { useAppSelector } from '@/shell/hooks';

function ScoreDisplay() {
  const score = useAppSelector(selectScore);
  const level = useAppSelector(selectLevel);

  return (
    <div className="mt-4 text-xl font-semibold">
      Level {level} | Score: {score}
    </div>
  );
}

export default ScoreDisplay;
