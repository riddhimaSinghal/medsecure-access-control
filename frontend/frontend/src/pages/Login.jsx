import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });

            const token = res.data.token;

            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded.role;

            localStorage.setItem("role", role);

            navigate(`/${role}`);

        } catch {
            alert("Invalid credentials ❌");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1>🔐 Smart Access Guardian</h1>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
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

                    <button type="submit" style={buttonStyle}>
                        Login
                    </button>
                </form>

                <p style={{ marginTop: "15px" }}>
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "skyblue", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

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

export default Login;