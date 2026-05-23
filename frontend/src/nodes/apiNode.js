import { createNode, targetHandle, sourceHandle } from './createNode';

export const APINode = createNode({
  title: 'API',
  subtitle: 'HTTP request',
  icon: '🌐',
  accent: 'blue',
  width: 240,
  fields: [
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      default: 'https://api.example.com',
    },
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'GET',
    },
  ],
  handles: [targetHandle('body'), sourceHandle('response')],
});
