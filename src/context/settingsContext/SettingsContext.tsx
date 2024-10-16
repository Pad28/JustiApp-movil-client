import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingReducer } from "./SettingsReducer";
import { envs } from "../../config/envs";

export interface SettingsState {
    fontSize: number;
    modoInclusivo: boolean;
    developmentSettings: boolean;
    api_url?: string;
}

export const settingsInitialState: SettingsState  = {
    fontSize: 20,
    modoInclusivo: false,
    developmentSettings: false,
}

export interface SettingsContextProps {
    settingsState: SettingsState;
    changeFontSize: (size: number) => void;
    changeModoInclusivo: (state: boolean) => void;
    changeDevelopmentSettings: (state: boolean) => void;
    changeApiUrl: (url: string) => void;
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
        
        const devSettings = await AsyncStorage.getItem('developmentSettings')
        if(devSettings) changeDevelopmentSettings(devSettings === 'true');

        const apiUrl = await AsyncStorage.getItem('api_url');
        (apiUrl) ? changeApiUrl(apiUrl) : changeApiUrl(envs.API_URL);
        // changeApiUrl(envs.API_URL);
    }

    const changeFontSize = async(size: number) => {
        await AsyncStorage.setItem("fontSize", size.toString());
        dispatch({ type: "changeFontSize", payload: size });
    };
    
    const changeModoInclusivo = (payload: boolean) => {
        dispatch({ type: "changeModoInclusivo", payload });
    }

    const changeDevelopmentSettings = async(payload: boolean) => {
        await AsyncStorage.setItem('developmentSettings', payload + '');
        dispatch({ type: "changeDevelopmentSettings", payload });
    }
    
    const changeApiUrl = async(payload: string) => {
        await AsyncStorage.setItem('api_url', payload);
        dispatch({ type: "changeApiUrl", payload });
    }

    return (
        <SettingsContext.Provider
            value={{
                settingsState,
                changeFontSize, 
                changeModoInclusivo,
                changeDevelopmentSettings,
                changeApiUrl,
            }}
        >
            { children }
        </SettingsContext.Provider>
    );
}