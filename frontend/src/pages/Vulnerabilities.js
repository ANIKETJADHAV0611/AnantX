import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonStyle } from "../styles/navigationStyles";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Vulnerabilities() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetch("${window.location.protocol}//${window.location.hostname}:8000/api/vulnerabilities")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));

    }, []);

    if (!data) {
        return <h2 style={{ color: "white" }}>Loading...</h2>;
    }
    const chartData = {
        labels: ["Critical", "High", "Medium", "Low"],
        datasets: [
            {
                data: [
                    data.critical,
                    data.high,
                    data.medium,
                    data.low
                ],
                backgroundColor: [
                    "#ef4444",
                    "#f97316",
                    "#eab308",
                    "#3b82f6"
                ],
                borderWidth: 0
            }
        ]
    };
    const filteredVulnerabilities =
    (data?.vulnerabilities || []).filter((v) => {

            const severityMatch =
                filter === "ALL"
                    ? true
                    : v.severity === filter;

            const searchMatch =
                v.id?.toLowerCase().includes(search.toLowerCase()) ||
                v.package?.toLowerCase().includes(search.toLowerCase());

            return severityMatch && searchMatch;
        });
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        style={backButtonStyle}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "42px",
                            color: "#38bdf8"
                        }}
                    >
                        Security Operations Center
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                            marginTop: "10px"
                        }}
                    >
                        Real-time Trivy Vulnerability Intelligence
                    </p>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "12px",
                            marginTop: "5px"
                        }}
                    >
                        Developed by AnantX Team
                    </p>

                </div>

                <div
                    style={{
                        background: "#0f172a",
                        padding: "15px 20px",
                        borderRadius: "14px",
                        border: "1px solid #1e293b"
                    }}
                >
                    Active Filter: {filter}
                </div>

            </div>

            <div
                style={{
                    background: "#111827",
                    padding: "24px",
                    borderRadius: "18px",
                    marginBottom: "25px",
                    border: "2px solid #38bdf8",
                    boxShadow: "0 0 25px rgba(56,189,248,.25)"
                }}
            >
                <h3
                    style={{
                        color: "#38bdf8"
                    }}
                >
                    TOTAL VULNERABILITIES
                </h3>

                <h1
                    style={{
                        fontSize: "56px",
                        margin: 0,
                        color: "#38bdf8"
                    }}
                >
                    {data.count}
                </h1>

            </div>

            {/* Severity Cards */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginTop: "30px",
                    marginBottom: "30px"
                }}
            >

                <div
                    onClick={() => setFilter("CRITICAL")}

                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "16px",
                        border:
                            filter === "CRITICAL"
                                ? "3px solid #ffffff"
                                : "2px solid #ef4444",
                        boxShadow: "0 0 20px rgba(239,68,68,.3)",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                >
                    <h3 style={{ color: "#ef4444" }}>CRITICAL</h3>
                    <h1>{data.critical}</h1>
                </div>

                <div
                    onClick={() => setFilter("HIGH")}
                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "16px",
                        border:
                            filter === "HIGH"
                                ? "3px solid #ffffff"
                                : "2px solid #f97316",

                        boxShadow: "0 0 20px rgba(249,115,22,.3)",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                >
                    <h3 style={{ color: "#f97316" }}>HIGH</h3>
                    <h1>{data.high}</h1>
                </div>

                <div
                    onClick={() => setFilter("MEDIUM")}
                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "16px",
                        border:
                            filter === "MEDIUM"
                                ? "3px solid #ffffff"
                                : "2px solid #eab308",
                        boxShadow: "0 0 20px rgba(234,179,8,.3)",
                        cursor: "pointer",
                        transition: "0.3s"


                    }}
                >
                    <h3 style={{ color: "#eab308" }}>MEDIUM</h3>
                    <h1>{data.medium}</h1>
                </div>

                <div
                    onClick={() => setFilter("LOW")}
                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "16px",
                        border:
                            filter === "CRITICAL"
                                ? "3px solid #ffffff"
                                : "2px solid #3b82f6",
                        boxShadow: "0 0 20px rgba(59,130,246,.3)",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                >
                    <h3 style={{ color: "#3b82f6" }}>LOW</h3>
                    <h1>{data.low}</h1>
                </div>

            </div>

            {/* Chart */}

            <div
                style={{
                    width: "100%",
                    marginBottom: "40px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "30px",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginBottom: "40px"
                    }}
                >

                    <div style={{ width: "350px" }}>
                        <Doughnut data={chartData} />
                    </div>

                    <div>

                        <h2 style={{ color: "#ef4444" }}>
                            Critical: {data.critical}
                        </h2>

                        <h2 style={{ color: "#f97316" }}>
                            High: {data.high}
                        </h2>

                        <h2 style={{ color: "#eab308" }}>
                            Medium: {data.medium}
                        </h2>

                        <h2 style={{ color: "#3b82f6" }}>
                            Low: {data.low}
                        </h2>

                    </div>

                </div>
            </div>

            {/* Filter Buttons */}

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "30px"
                }}
            >

                <button onClick={() => setFilter("ALL")}>
                    All ({data.count})
                </button>

                <button
                    onClick={() => setFilter("CRITICAL")}
                    style={{
                        background: "#450a0a",
                        color: "#ef4444"
                    }}
                >
                    Critical ({data.critical})
                </button>

                <button
                    onClick={() => setFilter("HIGH")}
                    style={{
                        background: "#7c2d12",
                        color: "#f97316"
                    }}
                >
                    High ({data.high})
                </button>

                <button
                    onClick={() => setFilter("MEDIUM")}
                    style={{
                        background: "#713f12",
                        color: "#eab308"
                    }}
                >
                    Medium ({data.medium})
                </button>

                <button
                    onClick={() => setFilter("LOW")}
                    style={{
                        background: "#172554",
                        color: "#60a5fa"
                    }}
                >
                    Low ({data.low})
                </button>

            </div>

            <input
                type="text"
                placeholder="Search CVE or Package..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    background: "#0f172a",
                    color: "white",
                    border: "1px solid #334155"
                }}
            />
            {/* Vulnerability Table */}

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#0f172a",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 0 20px rgba(0,0,0,.4)"
                }}
            >

                <thead>
                    <tr
                        style={{
                            background: "#111827"
                        }}
                    >
                        <th style={{ padding: "16px" }}>CVE</th>
                        <th style={{ padding: "16px" }}>Package</th>
                        <th style={{ padding: "16px" }}>Severity</th>
                        <th style={{ padding: "16px" }}>Title</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredVulnerabilities.length === 0 && (
                        <tr>
                            <td
                                colSpan="4"
                                style={{
                                    textAlign: "center",
                                    padding: "25px",
                                    color: "#94a3b8"
                                }}
                            >
                                No vulnerabilities found
                            </td>
                        </tr>
                    )}

                    {filteredVulnerabilities.map((v, index) => (

                        <tr
                            key={index}
                            style={{
                                borderBottom: "1px solid #1e293b",
                                transition: "0.2s"
                            }}
                        >
                            <td>{v.id}</td>

                            <td>{v.package}</td>

                            <td>

                                <span
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: "8px",
                                        fontWeight: "bold",

                                        background:
                                            v.severity === "CRITICAL"
                                                ? "#450a0a"
                                                : v.severity === "HIGH"
                                                    ? "#7c2d12"
                                                    : v.severity === "MEDIUM"
                                                        ? "#713f12"
                                                        : "#172554",

                                        color:
                                            v.severity === "CRITICAL"
                                                ? "#ef4444"
                                                : v.severity === "HIGH"
                                                    ? "#f97316"
                                                    : v.severity === "MEDIUM"
                                                        ? "#eab308"
                                                        : "#60a5fa"
                                    }}
                                >
                                    {v.severity}
                                </span>

                            </td>

                            <td
                                style={{
                                    maxWidth: "500px",
                                    padding: "12px"
                                }}
                            >
                                {v.title}
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>
            <div
                style={{
                    textAlign: "center",
                    marginTop: "40px",
                    color: "#64748b",
                    fontSize: "12px",
                    borderTop: "1px solid #1e293b",
                    paddingTop: "15px"
                }}
            >
                © 2026 Vibhor Dewangan | AnantX DevSecOps Platform
            </div>

        </div>
    );
}

export default Vulnerabilities;



