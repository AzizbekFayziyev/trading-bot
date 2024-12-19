'use client';

import React, { 
    createContext, 
    Dispatch, 
    ReactNode, 
    SetStateAction, 
    useContext, 
    useEffect, 
    useState 
} from "react";

interface AppContextProps {
    isWalletConnected: boolean;
    setWalletConnected: Dispatch<SetStateAction<boolean>>;
    isAuth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>
    theme: ThemeProps,
    toggleTheme: () => void;
    walletData: Record<string, any> | null;
    setWalletData: Dispatch<SetStateAction<Record<string, any>>>
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
}

type ThemeProps = "light" | "dark"

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isWalletConnected, setWalletConnected] = useState(false);
    const [isAuth, setAuth] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [theme, setTheme] = useState<ThemeProps>("dark");
    const [walletData, setWalletData] = useState<Record<string, any> | null>(null);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") || "dark") as ThemeProps;
        const wallet = localStorage.getItem("walletData");

        if (wallet) {
            setWalletData(JSON.parse(wallet));
        }

        setTheme(savedTheme);
    }, []);

    useEffect(() => {   
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const values = {
        isWalletConnected,
        setWalletConnected,
        isAuth,
        setAuth,
        theme,
        toggleTheme,
        walletData,
        setWalletData,
        token,
        setToken,
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};