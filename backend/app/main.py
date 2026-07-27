from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app

from app.database.db import engine
from app.models.user import Base

from app.api import auth
from app.api import vulnerabilities
from app.api import monitoring
from app.api import ai
from app.api import threats
from app.api import metrics
from app.api import logs
from app.api import falco
from app.api import containers
from app.api import dashboard
app = FastAPI(
    title="AnantX API",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
))

# Routers
app.include_router(auth.router)
app.include_router(containers.router)
app.include_router(vulnerabilities.router)
app.include_router(monitoring.router)
app.include_router(ai.router)
app.include_router(threats.router)
app.include_router(falco.router)
app.include_router(logs.router)
app.include_router(dashboard.router)

# Prometheus Metrics Endpoint
metrics_app = make_asgi_app()

app.mount(
    "/metrics",
    metrics_app
)


@app.get("/")
def root():
    return {
        "message": "AnantX Backend Running"
    }