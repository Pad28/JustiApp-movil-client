import { SettingsState } from "./SettingsContext";

type settingAction = 
    | { type: "changeFontSize", payload: number }
    | { type: "changeModoInclusivo", payload: boolean }
    | { type: "changeApiUrl", payload: string }
    | { type: "changeDevelopmentSettings", payload: boolean };

export const settingReducer = (state: SettingsState, action: settingAction): SettingsState => {
    switch (action.type) {
        case 'changeFontSize':
            return {
                ...state,
                fontSize: action.payload,
            }
        case 'changeModoInclusivo': 
            return {
                ...state,
                modoInclusivo: action.payload
            }
        case "changeDevelopmentSettings":
            return {
                ...state,
                developmentSettings: action.payload,
            }
        case "changeApiUrl":
            return {
                ...state,
                api_url: action.payload,
            }
        default:
            return state;
    }
}