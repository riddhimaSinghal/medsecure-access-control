import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {

  const navigate = useNavigate();

  const doctors = [
    "Dr. Smith",
    "Dr. Patel",
    "Dr. Chen"
  ];

  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM"
  ];

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [queryDoctor, setQueryDoctor] = useState("");
  const [queryText, setQueryText] = useState("");
  const [queries, setQueries] = useState([]);

  const [showBill, setShowBill] = useState(false);

  const prescriptions = [
    {
      doctor: "Dr. Smith",
      medicine: "Paracetamol",
      dosage: "2 times daily",
      notes: "After food"
    }
  ];

  const records = [
    "Blood Test – Normal",
    "X-Ray – Mild inflammation",
    "BP Check – Stable"
  ];

  /* ---------- ACTIONS ---------- */

  const bookAppointment = () => {
    if (!doctor || !date || !slot) {
      alert("Please complete appointment details");
      return;
    }

    setAppointments([
      ...appointments,
      { doctor, date, slot, reason }
    ]);

    setDoctor("");
    setDate("");
    setSlot("");
    setReason("");
  };

  const cancelAppointment = (index) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
  };

  const refillPrescription = () => {
    alert("Refill request sent to doctor");
  };

  const sendQuery = () => {
    if (!queryDoctor || !queryText) return;

    setQueries([
      ...queries,
      { doctor: queryDoctor, text: queryText }
    ]);

    setQueryText("");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ---------- UI ---------- */

  return (
    <div style={page}>
      <div style={container}>

        <h1 style={title}>Patient Portal</h1>

        {/* Health Records */}

        <section style={card}>
          <h3 style={sectionTitle}>Health Records</h3>

          {records.map((r, i) => (
            <div key={i} style={listItem}>{r}</div>
          ))}
        </section>

        {/* Appointment */}

        <section style={card}>
          <h3 style={sectionTitle}>Book Appointment</h3>

          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            style={input}
          >
            <option>Select Doctor</option>
            {doctors.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={input}
          />

          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            style={input}
          >
            <option>Select Time Slot</option>
            {slots.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>

          <input
            placeholder="Reason for visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={input}
          />

          <button style={primaryBtn} onClick={bookAppointment}>
            Confirm Appointment
          </button>

          <h4 style={{ marginTop: 15 }}>Upcoming Appointments</h4>

          {appointments.length === 0 && (
            <p style={{ opacity: 0.7 }}>No appointments booked</p>
          )}

          {appointments.map((a, i) => (
            <div key={i} style={appointmentCard}>
              <div>
                <b>{a.doctor}</b>
                <br />
                {a.date} • {a.slot}
                <br />
                {a.reason}
              </div>

              <button
                style={cancelBtn}
                onClick={() => cancelAppointment(i)}
              >
                Cancel
              </button>
            </div>
          ))}
        </section>

        {/* Prescriptions */}

        <section style={card}>
          <h3 style={sectionTitle}>Prescriptions</h3>

          {prescriptions.map((p, i) => (
            <div key={i} style={listItem}>
              <b>{p.doctor}</b>
              <br />
              Medicine: {p.medicine}
              <br />
              Dosage: {p.dosage}
              <br />
              Notes: {p.notes}
            </div>
          ))}

          <button style={secondaryBtn} onClick={refillPrescription}>
            Request Refill
          </button>
        </section>

        {/* Billing */}

        <section style={card}>
          <h3 style={sectionTitle}>Billing</h3>

          <button
            style={primaryBtn}
            onClick={() => setShowBill(true)}
          >
            View Bill
          </button>

          {showBill && (
            <div style={bill}>
              <h4>Hospital Invoice</h4>

              Consultation: ₹500  
              Lab Tests: ₹1200  
              Medicines: ₹350  

              <hr />

              <b>Total: ₹2050</b>

              <br />

              <button
                style={closeBtn}
                onClick={() => setShowBill(false)}
              >
                Close
              </button>
            </div>
          )}
        </section>

        {/* Query */}

        <section style={card}>
          <h3 style={sectionTitle}>Ask Doctor</h3>

          <select
            value={queryDoctor}
            onChange={(e) => setQueryDoctor(e.target.value)}
            style={input}
          >
            <option>Select Doctor</option>
            {doctors.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>

          <input
            placeholder="Write your query"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            style={input}
          />

          <button style={primaryBtn} onClick={sendQuery}>
            Send Query
          </button>

          {queries.map((q, i) => (
            <div key={i} style={listItem}>
              To {q.doctor}: {q.text}
            </div>
          ))}
        </section>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#1e293b,#020617)",
  padding: "40px",
  display: "flex",
  justifyContent: "center"
};

const container = {
  width: "700px"
};

const title = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "32px"
};

const card = {
  background: "rgba(42,42,61,0.85)",
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
  marginBottom: "10px",
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

const appointmentCard = {
  background: "#1f1f2e",
  padding: "12px",
  borderRadius: "8px",
  marginTop: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const primaryBtn = {
  padding: "10px 16px",
  background: "#6366f1",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px 16px",
  background: "#f59e0b",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  marginTop: "10px"
};

const cancelBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const bill = {
  marginTop: "15px",
  padding: "15px",
  background: "#111827",
  borderRadius: "10px"
};

const closeBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white"
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

export default PatientDashboard;