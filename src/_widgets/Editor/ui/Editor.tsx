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
import { getLayerId, getStageId } from "../lib";
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

export const Editor = () => {
  const [lines, setLines] = useState<ILine[]>([
    {
      id: uuidv4(),
      points: [
        { x: 100, y: 100 },
        { x: 250, y: 250 },
        { x: 400, y: 400 },
      ],
    },
  ]);
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
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Stage
      onMouseDown={(e) => {
        const isMouseOnStage = e.target._id === e.currentTarget._id;
        if (isMouseOnStage) {
          unSelectAllLines();
          if (e.evt.ctrlKey || e.evt.metaKey) {
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
      }}
      onMouseMove={(e) => {
        const stage = getStage();
        if (stage) {
          if (e.evt.ctrlKey || e.evt.metaKey) {
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
      }}
      onMouseUp={() => {
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
      }}
      id={getStageId()}
      ref={stageRef}
      width={500}
      height={500}
    >
      <Layer id={getLayerId()}>
        {lines.map((line, i) => {
          return <Line key={`line-${i}`} {...line} />;
        })}
      </Layer>
    </Stage>
  );
};
