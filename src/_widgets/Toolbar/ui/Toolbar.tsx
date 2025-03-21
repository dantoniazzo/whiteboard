import React, { useState } from 'react';
import { getToolbarElement, getToolbarId } from '../lib/toolbar.element';
import { Tools, toolsConfig } from '../model/tools.config';

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tool: Tools;
  selectedTool: Tools;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <button
      disabled={!toolsConfig[props.tool].enabled}
      onClick={props.onClick}
      className={`p-2 text-white cursor-pointer ${
        props.selectedTool === props.tool ? 'bg-gray-900' : 'bg-gray-700'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {toolsConfig[props.tool].icon}
    </button>
  );
};

export const Toolbar = () => {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.LINE);

  const handleToolClick = (tool: Tools) => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      toolbar.setAttribute('data-tool', tool);
      setCurrentTool(tool);
    }
  };

  return (
    <div
      id={getToolbarId()}
      className="absolute left-1/2 -translate-x-1/2 bottom-5 flex bg-gray-800"
    >
      {Object.values(Tools).map((tool) => (
        <ToolbarButton
          key={tool}
          onClick={() => handleToolClick(tool)}
          icon={toolsConfig[tool].icon}
          tool={tool}
          selectedTool={currentTool}
        />
      ))}
    </div>
  );
};
