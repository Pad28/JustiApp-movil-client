import React, { createContext, useReducer } from "react";
import { settingReducer } from "./SettingsReducer";

export interface SettingsState {
    fontSize: number;
}

export const settingsInitialState: SettingsState  = {
    fontSize: 22
}

export interface SettingsContextProps {
    settingsState: SettingsState;
    changeFontSize: (size: number) => void;
}

export const SettingsContext = createContext({} as SettingsContextProps);
export const SettingsProvider = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
    const [ settingsState, dispatch ] = useReducer(settingReducer, settingsInitialState);

    const changeFontSize = (size: number) => dispatch({ type: "changeFontSize", payload: size });

    return (
        <SettingsContext.Provider
            value={{
                settingsState,
                changeFontSize, 
            }}
        >
            { children }
        </SettingsContext.Provider>
    );
}