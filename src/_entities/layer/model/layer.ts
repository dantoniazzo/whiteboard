import { getStage } from '_entities/stage';
import { getLayerId } from '_widgets';
import { Layer } from 'konva/lib/Layer';

export const getLayer = (): Layer | undefined => {
  const stage = getStage();
  return stage?.findOne(`#${getLayerId()}`);
};
