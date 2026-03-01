import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div style={containerStyle}>
            <h1>🔐 Smart Access Guardian</h1>
            <h2 style={{ color: "red" }}>Unauthorized Access ❌</h2>
            <p>You do not have permission to view this page.</p>

            <button style={buttonStyle} onClick={() => navigate("/")}>
                Go Back to Login
            </button>
        </div>
    );
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "15px"
};

const buttonStyle = {
    padding: "8px 16px",
    cursor: "pointer"
};

export default Unauthorized;