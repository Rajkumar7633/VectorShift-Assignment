import { createNode, targetHandle, sourceHandle } from './createNode';

export const LLMNode = createNode({
  title: 'LLM',
  subtitle: 'Large language model',
  icon: '🤖',
  accent: 'purple',
  width: 240,
  minHeight: 120,
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: ['gpt-4o', 'gpt-4o-mini', 'claude-3.5'],
      default: 'gpt-4o',
    },
  ],
  handles: [
    targetHandle('system', 33),
    targetHandle('prompt', 66),
    sourceHandle('response'),
  ],
  renderExtra: () => (
    <p className="base-node__hint">Connect system &amp; prompt inputs on the left.</p>
  ),
});
