import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonStyle } from "../styles/navigationStyles";

function Monitoring() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState("");

    const loadMonitoringData = () => {
        fetch("${window.location.protocol}//${window.location.hostname}:8000/api/monitoring")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLastUpdated(
                    new Date().toLocaleTimeString()
                );
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        loadMonitoringData();

        const interval = setInterval(() => {
            loadMonitoringData();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    if (!data) {
        return (
            <div
                style={{
                    background: "#020617",
                    minHeight: "100vh",
                    color: "white",
                    padding: "30px"
                }}
            >
                <h2>Loading Monitoring Center...</h2>
            </div>
        );
    }

    const runningContainers =
        data.containers.filter(
            (container) => container.status === "running"
        ).length;

    const platformHealth = Math.round(
        (runningContainers / data.count) * 100
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "white",
                padding: "30px"
            }}
        >

            {/* TOP ACTIONS */}

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px"
                }}
            >

                <button
                    onClick={() => navigate("/dashboard")}
                    style={backButtonStyle}
                >
                    ← Back to Dashboard
                </button>

                <button
                    onClick={loadMonitoringData}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        border: "1px solid #38bdf8",
                        background: "transparent",
                        color: "#38bdf8",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    🔄 Refresh
                </button>

            </div>

            {/* TITLE */}

            <h1
                style={{
                    fontSize: "42px",
                    marginBottom: "10px",
                    color: "#38bdf8"
                }}
            >
                Monitoring Center
            </h1>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "8px"
                }}
            >
                Real-Time Infrastructure & Container Health Monitoring
            </p>

            <p
                style={{
                    color: "#64748b",
                    marginBottom: "35px",
                    fontSize: "14px"
                }}
            >
                Last Updated: {lastUpdated}
            </p>

            {/* SUMMARY CARDS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px",
                    marginBottom: "40px"
                }}
            >

                <div
                    style={cardStyle("#38bdf8")}
                >
                    <h3>Total Containers</h3>
                    <h1 style={{ color: "#38bdf8" }}>
                        {data.count}
                    </h1>
                </div>

                <div
                    style={cardStyle("#22c55e")}
                >
                    <h3>Running Containers</h3>
                    <h1 style={{ color: "#22c55e" }}>
                        {runningContainers}
                    </h1>
                </div>

                <div
                    style={cardStyle("#f59e0b")}
                >
                    <h3>Platform Health</h3>
                    <h1 style={{ color: "#f59e0b" }}>
                        {platformHealth}%
                    </h1>
                </div>

                <div
                    style={cardStyle("#a855f7")}
                >
                    <h3>System Status</h3>
                    <h1 style={{ color: "#a855f7" }}>
                        ACTIVE
                    </h1>
                </div>

            </div>

            {/* CONTAINERS SECTION */}

            <div
                style={{
                    background: "#0f172a",
                    padding: "20px",
                    borderRadius: "18px 18px 0 0",
                    borderBottom: "1px solid #1e293b"
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: "#38bdf8"
                    }}
                >
                    Active Containers
                </h2>
            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#0f172a"
                }}
            >
                <thead>

                    <tr
                        style={{
                            background: "#111827"
                        }}
                    >

                        <th
                            style={tableHeader}
                        >
                            Container Name
                        </th>

                        <th
                            style={tableHeader}
                        >
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.containers.map(
                        (container, index) => (
                            <tr
                                key={index}
                                style={{
                                    borderBottom:
                                        "1px solid #1e293b"
                                }}
                            >

                                <td
                                    style={tableCell}
                                >
                                    {container.name}
                                </td>

                                <td
                                    style={tableCell}
                                >

                                    <span
                                        style={{
                                            background:
                                                container.status ===
                                                "running"
                                                    ? "#14532d"
                                                    : "#7f1d1d",
                                            color:
                                                container.status ===
                                                "running"
                                                    ? "#22c55e"
                                                    : "#ef4444",
                                            padding:
                                                "8px 14px",
                                            borderRadius:
                                                "999px",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                "bold"
                                        }}
                                    >
                                        {container.status.toUpperCase()}
                                    </span>

                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

            <div
                style={{
                    textAlign: "center",
                    marginTop: "30px",
                    color: "#64748b",
                    fontSize: "12px"
                }}
            >
                © 2026 AnantX Team | Monitoring Center
            </div>

        </div>
    );
}

const cardStyle = (color) => ({
    background: "#0f172a",
    padding: "25px",
    borderRadius: "18px",
    border: `1px solid ${color}`
});

const tableHeader = {
    padding: "16px",
    textAlign: "left"
};

const tableCell = {
    padding: "16px"
};

export default Monitoring;