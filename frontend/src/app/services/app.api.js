import axios from "axios";

const api = new axios.create({
    withCredentials: true
});

export const startBattle = async(userMessage) => {
    const response = await api.post('/invokeGraph', {userMessage});
    return response;
}