import { createContext, useEffect, useState } from "react";
import { router } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    storeAuthState: (state: boolean) => Promise<void>;
}

const STORE_AUTH_STATE_KEY = 'auth_state';
SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {
        console.log('login');
    },
    logout: () => {
        console.log('logout');
    },
    storeAuthState: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const storeAuthState = async (state: boolean) => {
        try {
            await AsyncStorage.setItem(STORE_AUTH_STATE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error storing auth state:', error);
        }
    }

    const login = () => {
        setIsLoggedIn(true);
        storeAuthState(true);
        router.replace('/');
    }

    const logout = () => {
        setIsLoggedIn(false);
        storeAuthState(false);
        router.replace('/login');
    }

    useEffect(() => {
        const getAuthState = async () => {
            try {
                const isLoggedIn = await AsyncStorage.getItem(STORE_AUTH_STATE_KEY);
                console.log('isLoggedIn', isLoggedIn);
                if (isLoggedIn) {
                    setIsLoggedIn(JSON.parse(isLoggedIn));
                }
            } catch (error) {
                console.error('Error getting auth state:', error);
            }
        };
        getAuthState();
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return <AuthContext.Provider value={{ storeAuthState, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};