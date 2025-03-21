import Konva from 'konva';
import { Position } from '_shared';
import { selectionBoxConfig } from './selection-box.config';
import { getStage } from '_entities/stage';
import { Node } from 'konva/lib/Node';
import { getAllLines } from '_features/line';
import {
  getDrawnRectangleBox,
  createRectangle,
  updateRectangle,
} from '_features/rectangle';
import { SELECTION_BOX_ID } from '../lib';

export const getSelectionBox = () => {
  return getDrawnRectangleBox(SELECTION_BOX_ID);
};

export const createSelectionBox = (position: Position) => {
  createRectangle({
    id: SELECTION_BOX_ID,
    position,
    ...selectionBoxConfig,
  });
};

export const updateSelectionBox = (position: Position) => {
  updateRectangle(position, SELECTION_BOX_ID);
};

export const getAllSelectionBoxes = () => {
  return getStage()?.find(`#${SELECTION_BOX_ID}`);
};

export const removeSelectionBoxes = () => {
  const selectionBoxes = getAllSelectionBoxes();
  selectionBoxes?.forEach((box: Node) => box.destroy());
};

export const findLinesIntersectingWithBox = () => {
  const selectionBox = getSelectionBox();
  const allLines = getAllLines();
  if (selectionBox && allLines?.length) {
    const box = selectionBox.getClientRect();
    return allLines.filter((line) => {
      const linePoints = line.points();
      if (linePoints) {
        const lineBoundingBox = {
          x: Math.min(linePoints[0], linePoints[2], linePoints[4]),
          y: Math.min(linePoints[1], linePoints[3], linePoints[5]),
          width: Math.abs(linePoints[0] - linePoints[2]),
          height: Math.abs(linePoints[1] - linePoints[3]),
        };
        return Konva.Util.haveIntersection(box, lineBoundingBox);
      }
      return false;
    });
  }
};
