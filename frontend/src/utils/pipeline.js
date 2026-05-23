import { DRAG_DATA_MIME } from '../config/constants';

export const buildNodeData = (nodeId, type) => ({
  id: nodeId,
  nodeType: type,
});

export const serializeDragPayload = (nodeType) =>
  JSON.stringify({ nodeType });

export const parseDragPayload = (dataTransfer) => {
  const raw =
    dataTransfer.getData(DRAG_DATA_MIME) ||
    dataTransfer.getData('text/plain');
  if (!raw) return null;

  try {
    const { nodeType } = JSON.parse(raw);
    return nodeType || null;
  } catch {
    return null;
  }
};
