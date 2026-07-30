from fastapi import APIRouter
import docker
import requests

router = APIRouter(
    prefix="/api",
    tags=["monitoring"]
)


@router.get("/monitoring")
def get_monitoring():

    client = docker.from_env()

    containers = client.containers.list()

    data = []

    for c in containers:

        data.append({
            "name": c.name,
            "status": c.status
        })

    return {
        "count": len(data),
        "containers": data
    }


@router.get("/monitoring/prometheus")
def prometheus_targets():

    response = requests.get(
        "http://prometheus:9090/api/v1/query",
        params={
            "query": "up"
        }
    )

    return response.json()

@router.get("/monitoring/summary")
def monitoring_summary():

    client = docker.from_env()

    containers = client.containers.list()

    return {
        "running_containers": len(containers),
        "healthy_services": len(containers),
        "platform_status": "ACTIVE"
    }

@router.get("/monitoring/anantbuy")
def anantbuy_status():

    response = requests.get(
        "http://prometheus:9090/api/v1/query",
        params={
            "query": 'max(up{job="anantbuy"})'
        }
    )

    result = response.json()

    status = "DOWN"

    if (
        result["status"] == "success"
        and len(result["data"]["result"]) > 0
        and result["data"]["result"][0]["value"][1] == "1"
    ):
        status = "UP"

    return {
        "service": "AnantBuy",
        "status": status
    }
