import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {

  const navigate = useNavigate();

  /* ---------------- Patients ---------------- */

  const patients = [
    {
      name: "Alice",
      diagnostics: ["MRI – Normal", "Blood Test – Normal"],
      prescriptions: ["Paracetamol", "Vitamin D"],
      treatment: "Rest for 5 days"
    },
    {
      name: "Bob",
      diagnostics: ["X-Ray – Minor issue"],
      prescriptions: ["Ibuprofen"],
      treatment: "Physiotherapy"
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);

  /* ---------------- Appointments ---------------- */

  const [appointments] = useState([
    { patient: "Alice", date: "2026-03-05", slot: "10:00 AM" },
    { patient: "Bob", date: "2026-03-06", slot: "02:00 PM" }
  ]);

  /* ---------------- Queries ---------------- */

  const [queries, setQueries] = useState([
    {
      patient: "Alice",
      question: "Can I take medicine after food?",
      replies: []
    }
  ]);

  const [replyText, setReplyText] = useState("");
  const [activeQuery, setActiveQuery] = useState(null);

  /* ---------------- Treatment ---------------- */

  const [treatmentNote, setTreatmentNote] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");

  /* ---------------- Actions ---------------- */

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const updateTreatment = () => {
    if (!treatmentNote) return;
    alert("Treatment updated");
    setTreatmentNote("");
  };

  const addPrescription = () => {
    if (!medicine || !dosage) return;
    alert("Prescription added");
    setMedicine("");
    setDosage("");
  };

  const sendReply = (index) => {
    if (!replyText) return;

    const updated = [...queries];
    updated[index].replies.push(replyText);

    setQueries(updated);
    setReplyText("");
  };

  return (
    <div style={page}>
      <div style={container}>

        <h1 style={title}>Doctor Portal</h1>

        {/* Appointments */}

        <section style={card}>
          <h3 style={sectionTitle}>Upcoming Appointments</h3>

          {appointments.map((a, i) => (
            <div key={i} style={listItem}>
              <b>{a.patient}</b>
              <br />
              {a.date} • {a.slot}
            </div>
          ))}
        </section>

        {/* Queries */}

        <section style={card}>
          <h3 style={sectionTitle}>Patient Queries</h3>

          {queries.map((q, i) => (
            <div key={i} style={queryCard}>

              <div>
                <b>{q.patient}</b>
                <br />
                {q.question}

                {/* Replies */}

                {q.replies.map((r, index) => (
                  <div key={index} style={replyBox}>
                    Doctor: {r}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 10 }}>

                <input
                  placeholder="Write reply"
                  value={activeQuery === i ? replyText : ""}
                  onFocus={() => setActiveQuery(i)}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={input}
                />

                <button
                  style={primaryBtn}
                  onClick={() => sendReply(i)}
                >
                  Send Reply
                </button>

              </div>

            </div>
          ))}
        </section>

        {/* Patient Records */}

        <section style={card}>
          <h3 style={sectionTitle}>Patient Records</h3>

          <select
            style={input}
            onChange={(e) =>
              setSelectedPatient(
                patients.find(
                  (p) => p.name === e.target.value
                )
              )
            }
          >
            <option>Select Patient</option>

            {patients.map((p, i) => (
              <option key={i}>{p.name}</option>
            ))}
          </select>

          {selectedPatient && (
            <div style={{ marginTop: 15 }}>

              <h4>{selectedPatient.name}</h4>

              <h5>Diagnostics</h5>
              {selectedPatient.diagnostics.map((d, i) => (
                <div key={i} style={listItem}>{d}</div>
              ))}

              <h5>Prescriptions</h5>
              {selectedPatient.prescriptions.map((p, i) => (
                <div key={i} style={listItem}>{p}</div>
              ))}

              <h5>Treatment Plan</h5>
              <div style={listItem}>
                {selectedPatient.treatment}
              </div>

              {/* Update Treatment */}

              <input
                placeholder="Update treatment"
                value={treatmentNote}
                onChange={(e) =>
                  setTreatmentNote(e.target.value)
                }
                style={input}
              />

              <button style={primaryBtn} onClick={updateTreatment}>
                Save
              </button>

              {/* Add Prescription */}

              <input
                placeholder="Medicine"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                style={input}
              />

              <input
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                style={input}
              />

              <button style={secondaryBtn} onClick={addPrescription}>
                Add Prescription
              </button>

            </div>
          )}
        </section>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#1e293b,#0f172a)",
  padding: "40px",
  display: "flex",
  justifyContent: "center"
};

const container = {
  width: "720px"
};

const title = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "32px"
};

const card = {
  background: "rgba(40,40,60,0.9)",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
};

const sectionTitle = {
  marginBottom: "10px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  marginBottom: "8px",
  borderRadius: "8px",
  border: "none",
  background: "#1f1f2e",
  color: "white"
};

const listItem = {
  background: "#1f1f2e",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "6px"
};

const queryCard = {
  background: "#1f1f2e",
  padding: "12px",
  borderRadius: "8px",
  marginTop: "8px"
};

const replyBox = {
  marginTop: "6px",
  padding: "6px",
  background: "#111827",
  borderRadius: "6px"
};

const primaryBtn = {
  padding: "8px 14px",
  background: "#6366f1",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "8px 14px",
  background: "#10b981",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  background: "#374151",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  color: "white"
};

export default DoctorDashboard;