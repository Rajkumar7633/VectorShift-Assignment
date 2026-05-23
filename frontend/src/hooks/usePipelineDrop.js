import { useRef, useCallback, useState, useEffect } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { buildNodeData, parseDragPayload } from '../utils/pipeline';

const selector = (state) => ({
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  pendingNodeType: state.pendingNodeType,
  setPendingNodeType: state.setPendingNodeType,
});

export const usePipelineDrop = () => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { getNodeID, addNode, pendingNodeType, setPendingNodeType } = useStore(
    selector,
    shallow
  );

  const addNodeAtScreenPosition = useCallback(
    (type, clientX, clientY) => {
      if (!type || !wrapperRef.current) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const relative = {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      };

      const position = reactFlowInstance?.project
        ? reactFlowInstance.project(relative)
        : relative;

      const nodeId = getNodeID(type);
      addNode({
        id: nodeId,
        type,
        position,
        data: buildNodeData(nodeId, type),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  useEffect(() => {
    if (!pendingNodeType || !wrapperRef.current) return;

    const bounds = wrapperRef.current.getBoundingClientRect();
    addNodeAtScreenPosition(
      pendingNodeType,
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2
    );
    setPendingNodeType(null);
  }, [pendingNodeType, addNodeAtScreenPosition, setPendingNodeType]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nodeType = parseDragPayload(event.dataTransfer);
      if (nodeType) addNodeAtScreenPosition(nodeType, event.clientX, event.clientY);
    },
    [addNodeAtScreenPosition]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return {
    wrapperRef,
    setReactFlowInstance,
    onDrop,
    onDragOver,
  };
};
