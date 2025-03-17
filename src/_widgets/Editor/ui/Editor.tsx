import { Stage as StageType } from "konva/lib/Stage";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { Line } from "_features/line";
import { getStageId, getTransformerId } from "../lib";

export const Editor = () => {
  const stageRef = useRef<StageType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  return (
    <Stage
      id={getStageId()}
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        <Line
          points={[
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 300, y: 300 },
          ]}
        />
        <Transformer
          id={getTransformerId()}
          ref={transformerRef}
          shouldOverdrawWholeArea
        />
      </Layer>
    </Stage>
  );
};
