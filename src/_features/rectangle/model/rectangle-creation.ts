import Konva from 'konva';
import { Position } from '_shared';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { getLayer } from '_features/layer';
import { DRAWN_RECTANGLE_ID } from '../lib';
import { drawnRectangleConfig } from './rectangle-creation.config';

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
  });

  // Store the initial position as custom attribute
  rect.setAttr('start-position', config.position);
  const layer = getLayer();
  layer?.add(rect);
};

export const updateRectangle = (id: string, position: Position) => {
  const boundingBox = getDrawnRectangleBox(id);
  if (boundingBox) {
    // Get the original starting position
    const startPosition = boundingBox.getAttr('start-position') as Position;
    console.log('Start positon: ', startPosition);
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
    boundingBox.position({ x: newX, y: newY });
    boundingBox.size({ width, height });
  }
};
