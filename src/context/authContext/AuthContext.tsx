import { createContext, useReducer } from "react";

import { User } from "../../interfaces";
import { authReducer } from "./AuthReducer";

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
}

export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
    const [ authState, dispatch ] = useReducer(authReducer, authInitialState);

    const logIn = (user: User, token: string) => {
        dispatch({ type: "signIn", payload: { token, userAuthenticated: user }});
    }

    const logOut = () => dispatch({ type: "logOut" });

    return (
        <AuthContext.Provider
            value={{
                authState, 
                logIn, 
                logOut,
            }}
        >
            { children }
        </AuthContext.Provider>
    );

}