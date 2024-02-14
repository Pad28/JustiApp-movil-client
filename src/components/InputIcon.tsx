import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { widthWindow } from '../theme/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SettingsContext } from '../context';

interface Props {
    iconName: string;
    placeholder: string;
    onChangeText: (value: string) => void;

    security?: boolean;
    style?: StyleProp<ViewStyle>
}

export const InputIcon = ({ onChangeText, placeholder, iconName, security = false, style }: Props) => {
    const { settingsState } = useContext(SettingsContext);
    const [securityIcon, setSecurityIcon] = useState("eye");
    const [showSecurity, setShowSecurity] = useState(security);

    const handleSecurity = () => {
        if(securityIcon === "eye") setSecurityIcon("eye-off")
        else setSecurityIcon("eye");
        setShowSecurity(!showSecurity);
    }

    return (
        <View style={[style, localStyles.container]} >
            <Ionicons name={iconName} size={40} />
            <TextInput 
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={showSecurity}
                style={[localStyles.input, { fontSize: settingsState.fontSize }]}
            />
            {
                (security) ? (
                    <TouchableOpacity onPress={handleSecurity} >
                        <Ionicons name={securityIcon} size={40} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: widthWindow - 60,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "white"
    },
    input: {
        height: 50,
        width: 220,
        paddingHorizontal: 6,
    }
});
