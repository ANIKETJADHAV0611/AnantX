import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaShieldAlt,
    FaBug,
    FaServer,
    FaRobot,
    FaHome,
    FaChartLine,
    FaExclamationTriangle,
    FaBoxes,
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaCog,
    FaFileAlt
} from "react-icons/fa";


import logo from "../assets/anantx-logo.png";
const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    const [metrics, setMetrics] = useState({
    healthy_services: 0,
    anantbuy_status: "UNKNOWN",
    cpu_usage: 0,
    memory_usage: 0,
    platform_status: "UNKNOWN"
});

    useEffect(() => {

    const loadMetrics = () => {

        fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/dashboard/metrics`)
            .then((res) => res.json())
            .then((data) => {
                setMetrics(data);
            })
            .catch((err) => {
                console.error(err);
            });

    };

    loadMetrics();

    const interval = setInterval(loadMetrics, 10000);

    return () => clearInterval(interval);

}, []);

    const cards = [

    {
        title: "Healthy Services",
        value: metrics.healthy_services,
        icon: <FaShieldAlt size={34} />,
        color: "#22c55e"
    },

    {
        title: "CPU Usage",
        value: `${metrics.cpu_usage}%`,
        icon: <FaServer size={34} />,
        color: "#3b82f6"
    },

    {
        title: "Memory Usage",
        value: `${metrics.memory_usage} MB`,
        icon: <FaRobot size={34} />,
        color: "#a855f7"
    },

    {
        title: "Platform Status",
        value: metrics.platform_status,
        icon: <FaChartLine size={34} />,
        color:
            metrics.platform_status === "ACTIVE"
                ? "#22c55e"
                : "#ef4444"
    },

    {
        title: "AnantBuy Status",
        value: metrics.anantbuy_status,
        icon: <FaBoxes size={34} />,
        color:
            metrics.anantbuy_status === "UP"
                ? "#22c55e"
                : "#ef4444"
    }

];
    return (

        <div style={styles.container}>

            {/* Sidebar */}

            <div style={styles.sidebar}>

                <div style={styles.logoSection}>

                    <img
                        src={logo}
                        alt="logo"
                        style={styles.logo}
                    />

                    <div>

                        <h2 style={styles.logoText}>
                            AnantX
                        </h2>

                        <p
                            style={{
                                fontSize: "11px",
                                color: "#64748b",
                                marginTop: "-8px",
                                marginLeft: "2px"
                            }}
                        >
                            by AnantX Team
                        </p>

                    </div>


                </div>

                <ul style={styles.menu}>

                    <li
                        className="menu-item"
                        style={{
                            ...styles.menuItem,
                            ...styles.activeMenu
                        }}
                    >
                        <FaHome />
                        Dashboard
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/threats")}
                    >
                        <FaExclamationTriangle />
                        Threats
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/vulnerabilities")}
                    >
                        <FaBug />
                        Vulnerabilities
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/containers")}
                    >
                        <FaBoxes />
                        Containers
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/ai")}
                    >
                        <FaRobot />
                        AI Assistant
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/monitoring")}
                    >
                        <FaChartLine />
                        Monitoring
                    </li>
                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/logs")}
                    >
                        <FaFileAlt />
                        Logs Center
                    </li>
                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={() => navigate("/profile")}
                    >
                        <FaUser />
                        Profile
                    </li>

                    <li
                        className="menu-item"
                        style={styles.menuItem}
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt />
                        Logout
                    </li>
                </ul>

            </div>

            {/* Main */}

            <div style={styles.main}>

                {/* Header */}

                <div style={styles.header}>

                    <div>

                        <h1 style={styles.heading}>
                            Security Dashboard -- AnantX
                        </h1>

                        <p style={styles.subtext}>
                            DevSecOps Monitoring Platform
                        </p>

                    </div>

                    <div style={styles.headerActions}>

                        <div style={styles.notify}>
                            <FaBell />
                        </div>

                        <div style={{ position: "relative" }}>

                            <button
                                style={styles.userButton}
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <FaUser />
                                <span>Admin</span>
                            </button>

                            {menuOpen && (
                                <div style={styles.dropdown}>

                                    <div
                                        style={styles.dropdownItem}
                                        onClick={() => navigate("/dashboard/profile")}
                                    >
                                        <FaUser />
                                        Profile
                                    </div>

                                    <div
                                        style={styles.dropdownItem}
                                        onClick={() => navigate("/dashboard/settings")}
                                    >
                                        <FaCog />
                                        Settings
                                    </div>

                                    <div
                                        style={{
                                            ...styles.dropdownItem,
                                            color: "#ef4444"
                                        }}
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* Cards */}

                <div style={styles.cards}>

                    {cards.map((card, index) => (

                        <div
                            key={index}
                            style={{
                                ...styles.card,
                                borderTop: `3px solid ${card.color}`,
                                cursor: card.title === "Logs Center"
                                    ? "pointer"
                                    : "default"
                            }}
                            onClick={() => {
                                if (card.title === "Logs Center") {
                                    navigate("/logs");
                                }
                            }}
                        >

                            <div style={{
                                ...styles.iconBox,
                                color: card.color
                            }}>
                                {card.icon}
                            </div>

                            <h2 style={styles.cardValue}>
                                {card.value}
                            </h2>

                            <p style={styles.cardTitle}>
                                {card.title}
                            </p>

                        </div>

                    ))}

                </div>

                {/* Alerts */}

                <div style={styles.panel}>

                    <h2 style={styles.panelHeading}>
                        Recent Security Alerts
                    </h2>

                    <div style={styles.alert}>
                        <span>
                            ⚠ Suspicious shell execution detected
                        </span>

                        <span style={styles.high}>
                            HIGH
                        </span>
                    </div>

                    <div style={styles.alert}>
                        <span>
                            ⚠ Unauthorized network connection
                        </span>

                        <span style={styles.medium}>
                            MEDIUM
                        </span>
                    </div>

                    <div style={styles.alert}>
                        <span>
                            ⚠ Container privilege escalation
                        </span>

                        <span style={styles.critical}>
                            CRITICAL
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

const styles = {

    container: {
        display: "flex",
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #0f172a, #020617)",
        color: "white",
        overflowX: "hidden"
    },

    sidebar: {
        width: "260px",
        background: "rgba(15,23,42,0.92)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        padding: "25px",
        backdropFilter: "blur(12px)"
    },

    logoSection: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "50px"
    },

    logo: {
        width: "72px",
        height: "72px",
        objectFit: "cover",
        marginRight: "-18px",
        marginLeft: "-10px"
    },

    logoText: {
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: "1.4px",
        color: "#38bdf8",
        textShadow: "0 0 12px rgba(56,189,248,0.45)"
    },

    menu: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },

    menuItem: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 18px",
        borderRadius: "14px",
        color: "#cbd5e1",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginBottom: "10px",
        fontWeight: "500"
    },
    activeMenu: {
        background: "rgba(56,189,248,0.12)",
        borderLeft: "3px solid #38bdf8",
        color: "#38bdf8",
        boxShadow: "0 0 18px rgba(56,189,248,0.12)"
    },

    main: {
        flex: 1,
        padding: "35px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
    },

    heading: {
        margin: 0,
        fontSize: "42px"
    },

    subtext: {
        color: "#94a3b8",
        marginTop: "10px"
    },

    notify: {
        background: "#0f172a",
        padding: "16px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.06)"
    },

    cards: {
        border: "1px solid rgba(255,255,255,0.05)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: "24px",
        marginTop: "40px"
    },

    card: {
        background: "rgba(15,23,42,0.78)",
        borderRadius: "22px",
        padding: "28px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 30px rgba(0,0,0,0.28)",
        transition: "all 0.3s ease",
        border: "1px solid rgba(255,255,255,0.05)"
    },
    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: "14px"
    },

    userButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#0f172a",
        color: "white",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px",
        padding: "14px 18px",
        cursor: "pointer"
    },

    dropdown: {
        position: "absolute",
        top: "58px",
        right: 0,
        width: "180px",
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        overflow: "hidden",
        zIndex: 1000,
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
    },

    dropdownItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px",
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
    },

    iconBox: {
        marginBottom: "20px"
    },

    cardValue: {
        fontSize: "38px",
        margin: 0
    },

    cardTitle: {
        color: "#94a3b8",
        marginTop: "8px"
    },

    panel: {
        marginTop: "45px",
        background: "rgba(15,23,42,0.72)",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(14px)"
    },

    panelHeading: {
        marginTop: 0
    },

    alert: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(2,6,23,0.9)",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "16px",
        flexWrap: "wrap",
        gap: "10px",
        border: "1px solid rgba(255,255,255,0.04)"
    },
    high: {
        color: "#f97316"
    },

    medium: {
        color: "#eab308"
    },

    critical: {
        color: "#ef4444"
    }

};

export default Dashboard;
