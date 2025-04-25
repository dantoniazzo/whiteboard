import Konva from "konva";
import { Stage as StageType } from "konva/lib/Stage";
import { useEffect, useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import {
  createLine,
  drawLine,
  finishDrawingLine,
  selectLines,
  unSelectAllLines,
} from "_features/line";
import { getEditorWrapperElement, getLayerId, getStageId } from "../lib";
import { getStage } from "_entities/stage";
import { getPointerPosition } from "_features/pointer";
import {
  createSelectionBox,
  findLinesIntersectingWithBox,
  getSelectionBox,
  removeSelectionBoxes,
  unSelectAllNodes,
  updateSelectionBox,
} from "_features/selection";
import { getTool } from "_widgets/Toolbar";
import { Tools } from "_widgets/Toolbar/model";
import {
  createRectangle,
  finishDrawingRectangle,
  updateRectangle,
} from "_features/rectangle";
import { getTransformerId } from "_entities/transformer";
import { setNewFileType } from "_widgets/NodeTree";
import { NodeTypes } from "_entities/node";

export const Canvas = () => {
  const stageRef = useRef<StageType | null>(null);

  useEffect(() => {
    const editorWrapperElement = getEditorWrapperElement();
    getStage()?.size({
      width: editorWrapperElement?.clientWidth || 0,
      height: editorWrapperElement?.clientHeight || 0,
    });
  }, []);

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
          setNewFileType(NodeTypes.LINE);
        }
      } else if (getTool() === Tools.RECTANGLE) {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createRectangle({ position: pointerPosition });
          setNewFileType(NodeTypes.RECTANGLE);
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
        finishDrawingLine();
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
        <Transformer
          anchorCornerRadius={4}
          borderStroke="black"
          anchorStroke="black"
          anchorStrokeWidth={2}
          keepRatio={false}
          id={getTransformerId()}
        />
      </Layer>
    </Stage>
  );
};
