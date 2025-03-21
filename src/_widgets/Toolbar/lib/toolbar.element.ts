import { Tools } from '../model';

export const TOOL_ATTR_NAME = 'data-tool';
export const getToolbarId = () => 'toolbar';
export const getToolbarElement = () => {
  return document.getElementById(getToolbarId());
};

export const getTool = (): Tools | undefined | null => {
  return getToolbarElement()?.getAttribute(TOOL_ATTR_NAME) as Tools;
};
