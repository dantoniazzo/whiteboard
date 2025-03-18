import { getEditorWrapperId } from "../lib";
import { Canvas } from "./";
import { Toolbar } from "_widgets/Toolbar";
export const Editor = () => {
  return (
    <div
      id={getEditorWrapperId()}
      className="bg-gray-800 w-full h-full rounded-lg shadow-lg border border-purple-700 shadow-purple-950/50 touch-none"
    >
      <Canvas />
      <Toolbar />
    </div>
  );
};
