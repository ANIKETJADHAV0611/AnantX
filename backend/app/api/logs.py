from fastapi import APIRouter
import requests
import json
import os

router = APIRouter(
    prefix="/api/logs",
    tags=["Logs"]
)

# Fallback to working values if env vars are missing
SPLUNK_URL = os.getenv("SPLUNK_URL", "https://splunk:8089")
SPLUNK_USER = os.getenv("SPLUNK_USER", "admin")
SPLUNK_PASSWORD = os.getenv("SPLUNK_PASSWORD", "AnantX@123")


@router.get("/debug")
def debug():
    return {
        "SPLUNK_URL": SPLUNK_URL,
        "SPLUNK_USER": SPLUNK_USER,
        "SPLUNK_PASSWORD": SPLUNK_PASSWORD
    }


@router.get("/test")
def test():

    requests.packages.urllib3.disable_warnings()

    try:

        response = requests.post(
            f"{SPLUNK_URL}/services/search/jobs/export",
            auth=(SPLUNK_USER, SPLUNK_PASSWORD),
            verify=False,
            data={
                "search": "search index=main | head 5",
                "output_mode": "json"
            },
            timeout=30
        )

        return {
            "status_code": response.status_code,
            "response_text": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }


@router.get("")
def get_logs():

    requests.packages.urllib3.disable_warnings()

    try:

        response = requests.post(
            f"{SPLUNK_URL}/services/search/jobs/export",
            auth=(SPLUNK_USER, SPLUNK_PASSWORD),
            verify=False,
            data={
                "search": "search index=main | sort - _time | head 50",
                "output_mode": "json"
            },
            timeout=30
        )

        logs = []

        for line in response.text.splitlines():

            if not line.strip():
                continue

            try:

                data = json.loads(line)

                result = data.get("result")

                if not result:
                    continue

                raw_message = result.get("_raw", "")
                message = raw_message

                # Parse nested Fluent Bit JSON
                try:

                    outer = json.loads(raw_message)

                    if "log" in outer:

                        inner_log = outer["log"]

                        try:

                            inner = json.loads(inner_log)

                            if "log" in inner:
                                message = inner["log"]
                            else:
                                message = str(inner)

                        except Exception:

                            message = str(inner_log)

                except Exception:
                    pass

                severity = "INFO"

                msg_lower = str(message).lower()

                if (
                    "warn" in msg_lower
                    or "warning" in msg_lower
                ):
                    severity = "WARNING"

                if (
                    "error" in msg_lower
                    or "critical" in msg_lower
                    or "falco" in msg_lower
                    or "/etc/shadow" in msg_lower
                    or "sensitive file opened" in msg_lower
                    or "privilege escalation" in msg_lower
                ):
                    severity = "CRITICAL"

                logs.append(
                    {
                        "timestamp": result.get("_time", "-"),
                        "service": (
                            result.get("source")
                            or result.get("host")
                            or "-"
                        ),
                        "severity": severity,
                        "message": message[:1000]
                    }
                )

            except Exception as parse_error:

                logs.append(
                    {
                        "timestamp": "-",
                        "service": "parser",
                        "severity": "WARNING",
                        "message": str(parse_error)
                    }
                )

        return {
            "count": len(logs),
            "logs": logs
        }

    except Exception as e:

        return {
            "count": 0,
            "logs": [
                {
                    "timestamp": "-",
                    "service": "splunk",
                    "severity": "CRITICAL",
                    "message": str(e)
                }
            ]
        }