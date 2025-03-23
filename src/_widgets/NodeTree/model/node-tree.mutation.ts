import { TreeNode } from '_widgets/NodeTree';
import { useState } from 'react';
import { initialData } from '../lib';

export const cloneNode = (node: TreeNode): TreeNode => ({
  ...node,
  children: node.children ? node.children.map(cloneNode) : undefined,
});

export const removeNode = (nodes: TreeNode[], id: string): TreeNode[] => {
  return nodes.filter((node) => {
    if (node.id === id) return false;
    if (node.children) {
      node.children = removeNode(node.children, id);
    }
    return true;
  });
};

export const insertNode = (
  nodes: TreeNode[],
  targetId: string,
  nodeToInsert: TreeNode,
  position: 'before' | 'after' | 'inside'
): TreeNode[] => {
  const result: TreeNode[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.id === targetId) {
      if (position === 'before') {
        result.push(nodeToInsert, node);
      } else if (position === 'after') {
        result.push(node, nodeToInsert);
      } else {
        // inside
        result.push({
          ...node,
          children: [...(node.children || []), nodeToInsert],
          isExpanded: true,
        });
      }
    } else {
      const newNode = { ...node };
      if (node.children) {
        newNode.children = insertNode(
          node.children,
          targetId,
          nodeToInsert,
          position
        );
      }
      result.push(newNode);
    }
  }

  return result;
};

export const useNodeTreeMutation = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);

  const addFile = () => {};

  const updateFile = () => {};

  const deleteFile = () => {};

  return {
    treeData,
    setTreeData,
    addFile,
    updateFile,
    deleteFile,
  };
};
