import { Group, Line as KonvaLine } from "react-konva";
import { Line as LineType } from "konva/lib/shapes/Line";
import { getTransformer } from "_features/transformer";
import { Anchor } from "_features/anchor";
import { useMemo, useRef } from "react";
import { Points } from "../model/line.types";

export interface LineProps {
  points: Points;
}

export const Line = (props: LineProps) => {
  const lineRef = useRef<LineType | null>(null);
  const formattedPoints = useMemo(() => {
    return props.points.flatMap((p) => [p.x, p.y]);
  }, [props.points]);
  return (
    <Group
      onClick={(e) => {
        const group = e.target.parent;
        if (!group) return;
        const tr = getTransformer();
        if (!tr) return;
        tr.nodes([group]);
        tr.moveToBottom();
        tr.getLayer()?.batchDraw();
      }}
      draggable
    >
      <KonvaLine
        ref={lineRef}
        tension={0.5}
        bezier={true}
        lineCap="round"
        stroke="white"
        strokeWidth={1}
        points={formattedPoints}
        hitStrokeWidth={20}
      />
      {[0, 1, 2].map((i) => (
        <Anchor
          key={`anchor-${i}`}
          onDragMove={(e) => {
            const x = e.target.x();
            const y = e.target.y();
            props.points[i].x = x;
            props.points[i].y = y;
            lineRef.current?.points(props.points.flatMap((p) => [p.x, p.y]));
          }}
          {...props.points[i]}
        />
      ))}
    </Group>
  );
};
