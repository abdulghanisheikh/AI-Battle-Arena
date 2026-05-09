import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    return <AppContext.Provider value={{messages, setMessages}}>
        {children}
    </AppContext.Provider>
}