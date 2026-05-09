import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({children}) => {

    // messages = [
    //     {
    //         problem: string,
    //         solution_1: string,
    //         solution_2: string,
    //         judgement: {
    //             solution_1_score: Number,
    //             solution_2_score: Number,
    //             solution_1_reasoning: string,
    //             solution_2_reasoning: string
    //         }
    //     }, 
    //     {
    //         problem: string,
    //         solution_1: string,
    //         solution_2: string,
    //         judgement: {
    //             solution_1_score: Number,
    //             solution_2_score: Number,
    //             solution_1_reasoning: string,
    //             solution_2_reasoning: string
    //         }
    //     }
    // ];

    const [messages, setMessages] = useState([]);

    return <AppContext.Provider value={{messages, setMessages}}>
        {children}
    </AppContext.Provider>
}