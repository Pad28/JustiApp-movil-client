import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, widthWindow } from '../theme/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SettingsContext } from '../context';

interface Props {
    iconName: string;
    placeholder: string;

    security?: boolean;
    style?: StyleProp<ViewStyle>
    value?: string;
    onChangeText: (value: string) => void;
    onFocus?: () => void;
}

export const InputIcon = ({ onChangeText, placeholder, iconName, security = false, style, value, onFocus }: Props) => {
    const { settingsState } = useContext(SettingsContext);
    const [securityIcon, setSecurityIcon] = useState("eye");
    const [showSecurity, setShowSecurity] = useState(security);

    const handleSecurity = () => {
        if(securityIcon === "eye") setSecurityIcon("eye-off")
        else setSecurityIcon("eye");
        setShowSecurity(!showSecurity);
    }

    return (
        <View style={[styles.container, style]} >
            <Ionicons name={iconName} size={40} />
            <TextInput 
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={showSecurity}
                style={[styles.input, { fontSize: settingsState.fontSize }]}
                onFocus={onFocus}
            />
            {
                (security) ? (
                    <TouchableOpacity onPress={handleSecurity} style={styles.securityButton} >
                        <Ionicons name={securityIcon} size={40} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: widthWindow - 60,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: colors.backgroundTerciary,
    },
    input: {
        height: 50,
        width: 220,
        paddingHorizontal: 6,
    },
    securityButton: {
    }
});
