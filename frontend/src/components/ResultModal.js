import { useEffect, useCallback } from 'react';

export const ResultModal = ({ open, onClose, result, error }) => {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return undefined;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {error ? 'Submission Failed' : 'Pipeline Analysis'}
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal__body">
          {error ? (
            <div className="modal__error">
              <p>{error}</p>
              <p className="modal__hint">
                Start the backend:{' '}
                <code>python3 -m uvicorn main:app --reload</code>
              </p>
            </div>
          ) : (
            <ul className="modal__stats">
              <li className="modal__stat">
                <span className="modal__stat-label">Nodes</span>
                <span className="modal__stat-value">{result.num_nodes}</span>
              </li>
              <li className="modal__stat">
                <span className="modal__stat-label">Edges</span>
                <span className="modal__stat-value">{result.num_edges}</span>
              </li>
              <li className="modal__stat modal__stat--wide">
                <span className="modal__stat-label">Valid DAG</span>
                <span
                  className={`modal__badge ${
                    result.is_dag ? 'modal__badge--success' : 'modal__badge--error'
                  }`}
                >
                  {result.is_dag ? 'Yes — no cycles' : 'No — contains a cycle'}
                </span>
              </li>
            </ul>
          )}
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
