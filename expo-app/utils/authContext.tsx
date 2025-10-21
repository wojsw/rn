import { createContext, useState } from "react";
import { router } from "expo-router";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {
        console.log('login');
    },
    logout: () => {
        console.log('logout');
    },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
        router.replace('/');
    }

    const logout = () => {
        setIsLoggedIn(false);
        router.replace('/login');
    }

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}