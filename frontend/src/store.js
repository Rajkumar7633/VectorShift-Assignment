import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { buildEdgeOptions } from './utils/edgeOptions';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  pendingNodeType: null,

  setPendingNodeType: (type) => set({ pendingNodeType: type }),

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    newIDs[type] = (newIDs[type] ?? 0) + 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  clearPipeline: () => {
    set({ nodes: [], edges: [], nodeIDs: {}, pendingNodeType: null });
  },

  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    const edges = get().edges;
    set({
      edges: addEdge(
        {
          ...connection,
          ...buildEdgeOptions(connection, edges),
        },
        edges
      ),
    });
  },

  onReconnect: (oldEdge, newConnection) => {
    const edges = get().edges.filter((e) => e.id !== oldEdge.id);
    set({
      edges: addEdge(
        {
          ...newConnection,
          id: oldEdge.id,
          ...buildEdgeOptions(newConnection, edges),
        },
        edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },
}));
