import { useContext, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SettingsContext } from "../context";
import { colors } from "../theme/styles";

interface Props {
    value: number;
    onPressPlus: () => void;
    onPressRest: () => void;
}

export const Incrementer = ({ value, onPressPlus, onPressRest }: Props) => {
    const { settingsState } = useContext(SettingsContext);
    const [ v, setV ] = useState(value);

    const handelValue = (incremento: number) => setV(v + incremento);

    return (
        <View style={styles.container} >
            <TouchableOpacity 
                style={styles.botonLeft} 
                onPress={() => {
                    if(v > 16) handelValue(-1);
                    onPressRest();
                }}
            >
                <Text style={{ fontSize: settingsState.fontSize, fontWeight: 'bold' }} > - </Text>
            </TouchableOpacity>

            <View>
                <Text style={[{ fontSize: settingsState.fontSize }, styles.value]} > { v } </Text>
            </View>
                
            <TouchableOpacity 
                style={styles.botonRight} 
                onPress={() => {
                    if(v < 25) handelValue(1);
                    onPressPlus();
                }}
            >
                <Text style={{ fontSize: settingsState.fontSize, fontWeight: 'bold'  }} > + </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundSecondary, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        width: 130
    },
    botonLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        flex: 1,
    },
    botonRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
