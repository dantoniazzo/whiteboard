import { getLayer } from "_features/layer";
import { Points } from "./line.types";
import { LINE_NAME } from "../lib";

export const formatPoints = (points: Points) => {
  return points.flatMap((p) => [p.x, p.y]);
};

export const getAllLines = () => {
  const layer = getLayer();
  if (layer) {
    return layer.find(`.${LINE_NAME}`);
  }
};

export const unSelectAllLines = () => {
  const allLines = getAllLines();
  allLines?.forEach((line) => {
    line.setAttr("selected", false);
    line.setAttr("stroke", "white");
  });
};
