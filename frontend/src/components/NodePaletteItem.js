import { useStore } from '../store';
import { serializeDragPayload } from '../utils/pipeline';

export const NodePaletteItem = ({ type, label, icon, color }) => {
  const setPendingNodeType = useStore((s) => s.setPendingNodeType);

  const handleDragStart = (event) => {
    const payload = serializeDragPayload(type);
    event.dataTransfer.setData('application/reactflow', payload);
    event.dataTransfer.setData('text/plain', payload);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      type="button"
      className="palette-tile"
      style={{ '--tile-accent': color }}
      onDragStart={handleDragStart}
      onClick={() => setPendingNodeType(type)}
      draggable
      title={`Add ${label}`}
    >
      <span className="palette-tile__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="palette-tile__label">{label}</span>
    </button>
  );
};
