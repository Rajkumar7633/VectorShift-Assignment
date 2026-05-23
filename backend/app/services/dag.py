from __future__ import annotations

from collections import defaultdict, deque


def is_directed_acyclic_graph(node_ids: set[str], edges: list[dict]) -> bool:
    """
    Returns True if the graph formed by edges between known node IDs has no cycles.
    Isolated nodes (no edges) are valid in a DAG.
    """
    if not node_ids:
        return True

    graph: dict[str, list[str]] = defaultdict(list)
    in_degree: dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source not in node_ids or target not in node_ids:
            continue
        graph[source].append(target)
        in_degree[target] += 1

    queue = deque(node_id for node_id in node_ids if in_degree[node_id] == 0)
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)
