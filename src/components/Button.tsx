import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, View } from "react-native";

import { colors } from "../theme/styles";
import { SettingsContext } from "../context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
    color?: string;
    fontColor?: string;
    iconName?: string;
}

export const Button = ({ text, onPress, style, color = colors.buttonPrimary, fontColor = "black", iconName }: Props) => {
    const { fontSize } = useContext(SettingsContext).settingsState;

    return (
        <TouchableOpacity 
            style={[ style, localStyles.container, { backgroundColor: color } ]} 
            onPress={onPress}
        >   
            <Text 
                style={[ localStyles.text, { color: fontColor, fontSize: fontSize } ]} 
            >
                { text }
            </Text>
            {(iconName) && (
                <View style={{ marginLeft: 20 }} >
                    <Ionicons name={iconName} color={fontColor} size={fontSize + 6} />
                </View>
            )}
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        paddingVertical: 20
    },
    text: {
        fontWeight: "bold",
    }
});
