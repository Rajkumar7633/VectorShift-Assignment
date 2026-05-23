from fastapi import APIRouter

from app.schemas.pipeline import PipelineParseResponse, PipelinePayload
from app.services.dag import is_directed_acyclic_graph

router = APIRouter(prefix="/pipelines", tags=["pipelines"])


@router.post("/parse", response_model=PipelineParseResponse)
def parse_pipeline(payload: PipelinePayload) -> PipelineParseResponse:
    node_ids = {node.id for node in payload.nodes}
    edge_dicts = [edge.model_dump() for edge in payload.edges]

    return PipelineParseResponse(
        num_nodes=len(payload.nodes),
        num_edges=len(payload.edges),
        is_dag=is_directed_acyclic_graph(node_ids, edge_dicts),
    )
