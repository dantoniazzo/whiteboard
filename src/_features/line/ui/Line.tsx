import { Group, Line as KonvaLine } from 'react-konva';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { Anchor } from '_features/anchor';
import { useMemo, useRef } from 'react';
import { ILine } from '../model/line.types';
import { formatPoints, LineConfig, unSelectAllLines } from '../model';
import { LINE_NAME } from '../lib';

export const Line = (props: ILine) => {
  const lineRef = useRef<LineType | null>(null);
  const formattedPoints = useMemo(
    () => formatPoints(props.points),
    [props.points]
  );
  return (
    <Group draggable>
      <KonvaLine
        id={props.id}
        name={LINE_NAME}
        ref={lineRef}
        {...LineConfig}
        points={formattedPoints}
        onMouseDown={() => {
          unSelectAllLines();
        }}
        onMouseUp={(e) => {
          e.target.setAttr('selected', true);
          e.target.setAttr('stroke', 'blue');
          e.target.getLayer()?.batchDraw();
        }}
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
