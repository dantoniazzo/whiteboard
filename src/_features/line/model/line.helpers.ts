import { getLayer } from '_entities/layer';
import { Points } from './line.types';
import { LINE_NAME } from '../lib';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { LineConfig } from './line.config';

export const formatPoints = (points: Points) => {
  return points.flatMap((p) => [p.x, p.y]);
};

export const getAllLines = () => {
  const layer = getLayer();
  if (layer) {
    return layer.find(`.${LINE_NAME}`) as LineType[];
  }
};

export const selectLines = (lines: LineType[]) => {
  lines?.forEach((line) => {
    line.setAttr('selected', true);
    line.setAttr('stroke', 'blue');
  });
};

export const unSelectAllLines = () => {
  const allLines = getAllLines();
  allLines?.forEach((line) => {
    line.setAttr('selected', false);
    line.setAttr('stroke', LineConfig.stroke);
  });
};

export const getSelectedLines = () => {
  const allLines = getAllLines();
  return allLines?.filter((line) => line.getAttr('selected'));
};
