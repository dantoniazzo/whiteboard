import Konva from 'konva';
import { ILine, Points } from './line.types';
import { v4 as uuidv4 } from 'uuid';
import { formatPoints } from './line.helpers';
import { LineConfig } from './line.config';
import { getStage } from '_entities/stage';
import { getLayer } from '_entities/layer';
import { NEW_LINE_ATTR } from '../lib';
import { findNode } from '_entities/node';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { getPointerPosition } from '_features/pointer';

export const createLine = (points: Points) => {
  const id = uuidv4();
  const newLine = new Konva.Line({
    id,
    points: formatPoints(points),
    ...LineConfig,
  });
  const stage = getStage();
  const layer = getLayer();
  if (stage && layer) {
    stage.setAttr(NEW_LINE_ATTR, id);
    layer.add(newLine);
    layer.batchDraw();
  }
};

export const drawLine = () => {
  const stage = getStage();
  const newLineId = stage?.getAttr(NEW_LINE_ATTR);
  if (newLineId) {
    const line = findNode(newLineId) as LineType;
    if (line) {
      const pointerPosition = getPointerPosition();
      const points = line.points();
      if (points && pointerPosition) {
        line.points([
          points[0],
          points[1],
          (pointerPosition.x + points[0]) / 2,
          (pointerPosition.y + points[1]) / 2,
          pointerPosition.x,
          pointerPosition.y,
        ]);
        line.getLayer()?.batchDraw();
      }
    }
  }
};

export const finishDrawingLine = (
  currentLines: ILine[],
  callback: (lines: ILine[]) => void
) => {
  const stage = getStage();
  if (!stage) return;
  const newLineId = stage.getAttr(NEW_LINE_ATTR);
  if (newLineId) {
    const line = findNode(newLineId) as LineType;
    stage.setAttr(NEW_LINE_ATTR, null);
    if (line) {
      const points = line.points();
      if (points) {
        line.remove();
        callback([
          ...currentLines,
          {
            id: newLineId,
            points: [
              { x: points[0], y: points[1] },
              { x: points[2], y: points[3] },
              { x: points[4], y: points[5] },
            ],
          },
        ]);
      }
    }
  }
};
