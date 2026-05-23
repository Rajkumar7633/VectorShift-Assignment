from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import API_TITLE, API_VERSION, CORS_ORIGINS
from app.routers import health, pipelines


def create_app() -> FastAPI:
    application = FastAPI(title=API_TITLE, version=API_VERSION)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(health.router)
    application.include_router(pipelines.router)

    return application


app = create_app()
