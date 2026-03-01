import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await registerUser({ name, email, password, role });

            alert("Account created successfully ✅");
            navigate("/");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Signup failed ❌");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1>🔐 Smart Access Guardian</h1>
                <h2>Sign Up</h2>

                <form onSubmit={handleSignup}>

                    {/* 👇 Added Name Field */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" style={buttonStyle}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: "15px" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "skyblue", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

/* ---------- STYLES ---------- */

const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
};

const cardStyle = {
    backgroundColor: "#2a2a3d",
    padding: "40px",
    borderRadius: "15px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none"
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    backgroundColor: "#4cafef",
    color: "white",
    border: "none",
    cursor: "pointer"
};

export default Signup;