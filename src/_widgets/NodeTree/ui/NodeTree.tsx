import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MoreHorizontal } from 'lucide-react';
import { TreeNode } from '../model/node-tree.types';

interface NodeTreeProps {
  data: TreeNode[];
  onUpdate: (nodes: TreeNode[]) => void;
}

export const NodeTree: React.FC<NodeTreeProps> = ({ data, onUpdate }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<
    'before' | 'after' | 'inside' | null
  >(null);

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedItem(nodeId);
    e.dataTransfer.setData('text/plain', nodeId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const isDescendant = (parentId: string, childId: string): boolean => {
    const findNode = (nodes: TreeNode[], id: string): boolean => {
      for (const node of nodes) {
        if (node.id === id) return true;
        if (node.children && findNode(node.children, id)) return true;
      }
      return false;
    };

    const parent = findNodeById(data, parentId);
    return parent?.children ? findNode(parent.children, childId) : false;
  };

  const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDragOver = (e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || draggedItem === nodeId) {
      e.dataTransfer.dropEffect = 'none';
      setDropTarget(null);
      setDropPosition(null);
      return;
    }

    // Prevent dropping into descendant nodes
    if (isDescendant(draggedItem, nodeId)) {
      e.dataTransfer.dropEffect = 'none';
      setDropTarget(null);
      setDropPosition(null);
      return;
    }

    e.dataTransfer.dropEffect = 'move';

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    let position: 'before' | 'after' | 'inside';
    if (y < threshold) {
      position = 'before';
    } else if (y > rect.height - threshold) {
      position = 'after';
    } else {
      position = 'inside';
    }

    setDropTarget(nodeId);
    setDropPosition(position);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only clear if we're actually leaving the node (not entering a child)
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest('.tree-node')) {
      setDropPosition(null);
      setDropTarget(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTarget(null);
    setDropPosition(null);
  };

  const findNodeAndParent = (
    nodes: TreeNode[],
    id: string,
    parent: TreeNode | null = null
  ): [TreeNode | null, TreeNode | null] => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === id) return [node, parent];
      if (node.children) {
        const [found, foundParent] = findNodeAndParent(node.children, id, node);
        if (found) return [found, foundParent];
      }
    }
    return [null, null];
  };

  const cloneNode = (node: TreeNode): TreeNode => ({
    ...node,
    children: node.children ? node.children.map(cloneNode) : undefined,
  });

  const removeNode = (nodes: TreeNode[], id: string): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = removeNode(node.children, id);
      }
      return true;
    });
  };

  const insertNode = (
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

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || draggedItem === targetId || !dropPosition) return;

    // Prevent dropping into descendant nodes
    if (isDescendant(draggedItem, targetId)) return;

    // Find the dragged node and its parent
    const [draggedNode] = findNodeAndParent(data, draggedItem);
    if (!draggedNode) return;

    // Create a deep clone of the dragged node
    const draggedNodeClone = cloneNode(draggedNode);

    // Remove the dragged node from its current position
    let updatedData = removeNode([...data], draggedItem);

    // Insert the cloned node at the new position
    updatedData = insertNode(
      updatedData,
      targetId,
      draggedNodeClone,
      dropPosition
    );

    onUpdate(updatedData);
    setDraggedItem(null);
    setDropTarget(null);
    setDropPosition(null);
  };

  const toggleExpand = (nodeId: string) => {
    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    onUpdate(updateNodes(data));
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOver = dropTarget === node.id;
    const isDragging = draggedItem === node.id;

    return (
      <div key={node.id} className="select-none tree-node">
        <div
          className={`flex items-center px-2 py-1 hover:bg-black relative ${
            isOver && dropPosition === 'inside' ? 'bg-gray-800' : ''
          } ${isDragging ? 'opacity-50' : ''}`}
          style={{ paddingLeft: `${depth * 20}px` }}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, node.id)}
        >
          {isOver && dropPosition === 'before' && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 transform -translate-y-1/2" />
          )}
          {isOver && dropPosition === 'after' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform translate-y-1/2" />
          )}
          <button
            onClick={() => toggleExpand(node.id)}
            className={`w-6 h-6 flex items-center justify-center ${
              !hasChildren ? 'invisible' : ''
            }`}
          >
            {hasChildren &&
              (node.isExpanded ? (
                <ChevronDown className="w-4 h-4 stroke-white" />
              ) : (
                <ChevronRight className="w-4 h-4 stroke-white" />
              ))}
          </button>
          <span className="flex-1 px-2 text-white overflow-hidden whitespace-nowrap text-ellipsis">
            {node.name}
          </span>
          <div className="opacity-0 hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-gray-200 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        {hasChildren && node.isExpanded && (
          <div>
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm">
      {data.map((node) => renderNode(node))}
    </div>
  );
};
