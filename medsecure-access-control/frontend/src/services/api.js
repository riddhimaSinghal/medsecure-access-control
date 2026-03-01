import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// Auth
export const registerUser = (data) =>
    API.post("/api/auth/register", data);

export const loginUser = (data) =>
    API.post("/api/auth/login", data);

// Patient
export const getPatientRecords = () =>
    API.get("/api/patient/records");

export const triggerEmergency = () =>
    API.post("/api/patient/emergency");

export default API;