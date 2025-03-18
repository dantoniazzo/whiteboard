import Konva from "konva";
import { Stage as StageType } from "konva/lib/Stage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Line as LineType } from "konva/lib/shapes/Line";
import {
  formatPoints,
  getSelectedLines,
  ILine,
  Line,
  LineConfig,
  NEW_LINE_ATTR,
  selectLines,
  unSelectAllLines,
} from "_features/line";
import { getEditorWrapperElement, getLayerId, getStageId } from "../lib";
import { Points } from "_features/line";
import { v4 as uuidv4 } from "uuid";
import { getStage } from "_features/stage";
import { getLayer } from "_features/layer";
import { getPointerPosition } from "_features/pointer";
import {
  createSelectionBox,
  findLinesIntersectingWithBox,
  getSelectionBox,
  removeSelectionBoxes,
  updateSelectionBox,
} from "_features/selection";
import { getTool } from "_widgets/Toolbar";

export const Canvas = () => {
  const [lines, setLines] = useState<ILine[]>([]);
  const stageRef = useRef<StageType | null>(null);

  const findLine = (id: string) => {
    const layer = getLayer();
    if (layer) {
      return layer.findOne(`#${id}`);
    }
  };

  const createLine = (points: Points) => {
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

  const deleteLine = (id: string) => {
    setLines((lines) => lines.filter((line) => line.id !== id));
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        const selectedLines = getSelectedLines();

        const newLines = [...lines].filter(
          (line) =>
            !selectedLines?.find(
              (selectedLine) => selectedLine.id() === line.id
            )
        );
        selectedLines?.forEach((line) => {
          line.setAttr("selected", false);
          line.setAttr("stroke", "white");
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
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handlePointerDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    e.cancelBubble = true;
    e.evt.stopPropagation();
    const isMouseOnStage = e.target._id === e.currentTarget._id;
    if (isMouseOnStage) {
      unSelectAllLines();
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === "pointer") {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createSelectionBox(pointerPosition);
        }
      } else {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          createLine([pointerPosition, pointerPosition, pointerPosition]);
        }
      }
    }
  };

  const handlePointerMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    e.cancelBubble = true;
    e.evt.stopPropagation();
    const stage = getStage();
    if (stage) {
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === "pointer") {
        const pointerPosition = getPointerPosition();
        if (pointerPosition) {
          updateSelectionBox(pointerPosition);
        }
      } else {
        removeSelectionBoxes();
        const newLineId = stage.getAttr(NEW_LINE_ATTR);
        if (newLineId) {
          const line = findLine(newLineId) as LineType;
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
      }
    }
  };

  const handlePointerUp = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    e.cancelBubble = true;
    e.evt.stopPropagation();
    const stage = getStage();
    if (stage) {
      if (getSelectionBox()) {
        const intersectingLines = findLinesIntersectingWithBox();
        if (intersectingLines) selectLines(intersectingLines);
      }
      removeSelectionBoxes();
      const newLineId = stage.getAttr(NEW_LINE_ATTR);
      if (newLineId) {
        const line = findLine(newLineId) as LineType;
        stage.setAttr(NEW_LINE_ATTR, null);
        if (line) {
          const points = line.points();
          if (points) {
            line.remove();
            setLines((lines) => [
              ...lines,
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
      </Layer>
    </Stage>
  );
};
