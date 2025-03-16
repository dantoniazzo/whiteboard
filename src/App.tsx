import { Stage as StageType } from "konva/lib/Stage";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Line as LineType, LineConfig } from "konva/lib/shapes/Line";
import { useRef } from "react";
import {
  Stage,
  Layer,
  Star,
  Text,
  Line,
  Transformer,
  Circle,
} from "react-konva";

function App() {
  const stageRef = useRef<StageType | null>(null);
  const lineRef = useRef<LineType<LineConfig>>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Star
          draggable
          x={100}
          y={100}
          numPoints={5}
          innerRadius={40}
          outerRadius={70}
          fill="#89b717"
          stroke="#89b717"
          strokeWidth={4}
        />
        <Text draggable text="Hello World!" />
        <Line
          onClick={() => {
            const tr = transformerRef.current;
            const line = lineRef.current;
            if (!tr || !line) return;
            tr.nodes([line]);
            tr.getLayer()?.batchDraw();
          }}
          ref={lineRef}
          draggable
          lineCap="round"
          stroke={"black"}
          strokeWidth={2}
          points={[100, 100, 200, 200, 300, 300]}
          hitStrokeWidth={20}
          onDragMove={(e) => {
            stageRef.current?.find(".circle").forEach((circle) => {
              circle.x(circle.x() + e.evt.movementX);
              circle.y(circle.y() + e.evt.movementY);
            });
          }}
        />
        <Circle
          name="circle"
          x={100}
          y={100}
          width={5}
          height={5}
          stroke={"blue"}
        />
        <Circle
          name="circle"
          x={200}
          y={200}
          width={5}
          height={5}
          stroke={"blue"}
        />
        <Circle
          name="circle"
          x={300}
          y={300}
          width={5}
          height={5}
          stroke={"blue"}
        />
        <Transformer ref={transformerRef} shouldOverdrawWholeArea />
      </Layer>
    </Stage>
  );
}

export default App;
