import { createNode, targetHandle, sourceHandle } from './createNode';

export const ConditionNode = createNode({
  title: 'Condition',
  subtitle: 'Branch on true/false',
  icon: '⑂',
  accent: 'pink',
  width: 230,
  fields: [
    {
      name: 'expression',
      label: 'Expression',
      type: 'text',
      default: 'value > 0',
    },
  ],
  handles: [
    targetHandle('input', 40),
    sourceHandle('true'),
    { type: 'source', position: 'right', suffix: 'false', style: { top: '75%' } },
  ],
});
