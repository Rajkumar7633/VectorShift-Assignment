import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { extractVariables } from './parseVariables';

const MIN_WIDTH = 200;
const MIN_HEIGHT = 100;
const MAX_WIDTH = 420;

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const handleTextChange = useCallback((e) => {
    setCurrText(e.target.value);
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const scrollHeight = el.scrollHeight;
    el.style.height = `${scrollHeight}px`;

    const longestLine = currText.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, longestLine * 8 + 48));
    const height = Math.max(MIN_HEIGHT, scrollHeight + 72);

    setDimensions({ width, height });
  }, [currText]);

  const variableHandles = variables.map((varName, index) => {
    const top =
      variables.length === 1
        ? 50
        : 20 + (index / Math.max(variables.length - 1, 1)) * 60;
    return (
      <Handle
        key={varName}
        type="target"
        position={Position.Left}
        id={`${id}-${varName}`}
        style={{ top: `${top}%` }}
      />
    );
  });

  return (
    <BaseNode
      title="Text"
      subtitle="Template with {{variables}}"
      icon="📝"
      accent="teal"
      style={{ width: dimensions.width, minHeight: dimensions.height }}
      handles={[
        {
          type: 'source',
          position: 'right',
          id: `${id}-output`,
        },
      ]}
    >
      {variableHandles}
      <label className="base-node__field">
        <span className="base-node__label">Text</span>
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={currText}
          onChange={handleTextChange}
          placeholder="Use {{variableName}} for inputs"
          rows={2}
        />
      </label>
      {variables.length > 0 && (
        <div className="text-node__variables">
          {variables.map((v) => (
            <span key={v} className="text-node__var-chip">
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
