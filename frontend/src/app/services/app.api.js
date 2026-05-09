import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_API_URL;

const api = new axios.create({
    baseURL,
    withCredentials: true
});

export const startBattle = async(problem) =>  {
    const response = await api.post('/useGraph', {problem});
    return response;
}