import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

import logo from "../assets/anantx-logo.png";

const Login = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
const [error, setError] = useState("");
    const handleLogin = async () => {
    try {
        const response = await API.post("/login", {
            username,
            password
        });

        console.log("LOGIN RESPONSE:", response);
        console.log("LOGIN DATA:", response.data);

        localStorage.setItem(
            "token",
            response.data.access_token
        );

        console.log("Token saved.");

        setAuthenticated(true);

        console.log("Authenticated.");

        navigate("/dashboard", { replace: true });

        console.log("Navigation complete.");
    } catch (err) {
        console.log("FULL ERROR:", err);

        if (err.response) {
            console.log("Response:", err.response);
        }

        if (err.message) {
            console.log("Message:", err.message);
        }

        setError("Invalid username or password");
    }
};

    return (

        <div style={styles.container}>

            {/* LEFT PANEL */}

            <div style={styles.leftPanel}>

                <div style={styles.overlay} />

                <div style={styles.brandContent}>

                    <img
                        src={logo}
                        alt="logo"
                        style={styles.logo}
                    />

                    <h1 style={styles.brandTitle}>
                        AnantX
                    </h1>

                    <p style={styles.brandSubtitle}>
                        AI-Powered DevSecOps &
                        Runtime Security Platform
                    </p>

                    <div style={styles.features}>

                        <div style={styles.feature}>
                            ✔ Runtime Threat Detection
                        </div>

                        <div style={styles.feature}>
                            ✔ Kubernetes Security
                        </div>

                        <div style={styles.feature}>
                            ✔ AI Security Intelligence
                        </div>

                        <div style={styles.feature}>
                            ✔ DevSecOps Automation
                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div style={styles.rightPanel}>

                <div style={styles.card}>

                    <h2 style={styles.loginTitle}>
                        Welcome Back
                    </h2>

                    <p style={styles.loginSubtitle}>
                        Secure access to AnantX
                    </p>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        style={styles.input}
                    />

                    <button
                        style={styles.button}
                        onClick={handleLogin}
                    >
                        Secure Login
                    </button>

                    {
                        error && (
                            <div
                                style={{
                                    color: "#ef4444",
                                    marginTop: "10px",
                                    fontSize: "14px"
                                }}
                            >
                                {error}
                            </div>
                        )
                    }

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "12px",
                            marginTop: "20px",
                            textAlign: "center"
                        }}
                    >
                        Developed by Vibhor Dewangan
                    </p>

                </div>

            </div>

        </div>
    );
};

const styles = {

    container: {
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
        overflow: "hidden",
        flexWrap: "wrap"
    },

    leftPanel: {
        flex: 1,
        minWidth: "350px",
        background:
            "radial-gradient(circle at top left,#0f172a,#020617)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px"
    },

    overlay: {
        position: "absolute",
        width: "450px",
        height: "450px",
        background:
            "rgba(56,189,248,0.12)",
        filter: "blur(120px)",
        borderRadius: "50%"
    },

    brandContent: {
        position: "relative",
        zIndex: 2,
        color: "white",
        maxWidth: "500px"
    },

    logo: {
        width: "95px",
        marginBottom: "10px"
    },

    brandTitle: {
        fontSize: "54px",
        margin: 0,
        color: "#38bdf8",
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: "2px"
    },

    brandSubtitle: {
        marginTop: "18px",
        fontSize: "18px",
        color: "#94a3b8",
        lineHeight: "1.7"
    },

    features: {
        marginTop: "45px"
    },

    feature: {
        marginBottom: "18px",
        color: "#cbd5e1",
        fontSize: "16px"
    },

    rightPanel: {
        flex: 1,
        minWidth: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
    },

    card: {
        width: "100%",
        maxWidth: "420px",
        background:
            "rgba(15,23,42,0.75)",
        border:
            "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        borderRadius: "26px",
        padding: "45px",
        boxShadow:
            "0 0 40px rgba(0,0,0,0.35)"
    },

    loginTitle: {
        color: "white",
        marginBottom: "8px",
        fontSize: "34px"
    },

    loginSubtitle: {
        color: "#94a3b8",
        marginBottom: "35px"
    },

    input: {
        width: "100%",
        padding: "16px",
        marginBottom: "20px",
        borderRadius: "14px",
        border:
            "1px solid rgba(255,255,255,0.06)",
        background: "#0f172a",
        color: "white",
        fontSize: "15px",
        outline: "none"
    },

    button: {
        width: "100%",
        padding: "16px",
        borderRadius: "14px",
        border: "none",
        background:
            "linear-gradient(90deg,#0ea5e9,#38bdf8)",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.3s"
    }
};

export default Login;
