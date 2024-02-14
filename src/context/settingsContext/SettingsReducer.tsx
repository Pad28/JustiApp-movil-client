import { SettingsState } from "./SettingsContext";

type settingAction = 
    | { type: "changeFontSize", payload: number };

export const settingReducer = (state: SettingsState, action: settingAction): SettingsState => {
    switch (action.type) {
        case 'changeFontSize':
            return {
                ...state,
                fontSize: action.payload,
            } 
        default:
            return state;
    }
}