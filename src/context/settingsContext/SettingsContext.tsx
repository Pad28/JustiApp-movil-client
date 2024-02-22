import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    useEffect(() => {
        checkSettings();
    }, []);

    const checkSettings = async() => {
        const fontSize = await AsyncStorage.getItem('fontSize');
        if(fontSize) changeFontSize(parseInt(fontSize));
    }

    const changeFontSize = async(size: number) => {
        await AsyncStorage.setItem('fontSize', size.toString());
        dispatch({ type: "changeFontSize", payload: size });
    };
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