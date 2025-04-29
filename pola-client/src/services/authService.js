    import axios from "axios";

    const API_URL = "http://localhost:5000/api/auth";

    export const loginUser = async (credentials) => {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; 
    };

    export const registerUser = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
    };
