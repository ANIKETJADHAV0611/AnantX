from fastapi import APIRouter
import requests

router = APIRouter(
    prefix="/api/dashboard",
    tags=["dashboard"]
)

PROMETHEUS_URL = "http://prometheus:9090"


def run_query(query: str):
    try:
        response = requests.get(
            f"{PROMETHEUS_URL}/api/v1/query",
            params={"query": query},
            timeout=5
        )

        data = response.json()

        if data["status"] != "success":
            return None

        return data["data"]["result"]

    except Exception as e:
        print(f"Prometheus Error: {e}")
        return None


@router.get("/metrics")
def get_dashboard_metrics():

    try:

        # ==========================
        # Healthy Services
        # ==========================

        healthy_services = 0

        healthy_result = run_query("up")

        if healthy_result:
            healthy_services = len(
                [
                    item
                    for item in healthy_result
                    if item["value"][1] == "1"
                ]
            )

        # ==========================
        # AnantBuy Status
        # ==========================

        anantbuy_status = "DOWN"

        anantbuy_result = run_query(
            'max(up{job="anantbuy"})'
        )
        if (
            anantbuy_result
            and len(anantbuy_result) > 0
            and anantbuy_result[0]["value"][1] == "1"
        ):
            anantbuy_status = "UP"

        # ==========================
        # CPU Usage
        # ==========================

        cpu_usage = 0

        cpu_result = run_query(
            "rate(process_cpu_seconds_total[1m])"
        )

        if cpu_result and len(cpu_result) > 0:

            cpu_usage = round(
                float(cpu_result[0]["value"][1]) * 100,
                2
            )

        # ==========================
        # Memory Usage
        # ==========================

        memory_usage = 0

        memory_result = run_query(
            "process_resident_memory_bytes"
        )

        if memory_result and len(memory_result) > 0:

            memory_usage = round(
                float(memory_result[0]["value"][1])
                / 1024
                / 1024,
                2
            )

        # ==========================
        # Platform Status
        # ==========================

        platform_status = (
            "ACTIVE"
            if healthy_services > 0
            else "DOWN"
        )

        return {
            "healthy_services": healthy_services,
            "anantbuy_status": anantbuy_status,
            "cpu_usage": cpu_usage,
            "memory_usage": memory_usage,
            "platform_status": platform_status
        }

    except Exception as e:

        return {
            "healthy_services": 0,
            "anantbuy_status": "DOWN",
            "cpu_usage": 0,
            "memory_usage": 0,
            "platform_status": "ERROR",
            "error": str(e)
        }
