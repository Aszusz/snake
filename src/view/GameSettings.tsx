import { Actions } from '@/core/actions';
import { selectGameState, selectWidth, selectHeight } from '@/core/selectors';
import { useAppSelector, useAppDispatch } from '@/shell/hooks';
import { Slider } from '@/view/components/shadcn/slider';

function GameSettings() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(selectGameState);
  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);

  const disabled = gameState === 'playing';

  const setWidth = (value: number[]) => {
    dispatch(
      Actions.create['settings/set-dimensions']({ width: value[0], height }),
    );
  };

  const setHeight = (value: number[]) => {
    dispatch(
      Actions.create['settings/set-dimensions']({ width, height: value[0] }),
    );
  };

  return (
    <div className="flex w-64 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Width: {width}</label>
        <Slider
          value={[width]}
          onValueChange={setWidth}
          min={10}
          max={30}
          step={1}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Height: {height}</label>
        <Slider
          value={[height]}
          onValueChange={setHeight}
          min={10}
          max={30}
          step={1}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default GameSettings;
