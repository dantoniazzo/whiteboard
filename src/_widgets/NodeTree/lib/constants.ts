import { TreeNode } from '_widgets/NodeTree';

export const initialData: TreeNode[] = [
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
