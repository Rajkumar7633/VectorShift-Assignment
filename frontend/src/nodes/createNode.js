import { useState, useCallback } from 'react';
import { BaseNode, renderNodeFields } from './BaseNode';

const resolveDefault = (defaultValue, id, data) => {
  if (typeof defaultValue === 'function') {
    return defaultValue(id, data);
  }
  return defaultValue ?? '';
};

export const createNode = ({
  title,
  subtitle,
  icon,
  accent = 'purple',
  fields = [],
  handles = [],
  width = 220,
  minHeight = 100,
  renderExtra,
}) => {
  const NodeComponent = ({ id, data }) => {
    const initialValues = fields.reduce((acc, field) => {
      acc[field.name] =
        data?.[field.name] ?? resolveDefault(field.default, id, data);
      return acc;
    }, {});

    const [values, setValues] = useState(initialValues);

    const onChange = useCallback((name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const resolvedHandles = handles.map((handle) => ({
      ...handle,
      id: handle.id?.replace('{id}', id) ?? `${id}-${handle.suffix || 'value'}`,
      position: handle.position || 'right',
      style: handle.style,
    }));

    return (
      <BaseNode
        title={title}
        subtitle={subtitle}
        icon={icon}
        accent={accent}
        handles={resolvedHandles}
        style={{ width, minHeight }}
      >
        {renderNodeFields(fields, values, onChange)}
        {renderExtra?.({ id, data, values, onChange })}
      </BaseNode>
    );
  };

  NodeComponent.displayName = title;
  return NodeComponent;
};

export const targetHandle = (suffix, topPercent) => ({
  type: 'target',
  position: 'left',
  suffix,
  style: topPercent != null ? { top: `${topPercent}%` } : undefined,
});

export const sourceHandle = (suffix) => ({
  type: 'source',
  position: 'right',
  suffix,
});
