import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { FilterNode } from './filterNode';
import { APINode } from './apiNode';
import { DelayNode } from './delayNode';
import { ConditionNode } from './conditionNode';
import { MergeNode } from './mergeNode';

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  api: APINode,
  delay: DelayNode,
  condition: ConditionNode,
  merge: MergeNode,
};

/** VectorShift-style top toolbar categories */
export const toolbarCategories = [
  'General',
  'LLMs',
  'Knowledge Base',
  'Integrations',
  'Logic',
];

export const toolbarNodes = [
  {
    type: 'customInput',
    label: 'Input',
    category: 'General',
    icon: '⬇',
    color: '#3b82f6',
  },
  {
    type: 'customOutput',
    label: 'Output',
    category: 'General',
    icon: '⬆',
    color: '#10b981',
  },
  {
    type: 'text',
    label: 'Text',
    category: 'General',
    icon: 'T',
    color: '#14b8a6',
  },
  {
    type: 'llm',
    label: 'OpenAI',
    category: 'LLMs',
    icon: '◆',
    color: '#8b5cf6',
  },
  {
    type: 'filter',
    label: 'Filter',
    category: 'Knowledge Base',
    icon: '🔍',
    color: '#f97316',
  },
  {
    type: 'api',
    label: 'API',
    category: 'Integrations',
    icon: '🌐',
    color: '#0ea5e9',
  },
  {
    type: 'condition',
    label: 'Condition',
    category: 'Logic',
    icon: '⑂',
    color: '#ec4899',
  },
  {
    type: 'merge',
    label: 'Merge',
    category: 'Logic',
    icon: '⊕',
    color: '#6366f1',
  },
  {
    type: 'delay',
    label: 'Delay',
    category: 'Logic',
    icon: '⏱',
    color: '#64748b',
  },
];
