import React, { useState } from "react";
import { MousePointer2, PenTool } from "lucide-react";
import { getToolbarElement, getToolbarId } from "../lib/toolbar.element";

export const Toolbar = () => {
  const [currentTool, setCurrentTool] = useState("pen");

  const handleToolClick = (tool: string) => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      toolbar.setAttribute("data-tool", tool);
      setCurrentTool(tool);
    }
  };

  return (
    <div
      id={getToolbarId()}
      className="absolute left-1/2 bottom-5 flex bg-gray-800"
    >
      <button
        onClick={() => handleToolClick("pointer")}
        className={`p-2 text-white cursor-pointer ${
          currentTool === "pointer" ? "bg-gray-900" : "bg-gray-700"
        }`}
      >
        <MousePointer2 />
      </button>
      <button
        onClick={() => handleToolClick("pen")}
        className={`p-2 text-white cursor-pointer ${
          currentTool === "pen" ? "bg-gray-900" : "bg-gray-700"
        }`}
      >
        <PenTool />
      </button>
    </div>
  );
};
