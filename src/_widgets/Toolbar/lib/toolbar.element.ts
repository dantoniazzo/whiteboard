import { getDataAttribute } from '_shared';
import { Tools } from '../model';

export const TOOL_ATTR_NAME = 'tool';
export const getToolbarId = () => 'toolbar';
export const getToolbarElement = () => {
  return document.getElementById(getToolbarId());
};

export const getTool = (): Tools | undefined => {
  const toolbar = getToolbarElement();
  if (!toolbar) return;
  return getDataAttribute(toolbar, TOOL_ATTR_NAME) as Tools;
};
