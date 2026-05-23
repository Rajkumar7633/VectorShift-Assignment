import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodeCount: state.nodes.length,
  edgeCount: state.edges.length,
});

export const StatusBar = () => {
  const { nodeCount, edgeCount } = useStore(selector, shallow);

  return (
    <footer className="status-bar">
      <div className="status-bar__group">
        <span className="status-bar__item">
          <span className="status-bar__dot status-bar__dot--nodes" />
          {nodeCount} {nodeCount === 1 ? 'node' : 'nodes'}
        </span>
        <span className="status-bar__item">
          <span className="status-bar__dot status-bar__dot--edges" />
          {edgeCount} {edgeCount === 1 ? 'edge' : 'edges'}
        </span>
      </div>
      <span className="status-bar__hint">Delete selected: Backspace</span>
    </footer>
  );
};
