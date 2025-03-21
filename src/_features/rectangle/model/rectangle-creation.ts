import Konva from 'konva';
import { Position } from '_shared';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { getLayer } from '_entities/layer';
import { DRAWN_RECTANGLE_ID } from '../lib';
import { drawnRectangleConfig } from './rectangle.config';
import { v4 as uuidv4 } from 'uuid';
import { selectNode } from '_features/selection';

export const getDrawnRectangleBox = (id: string) => {
  const layer = getLayer();
  return layer?.findOne(`#${id || DRAWN_RECTANGLE_ID}`);
};

export const createRectangle = (config: RectConfig) => {
  const rect = new Konva.Rect({
    id: config.id || DRAWN_RECTANGLE_ID,
    width: 0,
    height: 0,
    ...drawnRectangleConfig,
    ...config,
    draggable: true,
  });

  // Store the initial position as custom attribute
  rect.setAttr('start-position', config.position);
  rect.on('click', () => {
    selectNode(rect);
  });
  const layer = getLayer();
  layer?.add(rect);
};

export const updateRectangle = (position: Position, id?: string) => {
  const rect = getDrawnRectangleBox(id || DRAWN_RECTANGLE_ID);
  if (rect) {
    // Get the original starting position
    const startPosition = rect.getAttr('start-position') as Position;
    // Calculate width, height, and new position
    let newX = startPosition.x;
    let newY = startPosition.y;
    const width = Math.abs(position.x - startPosition.x);
    const height = Math.abs(position.y - startPosition.y);

    // Adjust position if mouse is moved left or upward
    if (position.x < startPosition.x) {
      newX = position.x;
    }
    if (position.y < startPosition.y) {
      newY = position.y;
    }

    // Update the bounding box
    rect.position({ x: newX, y: newY });
    rect.size({ width, height });
  }
};

export const finishDrawingRectangle = (id?: string) => {
  const rect = getDrawnRectangleBox(id || DRAWN_RECTANGLE_ID);
  if (rect) {
    rect.id(uuidv4());
    rect.setAttr('start-position', null);
  }
};
