import os

API_TITLE = "VectorShift Pipeline API"
API_VERSION = "1.0.0"

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
).split(",")
