import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function PatientDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "patient") {
            navigate("/unauthorized");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/");
    };

    const mockLogs = [
        { action: "Doctor viewed your record", type: "authorized", time: "Today 2:30 PM" },
        { action: "Emergency access triggered", type: "emergency", time: "Yesterday 5:10 PM" }
    ];

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>🔐 Smart Access Guardian</h1>
                    <p>Patient Security Overview</p>
                </div>
                <div className="role-badge">
                    ROLE: PATIENT
                </div>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-title">Total Records</div>
                    <div className="stat-value">4</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Access This Month</div>
                    <div className="stat-value">7</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Emergency Events</div>
                    <div className="stat-value">1</div>
                </div>
            </div>

            {/* Records Section */}
            <div className="section-card">
                <div className="section-title">Your Medical Record</div>
                <p><strong>Blood Group:</strong> O+</p>
                <p><strong>Diagnosis:</strong> Hypertension</p>
                <p><strong>Last Updated:</strong> Jan 15, 2026</p>
            </div>

            {/* Access Logs */}
            <div className="section-card">
                <div className="section-title">Who Accessed Your Data</div>

                {mockLogs.map((log, index) => (
                    <div key={index} className="log-item">
                        {log.action}
                        <span className={`status-badge ${log.type}`}>
                            {log.type === "emergency" ? "EMERGENCY" : "AUTHORIZED"}
                        </span>
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {log.time}
                        </div>
                    </div>
                ))}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default PatientDashboard;