import { constructDataAttribute } from '_shared';
import { getNodeTreeElement } from './node-tree.element';

export enum NodeTreeAttributes {
  NEW_FILE = 'new-file',
  UPDATED_FILE = 'updated-file',
  DELETED_FILE = 'deleted-file',
}

export const getNodeTreeAttribute = (attribute: NodeTreeAttributes) => {
  return getNodeTreeElement()?.getAttribute(constructDataAttribute(attribute));
};

export const setNodeTreeAttribute = (
  attribute: NodeTreeAttributes,
  value: string
) => {
  const nodeTree = getNodeTreeElement();
  if (nodeTree) {
    nodeTree.setAttribute(constructDataAttribute(attribute), value);
  }
};

export const removeNodeTreeAttribute = (attribute: NodeTreeAttributes) => {
  const nodeTree = getNodeTreeElement();
  if (nodeTree) {
    nodeTree.removeAttribute(constructDataAttribute(attribute));
  }
};
