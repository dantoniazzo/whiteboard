import { Circle } from "react-konva";

// Use React's utility type to extract props from Circle component
type CircleProps = React.ComponentProps<typeof Circle>;

export const Anchor = (props: CircleProps) => {
  return (
    <Circle
      x={props.x}
      y={props.y}
      radius={5}
      fill={"red"}
      onPointerEnter={(e) => {
        e.target.to({
          scaleX: 1.5,
          scaleY: 1.5,
          duration: 0.1,
        });
        e.target.getLayer()?.batchDraw();
      }}
      onPointerLeave={(e) => {
        e.target.to({
          scaleX: 1,
          scaleY: 1,
          duration: 0.1,
        });
        e.target.getLayer()?.batchDraw();
      }}
      name="circle"
      stroke={"blue"}
      draggable
      {...props} // Pass all remaining props to Circle
    />
  );
};
