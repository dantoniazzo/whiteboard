export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isExpanded?: boolean;
}

export interface DragItem {
  id: string;
  depth: number;
}
