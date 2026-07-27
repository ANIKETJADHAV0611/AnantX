import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonStyle } from "../styles/navigationStyles";

function Threats() {
    const navigate = useNavigate();

    const [threats, setThreats] = useState([]);

    useEffect(() => {

        fetch("${window.location.protocol}//${window.location.hostname}:8000/threats")
            .then((res) => res.json())
            .then((data) => setThreats(data))
            .catch((err) => console.error(err));

    }, []);

    const criticalCount =
        threats.filter(
            t => t.severity === "CRITICAL"
        ).length;

    const activeCount =
        threats.filter(
            t => t.status === "ACTIVE"
        ).length;

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "white",
                padding: "30px"
            }}
        >

            <button
                onClick={() => navigate("/dashboard")}
                style={backButtonStyle}
            >
                ← Back to Dashboard
            </button>

            <h1
                style={{
                    fontSize: "42px",
                    color: "#ef4444",
                    marginBottom: "10px"
                }}
            >
                Threat Intelligence Center
            </h1>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "30px"
                }}
            >
                Real-Time Security Threat Detection
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div
                    style={{
                        background: "#0f172a",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #ef4444"
                    }}
                >
                    <h3>Threat Score</h3>
                    <h1 style={{ color: "#ef4444" }}>
                        85
                    </h1>
                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #f97316"
                    }}
                >
                    <h3>Active Threats</h3>
                    <h1 style={{ color: "#f97316" }}>
                        {activeCount}
                    </h1>
                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #dc2626"
                    }}
                >
                    <h3>Critical Threats</h3>
                    <h1 style={{ color: "#dc2626" }}>
                        {criticalCount}
                    </h1>
                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #eab308"
                    }}
                >
                    <h3>Security Status</h3>
                    <h1 style={{ color: "#eab308" }}>
                        ALERT
                    </h1>
                </div>

            </div>

            <div
                style={{
                    background: "#0f172a",
                    borderRadius: "18px",
                    overflow: "hidden"
                }}
            >

                <div
                    style={{
                        padding: "20px",
                        borderBottom:
                            "1px solid #1e293b"
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            color: "#ef4444"
                        }}
                    >
                        Active Threat Feed
                    </h2>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#111827"
                            }}
                        >
                            <th style={{ padding: "16px" }}>
                                ID
                            </th>

                            <th style={{ padding: "16px" }}>
                                Severity
                            </th>

                            <th style={{ padding: "16px" }}>
                                Source
                            </th>

                            <th style={{ padding: "16px" }}>
                                Status
                            </th>

                            <th style={{ padding: "16px" }}>
                                Description
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {threats.map(
                            (threat, index) => (

                                <tr
                                    key={index}
                                    style={{
                                        borderBottom:
                                            "1px solid #1e293b"
                                    }}
                                >

                                    <td
                                        style={{
                                            padding: "16px"
                                        }}
                                    >
                                        {threat.id}
                                    </td>

                                    <td
                                        style={{
                                            padding: "16px"
                                        }}
                                    >

                                        <span
                                            style={{
                                                padding:
                                                    "6px 12px",

                                                borderRadius:
                                                    "999px",

                                                background:
                                                    threat.severity ===
                                                    "CRITICAL"
                                                        ? "#450a0a"
                                                        : threat.severity ===
                                                          "HIGH"
                                                        ? "#7c2d12"
                                                        : threat.severity ===
                                                          "MEDIUM"
                                                        ? "#713f12"
                                                        : "#172554",

                                                color:
                                                    threat.severity ===
                                                    "CRITICAL"
                                                        ? "#ef4444"
                                                        : threat.severity ===
                                                          "HIGH"
                                                        ? "#f97316"
                                                        : threat.severity ===
                                                          "MEDIUM"
                                                        ? "#eab308"
                                                        : "#60a5fa"
                                            }}
                                        >
                                            {threat.severity}
                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            padding: "16px"
                                        }}
                                    >
                                        {threat.source}
                                    </td>

                                    <td
                                        style={{
                                            padding: "16px"
                                        }}
                                    >

                                        <span
                                            style={{
                                                padding:
                                                    "6px 12px",

                                                borderRadius:
                                                    "999px",

                                                background:
                                                    threat.status ===
                                                    "ACTIVE"
                                                        ? "#450a0a"
                                                        : threat.status ===
                                                          "MONITORING"
                                                        ? "#7c2d12"
                                                        : threat.status ===
                                                          "INVESTIGATING"
                                                        ? "#713f12"
                                                        : "#14532d",

                                                color:
                                                    threat.status ===
                                                    "ACTIVE"
                                                        ? "#ef4444"
                                                        : threat.status ===
                                                          "MONITORING"
                                                        ? "#f97316"
                                                        : threat.status ===
                                                          "INVESTIGATING"
                                                        ? "#eab308"
                                                        : "#22c55e"
                                            }}
                                        >
                                            {threat.status}
                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            padding: "16px"
                                        }}
                                    >
                                        {threat.description}
                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

            <div
                style={{
                    textAlign: "center",
                    marginTop: "30px",
                    color: "#64748b",
                    fontSize: "12px"
                }}
            >
                © 2026 Vibhor Dewangan | AnantX DevSecOps Platform
            </div>

        </div>

    );
}

export default Threats;