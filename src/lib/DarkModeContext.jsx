import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [enabled, setEnabled] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    });

    useEffect(() => {
        if (enabled) {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
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
