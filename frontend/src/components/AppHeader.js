import { SubmitButton } from '../submit';
import { useStore } from '../store';

export const AppHeader = () => {
  const clearPipeline = useStore((s) => s.clearPipeline);
  const nodeCount = useStore((s) => s.nodes.length);
  const edgeCount = useStore((s) => s.edges.length);

  return (
    <header className="app-header">
      <div className="app-header__left">
        <div className="app-header__logo" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
            <path
              d="M8 14L12 18L20 10"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                <stop stopColor="#7c6df0" />
                <stop offset="1" stopColor="#5b4cdb" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="app-header__breadcrumb">
          <span className="app-header__crumb-muted">Pipelines</span>
          <span className="app-header__crumb-sep">/</span>
          <span className="app-header__crumb-active">Assessment Pipeline</span>
        </div>
      </div>

      <div className="app-header__stats">
        <span className="app-header__stat">{nodeCount} nodes</span>
        <span className="app-header__stat-divider" />
        <span className="app-header__stat">{edgeCount} edges</span>
      </div>

      <div className="app-header__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={clearPipeline}
          disabled={nodeCount === 0}
        >
          Clear
        </button>
        <SubmitButton />
      </div>
    </header>
  );
};
