
# 5. Project Architecture Diagram

```
                         USER (Browser)
                              |
                              v
+------------------------------------------------------------------+
|                         FRONTEND (React)                          |
|                                                                   |
|  +----------------+    +----------------+    +----------------+ |
|  |  COMPONENTS    |    |  store.js      |    |  React Flow    | |
|  |  AppHeader     |--->|  nodes[]       |--->|  ui.js         | |
|  |  NodeToolbar   |    |  edges[]       |    |  Canvas        | |
|  |  ResultModal   |    +----------------+    +----------------+ |
|  +----------------+            |                                  |
|                                 | Submit click                      |
|                    submit.js --> pipelineApi.js                   |
+---------------------------------|--------------------------------+
                                  |
                    POST /pipelines/parse
                    { "nodes": [...], "edges": [...] }
                                  |
                                  v
+------------------------------------------------------------------+
|                         BACKEND (FastAPI)                         |
|                                                                   |
|  main.py --> app/main.py (CORS + routers)                        |
|                                                                   |
|  app/routers/pipelines.py                                        |
|       |                                                           |
|       |-- count: len(nodes), len(edges)                          |
|       |                                                           |
|       +-- app/services/dag.py --> is_dag (true/false)            |
|                                                                   |
|  app/schemas/pipeline.py (validation)                            |
|                                                                   |
|  Response: { num_nodes, num_edges, is_dag }                      |
+---------------------------------|--------------------------------+
                                  |
                                  v
                    ResultModal.js displays result
```

### Data Flow (Simple)
```
Toolbar click/drag --> store.js --> React Flow canvas
                                      |
User clicks Submit -------------------+
                                      |
                                      v
                         pipelineApi.js (POST)
                                      |
                                      v
                         pipelines.py + dag.py
                                      |
                                      v
                              ResultModal.js
```
