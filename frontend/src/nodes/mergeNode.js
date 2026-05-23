import { createNode, targetHandle, sourceHandle } from './createNode';

export const MergeNode = createNode({
  title: 'Merge',
  subtitle: 'Combine multiple inputs',
  icon: '⊕',
  accent: 'indigo',
  fields: [
    {
      name: 'strategy',
      label: 'Strategy',
      type: 'select',
      options: ['Concatenate', 'Zip', 'First'],
      default: 'Concatenate',
    },
  ],
  handles: [
    targetHandle('a', 30),
    targetHandle('b', 70),
    sourceHandle('merged'),
  ],
});
