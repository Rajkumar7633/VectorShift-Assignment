import { createNode, targetHandle, sourceHandle } from './createNode';

export const FilterNode = createNode({
  title: 'Filter',
  subtitle: 'Filter records by condition',
  icon: '🔍',
  accent: 'orange',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'text',
      default: 'status === "active"',
      placeholder: 'e.g. score > 10',
    },
  ],
  handles: [targetHandle('input'), sourceHandle('output')],
});
