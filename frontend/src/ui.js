import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from './nodes/nodeRegistry';
import { CanvasEmptyState } from './components/CanvasEmptyState';
import { usePipelineDrop } from './hooks/usePipelineDrop';
import { defaultEdgeOptions } from './utils/edgeOptions';
import {
  REACT_FLOW_GRID_SIZE,
  REACT_FLOW_PRO_OPTIONS,
  DEFAULT_VIEWPORT,
} from './config/constants';

import 'reactflow/dist/style.css';

const flowSelector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onReconnect: state.onReconnect,
});

const isValidConnection = () => true;

const PipelineFlow = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnect,
  } = useStore(flowSelector, shallow);
  const { wrapperRef, setReactFlowInstance, onDrop, onDragOver } =
    usePipelineDrop();

  const isEmpty = nodes.length === 0;

  return (
    <div
      className="pipeline-canvas"
      ref={wrapperRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <CanvasEmptyState visible={isEmpty} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={REACT_FLOW_PRO_OPTIONS}
        defaultEdgeOptions={defaultEdgeOptions}
        snapGrid={[REACT_FLOW_GRID_SIZE, REACT_FLOW_GRID_SIZE]}
        snapToGrid
        connectionLineType="bezier"
        connectionRadius={24}
        isValidConnection={isValidConnection}
        edgesReconnectable
        reconnectRadius={22}
        fitView={!isEmpty}
        fitViewOptions={{ padding: 0.25 }}
        defaultViewport={DEFAULT_VIEWPORT}
        deleteKeyCode={['Backspace', 'Delete']}
        elevateEdgesOnSelect
      >
        <Background
          color="#b8bfd0"
          gap={REACT_FLOW_GRID_SIZE}
          size={1}
          variant="dots"
        />
        <Controls showInteractive={false} className="canvas-controls" />
        <MiniMap
          className="canvas-minimap"
          nodeColor="#7c6df0"
          maskColor="rgba(245, 246, 250, 0.85)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};

export const PipelineUI = () => (
  <ReactFlowProvider>
    <PipelineFlow />
  </ReactFlowProvider>
);
