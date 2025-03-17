import Konva from "konva";
import { getStageId } from "_widgets/Editor";
import { Stage } from "konva/lib/Stage";

export const getStageElement = () => document.getElementById(getStageId());

export const getStage = (): Stage | undefined => {
  const stageElement = getStageElement();
  return Konva.stages.find((s) => s.container() === stageElement);
};
