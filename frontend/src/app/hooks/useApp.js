import { startBattle } from "../services/app.api";
import {useContext} from "react";
import { AppContext } from "../app.context.jsx";

export const useApp = () => {
    const context = useContext(AppContext);
    const {setMessages} = context;

    const handleSendMessage = async(userMessage) => {
        try {
            const newMockEntry = {
                problem: userMessage,
                solution_1: "Loading...",
                solution_2: "Loading...",
                judgement: null
            };

            setMessages(prev => [...prev, newMockEntry]);

            const {data} = await startBattle(userMessage);
            const {result} = data;

            const {
                problem,
                solution_1,
                solution_2,
                judgement
            } = result;

            setTimeout(() => {
                setMessages((prev) => {
                    const allMessages = [...prev];

                    // overwriting last message
                    allMessages[ allMessages.length - 1 ] = {
                        problem,
                        solution_1,
                        solution_2,
                        judgement
                    };

                    return allMessages;
                });
            }, 1500);

        } catch(err) {
            console.log(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    }

    return { handleSendMessage };
}