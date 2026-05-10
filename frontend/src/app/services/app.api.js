import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

const api = new axios.create({
    baseURL,
    withCredentials: true
});

export const startBattle = async(userMessage) => {
    const response = await api.post('/useGraph', {userMessage});
    return response;
}