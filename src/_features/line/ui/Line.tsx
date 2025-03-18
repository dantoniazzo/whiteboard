import { Group, Line as KonvaLine } from "react-konva";
import { Line as LineType } from "konva/lib/shapes/Line";
import { Anchor } from "_features/anchor";
import { useMemo, useRef } from "react";
import { Points } from "../model/line.types";
import { formatPoints, LineConfig } from "../model";
import { LINE_NAME } from "../lib";

export interface LineProps {
  points: Points;
}

export const Line = (props: LineProps) => {
  const lineRef = useRef<LineType | null>(null);
  const formattedPoints = useMemo(
    () => formatPoints(props.points),
    [props.points]
  );
  return (
    <Group
      onClick={(e) => {
        e.target.setAttr("selected", true);
        e.target.setAttr("stroke", "blue");
        e.target.getLayer()?.batchDraw();
      }}
      draggable
    >
      <KonvaLine
        name={LINE_NAME}
        ref={lineRef}
        {...LineConfig}
        points={formattedPoints}
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
