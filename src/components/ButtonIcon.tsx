import { Ionicons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { widthWindow } from "../theme/styles";
import { useContext } from "react";
import { SettingsContext } from "../context";

interface Props {
    style?: StyleProp<ViewStyle>;
    text: string;
    onPress: () => void;
    iconName: string;
}

export const ButtonIcon = ({ style, onPress, text, iconName }: Props) => {
    const { settingsState } = useContext(SettingsContext)

    return (
        <TouchableOpacity 
            style={[ styles.container, style]}
            onPress={onPress} 
        >   
            <View style={[ styles.column]} >
                <Text style={{ fontSize: settingsState.fontSize, marginLeft: 20 }} > 
                    {text} 
                </Text>
            </View>
            <View style={[ styles.column, { alignItems: 'flex-end' } ]} >
                <Ionicons name={iconName} size={28} style={{ marginRight: 20 }} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        width: widthWindow - 50,
        height: 40,
        borderRadius: 12
    },
    column: {
        width: '50%',
    }
});
