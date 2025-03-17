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
    <Stage id={getStageId()} ref={stageRef} width={500} height={500}>
      <Layer>
        <Line
          points={[
            { x: 100, y: 100 },
            { x: 250, y: 250 },
            { x: 400, y: 400 },
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
