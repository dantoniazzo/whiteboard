import { useState } from 'react';
import { getLeftRailId, LEFT_RAIL_OPEN_ATTR_NAME } from '../lib';
import { LeftRailToggle } from './LeftRailToggle';
import { NodeTree, TreeNode } from '_widgets/NodeTree';

const initialData: TreeNode[] = [
  {
    id: '1',
    name: 'File',
    isExpanded: true,
    children: [
      {
        id: '2',
        name: 'Documents',
        isExpanded: true,
        children: [
          { id: '3', name: 'Work.doc' },
          { id: '4', name: 'Home.doc' },
        ],
      },
      {
        id: '5',
        name: 'Pictures',
        children: [
          { id: '6', name: 'Vacation.jpg' },
          { id: '7', name: 'Family.jpg' },
        ],
      },
      { id: '8', name: 'config.json' },
    ],
  },
];

export const LeftRail = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  return (
    <div
      {...{ [`data-${LEFT_RAIL_OPEN_ATTR_NAME}`]: 'false' }}
      id={getLeftRailId()}
      className={`absolute top-0 left-0 data-[left-rail-open=false]:-translate-x-full transition w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-full bg-gray-900`}
    >
      <LeftRailToggle />
      <NodeTree data={treeData} onUpdate={setTreeData} />
    </div>
  );
};
