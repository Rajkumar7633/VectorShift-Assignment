# VectorShift Frontend Technical Assessment

A visual pipeline builder (React + React Flow) with a FastAPI backend for graph validation.

## Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.9+ and pip

## Quick start

### 1. Backend (Terminal 1)

```bash
cd backend
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```

API runs at **http://localhost:8000**  
Health check: `GET /` → `{"Ping":"Pong"}`

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

App opens at **http://localhost:3000**

## How to use

1. Pick a category tab (**General**, **LLMs**, **Logic**, etc.).
2. **Click** or **drag** a node onto the canvas.
3. Connect nodes by dragging from one handle to another.
4. In a **Text** node, type `{{variableName}}` (e.g. `{{input}}`) to create a left-side input handle.
5. Click **Submit Pipeline** to analyze the graph.

## Assessment features

| Part | Implementation |
|------|----------------|
| **1. Node abstraction** | `frontend/src/nodes/BaseNode.js`, `createNode.js` + 5 demo nodes (Filter, API, Delay, Condition, Merge) |
| **2. Styling** | VectorShift-inspired UI in `frontend/src/styles/` |
| **3. Text node** | Auto-resize + `{{variable}}` parsing in `textNode.js`, `parseVariables.js` |
| **4. Backend** | `POST /pipelines/parse` → `{ num_nodes, num_edges, is_dag }` |

## API

**Endpoint:** `POST http://localhost:8000/pipelines/parse`

**Request body:**

```json
{
  "nodes": [{ "id": "customInput-1", "type": "customInput", "position": { "x": 0, "y": 0 }, "data": {} }],
  "edges": [{ "source": "customInput-1", "target": "text-1" }]
}
```

**Response:**

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Project structure

```
frontend_technical_assessment/
├── README.md                 ← this file
├── backend/
│   ├── main.py               # uvicorn entry point
│   └── app/
│       ├── routers/          # API routes
│       ├── services/dag.py   # DAG validation
│       └── schemas/          # Pydantic models
└── frontend/
    └── src/
        ├── components/       # UI components
        ├── hooks/            # usePipelineDrop
        ├── nodes/            # Node abstraction + types
        ├── services/         # pipelineApi.js
        └── store.js          # Zustand state
```

## Environment variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:8000` | Backend base URL (frontend) |
| `CORS_ORIGINS` | `http://localhost:3000,...` | Allowed origins (backend) |

## Production build

```bash
cd frontend && npm run build
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Submit fails / connection error | Ensure backend is running on port 8000 |
| `uvicorn` not found | Use `python3 -m uvicorn main:app --reload` |
| Port 8000 in use | Stop the other process or change the port |
| UI not updating | Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows) |

## Tech stack

- **Frontend:** React 18, React Flow, Zustand
- **Backend:** FastAPI, Pydantic, Uvicorn
