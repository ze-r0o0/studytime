import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (enabled) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [enabled]);

    return (
        <DarkModeContext.Provider value={{ enabled, setEnabled }}>
            {children}
        </DarkModeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
    return useContext(DarkModeContext);
}