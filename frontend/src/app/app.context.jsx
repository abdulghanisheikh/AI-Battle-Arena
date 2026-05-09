import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState([]);
    const [error, setError] = useState(null);

    return <AppContext.Provider value={{loading, setLoading, chat, setChat, error, setError}}>
        {children}
    </AppContext.Provider>
}