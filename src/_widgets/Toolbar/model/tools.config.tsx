import { MousePointer2, Spline, Square, Type, Pencil } from 'lucide-react';

export enum Tools {
  POINTER = 'pointer',
  DRAWING = 'drawing',
  RECTANGLE = 'rectangle',
  LINE = 'line',
  TEXT = 'text',
}

export interface ToolConfig {
  icon: React.ReactNode;
  enabled: boolean;
}

export const toolsConfig: { [key in Tools]: ToolConfig } = {
  [Tools.POINTER]: {
    icon: <MousePointer2 />,
    enabled: true,
  },
  [Tools.LINE]: {
    icon: <Spline />,
    enabled: true,
  },
  [Tools.RECTANGLE]: {
    icon: <Square />,
    enabled: false,
  },
  [Tools.TEXT]: {
    icon: <Type />,
    enabled: false,
  },
  [Tools.DRAWING]: {
    icon: <Pencil />,
    enabled: false,
  },
};
