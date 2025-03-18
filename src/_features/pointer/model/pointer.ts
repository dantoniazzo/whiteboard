import { getStage } from "_features/stage";

export const getPointerPosition = () => {
  return getStage()?.getPointerPosition();
};
