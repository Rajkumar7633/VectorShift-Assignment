import { PIPELINE_PARSE_ENDPOINT } from '../config/constants';

export class PipelineApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'PipelineApiError';
    this.status = status;
  }
}

/**
 * @param {{ nodes: object[], edges: object[] }} pipeline
 * @returns {Promise<{ num_nodes: number, num_edges: number, is_dag: boolean }>}
 */
export async function parsePipeline({ nodes, edges }) {
  const response = await fetch(PIPELINE_PARSE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new PipelineApiError(
      `Server responded with status ${response.status}`,
      response.status
    );
  }

  const data = await response.json();

  if (
    typeof data.num_nodes !== 'number' ||
    typeof data.num_edges !== 'number' ||
    typeof data.is_dag !== 'boolean'
  ) {
    throw new PipelineApiError('Invalid response from server', response.status);
  }

  return data;
}
