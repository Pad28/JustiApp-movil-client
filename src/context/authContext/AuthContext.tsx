import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User, UserAuthenticated } from "../../interfaces";
import { authReducer } from "./AuthReducer";
import { usePeticionPost } from "../../hooks";

export interface AuthState {
    islogged: boolean;
    userAuthenticated?: User;
    token?: string;
}

export const authInitialState: AuthState = {
    islogged: false,
}

export interface AuthContextProps {
    authState: AuthState;
    logIn: (user: User, token: string) => void;
    logOut: () => void;
    isLoadinUser: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
    const [ authState, dispatch ] = useReducer(authReducer, authInitialState);
    const { isLoading, setIsLoading, peticionPostAlert } = usePeticionPost({});

    useEffect(() => {
        checkUser();
    }, [])

    // Validar que el JWT del usuario aún sea valido.
    const checkUser = async() => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('userAuthenticatedToken');
        if(!token) {
            setIsLoading(false);
            return dispatch({ type: 'logOut' })
        };
        const result = await peticionPostAlert('/api/auth/login/verify-jwt', {}, true, {
            headers: { 'Authorization': `Bearer ${token}` }
        }, "La sesión a expirado");
        setIsLoading(false);
        if(!result) return logOut();
        const { user, token: validatedToken } = result as UserAuthenticated;
        logIn(user, validatedToken);
    }

    // Inicia sesión del usuario en el context y guarda el JWT en el AsyncStorage
    const logIn = async (user: User, token: string) => {
        dispatch({ type: "signIn", payload: { token, userAuthenticated: user }});
        await AsyncStorage.setItem('userAuthenticatedToken', token);
    }

    // Cierra sesión del usuario en el context y elimina el JWT en el AsyncStorage
    const logOut = async() => {
        await AsyncStorage.removeItem('userAuthenticatedToken');
        dispatch({ type: "logOut" });
    }

    return (
        <AuthContext.Provider
            value={{
                authState, 
                logIn, 
                logOut,
                isLoadinUser: isLoading
            }}
        >
            { children }
        </AuthContext.Provider>
    );

}
