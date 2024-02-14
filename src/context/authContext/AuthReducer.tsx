import { User } from "../../interfaces";
import { AuthState } from "./AuthContext";

type userPayload = {
    userAuthenticated: User;
    token: string;
}

type authAction = 
    | { type: "signIn", payload: userPayload }
    | { type: "logOut" };

export const authReducer = (state: AuthState, action: authAction): AuthState => {
    switch(action.type) {
        case 'signIn':
            const { token, userAuthenticated } = action.payload;
            return {
                ...state,
                islogged: true,
                userAuthenticated: userAuthenticated,
                token
            }
        case 'logOut': 
            return { islogged: false }
        default: 
            return state
    }
}