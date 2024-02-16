import { SettingsState } from "./SettingsContext";

type settingAction = 
    | { type: "changeFontSize", payload: number }
    | { type: "changeModoInclusivo", payload: boolean };

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
        default:
            return state;
    }
}