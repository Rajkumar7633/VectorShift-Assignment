import { createNode, targetHandle } from './createNode';

export const OutputNode = createNode({
  title: 'Output',
  subtitle: 'Pipeline result',
  icon: '⬆',
  accent: 'green',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      default: 'Text',
    },
  ],
  handles: [targetHandle('value')],
});
