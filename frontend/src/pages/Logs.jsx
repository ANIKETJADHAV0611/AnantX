import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonStyle } from "../styles/navigationStyles";

function Logs() {
    const navigate = useNavigate();

    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [search, setSearch] = useState("");

    const fetchLogs = async () => {
        try {
            const response = await fetch(
                "${window.location.protocol}//${window.location.hostname}:8000/api/logs"
            );

            const data = await response.json();



            setLogs(data.logs || []);
            setFilteredLogs(data.logs || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    useEffect(() => {
        const filtered = logs.filter((log) =>
            JSON.stringify(log)
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredLogs(filtered);
    }, [search, logs]);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "#ef4444";

            case "WARNING":
                return "#f59e0b";

            default:
                return "#38bdf8";
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "white",
                padding: "30px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px"
                }}
            >
                <button
                    onClick={() => navigate("/dashboard")}
                    style={backButtonStyle}
                >
                    ← Dashboard
                </button>

                <button
                    onClick={fetchLogs}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "10px",
                        border: "1px solid #38bdf8",
                        background: "transparent",
                        color: "#38bdf8",
                        cursor: "pointer"
                    }}
                >
                    Refresh Logs
                </button>
            </div>

            <h1
                style={{
                    color: "#38bdf8",
                    marginBottom: "10px"
                }}
            >
                Logs Center
            </h1>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "30px"
                }}
            >
                Centralized Logging & Event Analysis
            </p>

            <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                    marginBottom: "25px"
                }}
            />

            <div
                style={{
                    overflowX: "auto",
                    width: "100%"
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#0f172a",
                        tableLayout: "fixed"
                    }}
                >
                    <thead>
                        <tr>
                            <th style={cell}>Timestamp</th>
                            <th style={cell}>Service</th>
                            <th style={cell}>Severity</th>
                            <th style={cell}>Message</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredLogs.map((log, index) => (
                            <tr key={index}>
                                <td style={cell}>{log.timestamp}</td>

                                <td style={cell}>{log.service}</td>

                                <td style={cell}>
                                    <span
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: "999px",
                                            background:
                                                getSeverityColor(
                                                    log.severity
                                                ),
                                            color: "white",
                                            fontSize: "12px"
                                        }}
                                    >
                                        {log.severity}
                                    </span>
                                </td>

                                <td
                                    style={{
                                        ...cell,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        overflowWrap: "anywhere"
                                    }}
                                >
                                    {log.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const cell = {
    padding: "14px",
    borderBottom: "1px solid #1e293b",
    textAlign: "left",
    verticalAlign: "top"
};

export default Logs;