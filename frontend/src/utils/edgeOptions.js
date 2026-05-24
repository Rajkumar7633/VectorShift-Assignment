import { MarkerType } from 'reactflow';

const markerEnd = {
  type: MarkerType.Arrow,
  width: 20,
  height: 20,
};

export const defaultEdgeOptions = {
  type: 'default',
  animated: true,
  markerEnd,
  style: { strokeWidth: 2 },
};

/**
 * Builds edge options with curved paths and spacing for parallel connections.
 */
export const buildEdgeOptions = (connection, existingEdges = []) => {
  const parallelFromSource = existingEdges.filter(
    (e) => e.source === connection.source
  );
  const parallelToTarget = existingEdges.filter(
    (e) => e.target === connection.target
  );
  const laneIndex = Math.max(parallelFromSource.length, parallelToTarget.length);
  const offset = laneIndex * 28;

  // Bezier for clean curves (including reverse / cycle test connections)
  if (laneIndex === 0) {
    return {
      type: 'default',
      animated: true,
      markerEnd,
      style: { strokeWidth: 2 },
    };
  }

  // Offset smoothstep lanes when multiple wires leave the same node
  return {
    type: 'smoothstep',
    animated: true,
    markerEnd,
    pathOptions: {
      borderRadius: 20,
      offset,
    },
    style: { strokeWidth: 2 },
  };
};
