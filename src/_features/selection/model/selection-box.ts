import Konva from "konva";
import { Position } from "_shared";
import { SELECTION_BOX_ID } from "../lib/constants";
import { selectionBoxConfig } from "./selection-box.config";
import { getLayer } from "_features/layer";
import { getStage } from "_features/stage";
import { Node } from "konva/lib/Node";
import { getAllLines } from "_features/line";

export const getSelectionBox = () => {
  const layer = getLayer();
  return layer?.findOne(`#${SELECTION_BOX_ID}`);
};

export const createSelectionBox = (position: Position) => {
  const rect = new Konva.Rect({
    id: SELECTION_BOX_ID,
    width: 0,
    height: 0,
    ...selectionBoxConfig,
    ...position,
  });

  // Store the initial position as custom attributes
  rect.setAttr("startX", position.x);
  rect.setAttr("startY", position.y);

  const layer = getLayer();
  layer?.add(rect);
};

export const updateSelectionBox = (position: Position) => {
  const boundingBox = getSelectionBox();
  if (boundingBox) {
    // Get the original starting position
    const startX = boundingBox.getAttr("startX");
    const startY = boundingBox.getAttr("startY");

    // Calculate width, height, and new position
    let newX = startX;
    let newY = startY;
    const width = Math.abs(position.x - startX);
    const height = Math.abs(position.y - startY);

    // Adjust position if mouse is moved left or upward
    if (position.x < startX) {
      newX = position.x;
    }
    if (position.y < startY) {
      newY = position.y;
    }

    // Update the bounding box
    boundingBox.position({ x: newX, y: newY });
    boundingBox.size({ width, height });
  }
};

export const getAllBoundingBoxes = () => {
  return getStage()?.find(`#${SELECTION_BOX_ID}`);
};

export const removeSelectionBoxes = () => {
  const boundingBoxes = getAllBoundingBoxes();
  boundingBoxes?.forEach((box: Node) => box.destroy());
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
