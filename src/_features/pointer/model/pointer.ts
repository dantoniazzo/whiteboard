import { getStage } from '_entities/stage';

export const getPointerPosition = () => {
  return getStage()?.getPointerPosition();
};
