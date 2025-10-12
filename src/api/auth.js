import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/accounts/";

export const loginUser = async (email, password) => {
    const res = await axios.post(`${BASE_URL}login/`, { email, password });
    return res.data;
};
