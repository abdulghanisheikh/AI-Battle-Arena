import axios from "axios";

const api = new axios.create({
    withCredentials: true
});

export const startBattle = async(userMessage) => {
    const response = await api.post('/useGraph', {userMessage});
    return response;
}