import { Actions } from '@/core/actions';
import { selectGameState, selectWidth, selectHeight } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import { Slider } from '@/view/components/shadcn/slider';
import { useContext } from 'react';

function GameSettings() {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const gameState = useSelector(store, selectGameState);
  const width = useSelector(store, selectWidth);
  const height = useSelector(store, selectHeight);

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
