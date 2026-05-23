import { useState, useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { parsePipeline, PipelineApiError } from './services/pipelineApi';
import { ResultModal } from './components/ResultModal';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async () => {
    if (nodes.length === 0) {
      setError('Add at least one node to the canvas before submitting.');
      setResult(null);
      setModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const data = await parsePipeline({ nodes, edges });
      setResult(data);
      setError(null);
      setModalOpen(true);
    } catch (err) {
      const message =
        err instanceof PipelineApiError
          ? err.message
          : err.message?.includes('fetch')
            ? 'Cannot connect to backend. Is it running on port 8000?'
            : err.message || 'Unknown error';
      setError(message);
      setResult(null);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  }, [nodes, edges]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <button
        type="button"
        className="btn btn--primary btn--submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="btn__spinner" aria-hidden="true" />
            Analyzing…
          </>
        ) : (
          'Submit Pipeline'
        )}
      </button>

      <ResultModal
        open={modalOpen}
        onClose={closeModal}
        result={result}
        error={error}
      />
    </>
  );
};
