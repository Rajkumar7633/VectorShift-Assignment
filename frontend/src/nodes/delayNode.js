import { createNode, targetHandle, sourceHandle } from './createNode';

export const DelayNode = createNode({
  title: 'Delay',
  subtitle: 'Wait before continuing',
  icon: '⏱',
  accent: 'gray',
  fields: [
    {
      name: 'seconds',
      label: 'Seconds',
      type: 'text',
      default: '1',
    },
  ],
  handles: [targetHandle('input'), sourceHandle('output')],
});
