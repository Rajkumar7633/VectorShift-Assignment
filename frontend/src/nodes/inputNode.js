import { createNode, sourceHandle } from './createNode';

export const InputNode = createNode({
  title: 'Input',
  subtitle: 'Pipeline entry point',
  icon: '⬇',
  accent: 'blue',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customInput-', 'input_'),
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      default: 'Text',
    },
  ],
  handles: [sourceHandle('value')],
});
