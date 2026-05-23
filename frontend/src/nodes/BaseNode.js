import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const isLeft = (pos) => pos === 'left' || pos === Position.Left;
const isRight = (pos) => pos === 'right' || pos === Position.Right;

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon,
  accent = 'purple',
  children,
  handles = [],
  style = {},
  className = '',
}) => {
  const removeNode = useStore((state) => state.removeNode);

  const handleClose = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (id) removeNode(id);
  };

  return (
    <div
      className={`base-node base-node--${accent} ${className}`}
      style={style}
    >
      {handles.filter((h) => isLeft(h.position)).map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={POSITION_MAP[handle.position] || handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div className="base-node__header">
        <div className="base-node__header-left">
          {icon && <span className="base-node__icon">{icon}</span>}
          <div className="base-node__titles">
            <span className="base-node__title">{title}</span>
            {subtitle && (
              <span className="base-node__subtitle">{subtitle}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="base-node__close nodrag"
          aria-label={`Remove ${title} node`}
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <div className="base-node__body">{children}</div>

      {handles.filter((h) => isRight(h.position)).map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={POSITION_MAP[handle.position] || handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export const renderNodeFields = (fields, values, onChange) =>
  fields.map((field) => {
    const value = values[field.name] ?? '';

    if (field.type === 'select') {
      return (
        <label key={field.name} className="base-node__field">
          <span className="base-node__label">{field.label}</span>
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <label
          key={field.name}
          className="base-node__field base-node__field--checkbox"
        >
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(field.name, e.target.checked)}
          />
          <span className="base-node__label">{field.label}</span>
        </label>
      );
    }

    if (field.type === 'textarea') {
      return (
        <label key={field.name} className="base-node__field">
          <span className="base-node__label">{field.label}</span>
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={field.rows || 3}
            placeholder={field.placeholder}
          />
        </label>
      );
    }

    return (
      <label key={field.name} className="base-node__field">
        <span className="base-node__label">{field.label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
        />
      </label>
    );
  });
