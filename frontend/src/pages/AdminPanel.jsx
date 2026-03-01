import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  /* ---------------- Data ---------------- */

  const [users, setUsers] = useState([
    { name: "Alice", role: "Patient" },
    { name: "Bob", role: "Doctor" },
    { name: "Dr. Smith", role: "Doctor" }
  ]);

  const [logs, setLogs] = useState([
    "User Alice logged in",
    "Dr. Smith accessed patient records",
    "Emergency access triggered"
  ]);

  const [systemStatus] = useState([
    "Database Connected",
    "API Running",
    "Security Monitoring Active"
  ]);

  /* ---------------- Actions ---------------- */

  const removeUser = (index) => {
    const confirmDelete = window.confirm(
      "Remove this user?"
    );

    if (!confirmDelete) return;

    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  const runSecurityScan = () => {
    setLogs([
      "Security scan completed ✔",
      ...logs
    ]);
  };

  const generateReport = () => {
    alert("Compliance report generated");
  };

  const emergencyAccess = () => {
    alert("Emergency access logged");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={page}>
      <div style={container}>

        <h1 style={title}>Admin Control Center</h1>

        {/* System Status */}

        <section style={panel}>
          <h3>System Status</h3>

          {systemStatus.map((s, i) => (
            <div key={i} style={statusItem}>
              {s}
            </div>
          ))}
        </section>

        {/* User Management */}

        <section style={panel}>
          <h3>User Management</h3>

          {users.map((u, i) => (
            <div key={i} style={userRow}>
              <span>
                {u.name} — {u.role}
              </span>

              <button
                style={dangerBtn}
                onClick={() => removeUser(i)}
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        {/* Security Logs */}

        <section style={panel}>
          <h3>Security Logs</h3>

          <button style={scanBtn} onClick={runSecurityScan}>
            Run Security Scan
          </button>

          <div style={logBox}>
            {logs.map((log, i) => (
              <div key={i} style={logItem}>
                {log}
              </div>
            ))}
          </div>
        </section>

        {/* Compliance */}

        <section style={panel}>
          <h3>Compliance</h3>

          <button style={primaryBtn} onClick={generateReport}>
            Generate Compliance Report
          </button>
        </section>

        {/* Emergency */}

        <section style={panel}>
          <h3>Emergency Access</h3>

          <button style={dangerBtn} onClick={emergencyAccess}>
            Trigger Emergency Access
          </button>
        </section>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top,#020617,#000000)",
  padding: "40px",
  display: "flex",
  justifyContent: "center"
};

const container = {
  width: "780px"
};

const title = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "34px",
  color: "#22c55e"
};

const panel = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 0 20px rgba(0,255,170,0.1)"
};

const statusItem = {
  padding: "8px",
  marginTop: "6px",
  background: "#020617",
  borderRadius: "6px",
  border: "1px solid #1e293b"
};

const userRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  background: "#020617",
  borderRadius: "6px",
  marginTop: "8px"
};

const logBox = {
  marginTop: "10px",
  maxHeight: "160px",
  overflowY: "auto"
};

const logItem = {
  padding: "6px",
  borderBottom: "1px solid #1e293b"
};

const primaryBtn = {
  padding: "8px 14px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const scanBtn = {
  padding: "8px 14px",
  background: "#38bdf8",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px"
};

const dangerBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  background: "#1e293b",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  color: "white"
};

export default AdminPanel;