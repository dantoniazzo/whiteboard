import Konva from 'konva';
import { Stage as StageType } from 'konva/lib/Stage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import {
  createLine,
  drawLine,
  finishDrawingLine,
  getSelectedLines,
  ILine,
  Line,
  selectLines,
  unSelectAllLines,
} from '_features/line';
import { getEditorWrapperElement, getLayerId, getStageId } from '../lib';
import { getStage } from '_entities/stage';
import { getPointerPosition } from '_features/pointer';
import {
  createSelectionBox,
  findLinesIntersectingWithBox,
  getSelectionBox,
  removeSelectionBoxes,
  unSelectAllNodes,
  updateSelectionBox,
} from '_features/selection';
import { getTool } from '_widgets/Toolbar';
import { Tools } from '_widgets/Toolbar/model';
import {
  createRectangle,
  finishDrawingRectangle,
  updateRectangle,
} from '_features/rectangle';
import { getTransformerId } from '_entities/transformer';

export const Canvas = () => {
  const [lines, setLines] = useState<ILine[]>([]);
  const stageRef = useRef<StageType | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const selectedLines = getSelectedLines();

        const newLines = [...lines].filter(
          (line) =>
            !selectedLines?.find(
              (selectedLine) => selectedLine.id() === line.id
            )
        );
        selectedLines?.forEach((line) => {
          line.setAttr('selected', false);
          line.setAttr('stroke', 'white');
          line.getLayer()?.batchDraw();
        });
        setLines(newLines);
      }
    },
    [lines]
  );

  useEffect(() => {
    const editorWrapperElement = getEditorWrapperElement();
    getStage()?.size({
      width: editorWrapperElement?.clientWidth || 0,
      height: editorWrapperElement?.clientHeight || 0,
    });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handlePointerDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const isMouseOnStage = e.target._id === e.currentTarget._id;
    if (isMouseOnStage) {
      unSelectAllLines();
      unSelectAllNodes();
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createSelectionBox(pointerPosition);
        }
      } else if (getTool() === Tools.LINE) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createLine([pointerPosition, pointerPosition, pointerPosition]);
        }
      } else if (getTool() === Tools.RECTANGLE) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createRectangle({ position: pointerPosition });
        }
      }
    }
  };

  const handlePointerMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = getStage();
    if (stage) {
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          updateSelectionBox(pointerPosition);
        }
      } else if (getTool() === Tools.LINE) {
        drawLine();
      } else if (getTool() === Tools.RECTANGLE) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          updateRectangle(pointerPosition);
        }
      }
    }
  };

  const handlePointerUp = () => {
    const stage = getStage();
    if (stage) {
      if (getSelectionBox()) {
        const intersectingLines = findLinesIntersectingWithBox();
        if (intersectingLines) selectLines(intersectingLines);
      }
      removeSelectionBoxes();
      if (getTool() === Tools.LINE) {
        finishDrawingLine(lines, setLines);
      } else if (getTool() === Tools.RECTANGLE) {
        finishDrawingRectangle();
      }
    }
  };

  return (
    <Stage
      onTouchStart={handlePointerDown}
      onMouseDown={handlePointerDown}
      onTouchMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onMouseUp={handlePointerUp}
      id={getStageId()}
      ref={stageRef}
    >
      <Layer id={getLayerId()}>
        {lines.map((line, i) => {
          return <Line key={`line-${i}`} {...line} />;
        })}
        <Transformer
          anchorCornerRadius={4}
          borderStroke="black"
          anchorStroke="black"
          keepRatio={false}
          id={getTransformerId()}
        />
      </Layer>
    </Stage>
  );
};
