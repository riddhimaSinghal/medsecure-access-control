import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function AdminPanel() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            navigate("/unauthorized");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/");
    };

    const logs = JSON.parse(localStorage.getItem("logs")) || [];

    const emergencyLogs = logs.filter(log =>
        log.action?.toLowerCase().includes("emergency")
    );

    const filteredLogs =
        filter === "all"
            ? logs
            : logs.filter(log => log.role === filter);

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>🔐 Smart Access Guardian</h1>
                    <p>Security Operations Center</p>
                </div>
                <div className="role-badge">ROLE: ADMIN</div>
            </div>

            {/* System Overview */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-title">Total Access Events</div>
                    <div className="stat-value">{logs.length}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Emergency Events</div>
                    <div className="stat-value">{emergencyLogs.length}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Doctors Active</div>
                    <div className="stat-value">
                        {new Set(logs.filter(l => l.role === "doctor").map(l => l.role)).size}
                    </div>
                </div>
            </div>

            {/* Emergency Alerts */}
            <div className="section-card">
                <div className="section-title">🚨 Emergency Alerts</div>

                {emergencyLogs.length === 0 ? (
                    <p>No emergency events recorded.</p>
                ) : (
                    emergencyLogs.slice(-5).reverse().map((log, index) => (
                        <div key={index} className="log-item" style={{ color: "#f87171" }}>
                            <strong>{log.role?.toUpperCase()}</strong> — {log.action}
                            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                                {log.time}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Log Filter */}
            <div className="section-card">
                <div className="section-title">Audit Log Viewer</div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ marginRight: "10px" }}>Filter by role:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: "6px",
                            borderRadius: "6px",
                            border: "none"
                        }}
                    >
                        <option value="all">All</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>

                {filteredLogs.length === 0 ? (
                    <p>No logs available.</p>
                ) : (
                    filteredLogs.slice().reverse().map((log, index) => (
                        <div key={index} className="log-item">
                            <strong>{log.role?.toUpperCase()}</strong> — {log.action}
                            <span
                                className={`status-badge ${log.action.toLowerCase().includes("emergency")
                                    ? "emergency"
                                    : "authorized"
                                    }`}
                            >
                                {log.action.toLowerCase().includes("emergency")
                                    ? "EMERGENCY"
                                    : "AUTHORIZED"}
                            </span>
                            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                                {log.time}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default AdminPanel;