import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../theme/styles";
import { SettingsContext } from "../context";

interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
    color?: string;
    fontColor?: string;
}

export const Button = ({ text, onPress, style, color = colors.buttonPrimary, fontColor = "black" }: Props) => {
    const { settingsState } = useContext(SettingsContext);

    return (
        <TouchableOpacity 
            style={[ style, localStyles.container, { backgroundColor: color } ]} 
            onPress={onPress}
        >
            <Text 
                style={[ localStyles.text, { color: fontColor, fontSize: settingsState.fontSize } ]} 
            >
                { text }
            </Text>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        height: 62,
    },
    text: {
        fontWeight: "bold",
    }
});
