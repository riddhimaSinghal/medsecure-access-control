import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { getPatientRecords, triggerEmergency } from "../services/api";

function DoctorDashboard() {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");

    // ✅ Declare FIRST
    const logActivity = (action) => {
        const logs = JSON.parse(localStorage.getItem("logs")) || [];
        logs.push({
            role: "doctor",
            action,
            time: new Date().toLocaleString()
        });
        localStorage.setItem("logs", JSON.stringify(logs));
    };

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (role !== "doctor") {
            navigate("/unauthorized");
            return;
        }

        const loadPatients = async () => {
            try {
                const res = await getPatientRecords();
                const data = res.data.data;

                if (typeof data === "string") {
                    const mockPatients = [
                        {
                            id: 1,
                            name: "John Smith",
                            age: 42,
                            bloodGroup: "O+",
                            diagnosis: "Hypertension",
                            lastVisit: "Jan 15, 2026"
                        }
                    ];
                    setPatients(mockPatients);
                    setSelectedPatient(mockPatients[0]);
                } else {
                    setPatients(data);
                    setSelectedPatient(data[0]);
                }

                logActivity("Viewed patient records");

            } catch (err) {
                setError(err?.response?.data || "Access denied");
            }
        };

        loadPatients();

    }, [navigate]);

    const handleEmergency = async () => {
        const confirmAction = window.confirm(
            "⚠️ Emergency access will be logged and flagged. Continue?"
        );

        if (!confirmAction) return;

        try {
            await triggerEmergency();
            logActivity("EMERGENCY ACCESS TRIGGERED");
            alert("🚨 Emergency Access Logged");
        } catch (err) {
            alert(err?.response?.data || "Emergency request failed");
        }
    };

    const handleSaveNotes = () => {
        if (!notes.trim()) return;

        logActivity(`Added notes for ${selectedPatient.name}`);
        alert("Notes saved successfully");
        setNotes("");
    };

    const logs = JSON.parse(localStorage.getItem("logs")) || [];

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>🔐 Smart Access Guardian</h1>
                    <p>Doctor Workstation</p>
                </div>
                <div className="role-badge">ROLE: DOCTOR</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "20px" }}>

                {/* Patient List */}
                <div className="section-card">
                    <div className="section-title">Patients</div>

                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                background:
                                    selectedPatient?.id === patient.id ? "#334155" : "transparent",
                                borderRadius: "8px",
                                marginBottom: "8px"
                            }}
                        >
                            {patient.name}
                        </div>
                    ))}
                </div>

                {/* Patient Record */}
                <div className="section-card">
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {selectedPatient && (
                        <>
                            <div className="section-title">Patient Record</div>

                            <p><strong>Name:</strong> {selectedPatient.name}</p>
                            <p><strong>Age:</strong> {selectedPatient.age}</p>
                            <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                            <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                            <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>

                            <hr style={{ margin: "20px 0" }} />

                            <div className="section-title">Doctor Notes</div>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Write clinical observations..."
                                style={{
                                    width: "100%",
                                    minHeight: "100px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "none",
                                    marginBottom: "10px"
                                }}
                            />

                            <button
                                onClick={handleSaveNotes}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#3b82f6",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                Save Notes
                            </button>
                        </>
                    )}
                </div>

            </div>

            {/* Recent Activity */}
            <div className="section-card" style={{ marginTop: "30px" }}>
                <div className="section-title">Recent Activity</div>

                {logs.slice(-5).reverse().map((log, index) => (
                    <div key={index} className="log-item">
                        {log.action}
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {log.time}
                        </div>
                    </div>
                ))}
            </div>

            {/* Emergency Section */}
            <div className="section-card">
                <div className="section-title">Emergency Override</div>

                <button
                    onClick={handleEmergency}
                    style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Trigger Emergency Access
                </button>
            </div>

        </div>
    );
}

export default DoctorDashboard;