import React, { useEffect, useState } from 'react';
import {
  getToolbarElement,
  getToolbarId,
  TOOL_ATTR_NAME,
} from '../lib/toolbar.element';
import { Tools, toolsConfig } from '../model/tools.config';
import { setDataAttribute } from '_shared';
import { Button } from '_shared';

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tool: Tools;
  selectedTool: Tools;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <Button
      disabled={!toolsConfig[props.tool].enabled}
      onClick={props.onClick}
      selected={props.selectedTool === props.tool}
    >
      {toolsConfig[props.tool].icon}
    </Button>
  );
};

export const Toolbar = () => {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.POINTER);

  const handleToolClick = (tool: Tools) => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      setDataAttribute(toolbar, TOOL_ATTR_NAME, tool);
      setCurrentTool(tool);
    }
  };

  useEffect(() => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      setDataAttribute(toolbar, TOOL_ATTR_NAME, currentTool);
    }
  }, []);

  return (
    <div
      id={getToolbarId()}
      className="absolute left-1/2 -translate-x-1/2 bottom-0 flex bg-gray-800"
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
