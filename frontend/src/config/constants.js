export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const PIPELINE_PARSE_ENDPOINT = `${API_BASE_URL}/pipelines/parse`;

export const DRAG_DATA_MIME = 'application/reactflow';

export const REACT_FLOW_GRID_SIZE = 20;

export const REACT_FLOW_PRO_OPTIONS = { hideAttribution: true };

export const DEFAULT_VIEWPORT = { x: 0, y: 0, zoom: 1 };
