import { getEditorWrapperId } from "../lib";
import { Canvas } from "./";
import { Toolbar } from "_widgets/Toolbar";
export const Editor = () => {
  return (
    <div
      id={getEditorWrapperId()}
      className="bg-gray-800 w-full h-full touch-none"
    >
      <Canvas />
      <Toolbar />
    </div>
  );
};
