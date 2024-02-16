import React, { createContext, useReducer } from "react";
import { settingReducer } from "./SettingsReducer";

export interface SettingsState {
    fontSize: number;
    modoInclusivo: boolean;
}

export const settingsInitialState: SettingsState  = {
    fontSize: 22,
    modoInclusivo: false,
}

export interface SettingsContextProps {
    settingsState: SettingsState;
    changeFontSize: (size: number) => void;
    changeModoInclusivo: (state: boolean) => void;
}

export const SettingsContext = createContext({} as SettingsContextProps);
export const SettingsProvider = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
    const [ settingsState, dispatch ] = useReducer(settingReducer, settingsInitialState);

    const changeFontSize = (size: number) => dispatch({ type: "changeFontSize", payload: size });
    const changeModoInclusivo = (state: boolean) => dispatch({ type: "changeModoInclusivo", payload: state });

    return (
        <SettingsContext.Provider
            value={{
                settingsState,
                changeFontSize, 
                changeModoInclusivo,
            }}
        >
            { children }
        </SettingsContext.Provider>
    );
}