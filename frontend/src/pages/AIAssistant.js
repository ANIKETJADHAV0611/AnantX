import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonStyle } from "../styles/navigationStyles";

function AIAssistant() {
    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const askAI = async () => {

        if (!question.trim()) return;

        setLoading(true);
        setAnswer("");

        try {

            const response = await fetch(
                "${window.location.protocol}//${window.location.hostname}:8000/api/ai/query",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question
                    })
                }
            );

            const data = await response.json();

            setTimeout(() => {

                setAnswer(data.answer);

                setLoading(false);

            }, 1500);

        } catch (err) {

            setAnswer(
                "Failed to connect to AI service."
            );

            setLoading(false);
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

            <button
                onClick={() => navigate("/dashboard")}
                style={backButtonStyle}
            >
                ← Back to Dashboard
            </button>

            <h1
                style={{
                    color: "#38bdf8"
                }}
            >
                🤖 AI Security Assistant
            </h1>

            <p
                style={{
                    color: "#94a3b8"
                }}
            >
                Ask security questions about your platform.
            </p>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            >

                <button
                    onClick={() =>
                        setQuestion(
                            "How many critical vulnerabilities?"
                        )
                    }
                    style={quickBtn}
                >
                    Critical Vulnerabilities
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "How many high vulnerabilities?"
                        )
                    }
                    style={quickBtn}
                >
                    High Vulnerabilities
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "Give security summary"
                        )
                    }
                    style={quickBtn}
                >
                    Security Summary
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "How many containers are running?"
                        )
                    }
                    style={quickBtn}
                >
                    Container Health
                </button>

            </div>

            <div
                style={{
                    marginTop: "30px",
                    background: "#0f172a",
                    padding: "25px",
                    borderRadius: "16px"
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <div
                        style={{
                            background: "#020617",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #ef4444"
                        }}
                    >
                        <h3>Risk Level</h3>
                        <h1 style={{ color: "#ef4444" }}>
                            HIGH
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#020617",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #38bdf8"
                        }}
                    >
                        <h3>AI Status</h3>
                        <h1 style={{ color: "#38bdf8" }}>
                            ACTIVE
                        </h1>
                    </div>

                </div>
                <input
                    type="text"
                    placeholder="How many critical vulnerabilities?"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "1px solid #334155",
                        background: "#020617",
                        color: "white",
                        marginBottom: "15px"
                    }}
                />

                <button
                    onClick={askAI}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#38bdf8",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    🤖 Ask AI
                </button>

            </div>
            {loading && (

                <div
                    style={{
                        marginTop: "25px",
                        background: "#0f172a",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #38bdf8"
                    }}
                >

                    <h3 style={{ color: "#38bdf8" }}>
                        🤖 AI is Thinking...
                    </h3>

                    <p>
                        Analyzing vulnerabilities,
                        containers and security posture...
                    </p>

                </div>

            )}
            {answer && (

                <div
                    style={{
                        padding: "14px 24px",
                        borderRadius: "12px",
                        border: "none",
                        background:
                            "linear-gradient(90deg,#38bdf8,#0ea5e9)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600",
                        boxShadow:
                            "0 0 20px rgba(56,189,248,0.4)",
                        transition: "0.3s"
                    }}
                >

                    <h3
                        style={{
                            color: "#22c55e"
                        }}
                    >
                        🤖 AI Assistant
                    </h3>

                    <p>{answer}</p>

                </div>

            )}

        </div>
    );
}
const quickBtn = {

    padding:"10px 16px",

    background:"#0f172a",

    border:"1px solid #334155",

    borderRadius:"999px",

    color:"white",

    cursor:"pointer",

    transition:"0.3s"
};

export default AIAssistant;
