import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { AuthContext, SettingsContext } from "../context";

import { colors, globalStyles, widthWindow } from "../theme/styles";
import { Button, CalendarApp, DropBox, InputIcon } from "../components";
import { useHomeScreen } from "../hooks";


export const HomeScreen = () => {
    const { token } = useContext(AuthContext).authState;
    const { settingsState } = useContext(SettingsContext);
    const {
        motivo, 
        motivos, 
        selectImage, 
        setDates, 
        setMotivo, 
        isLoading,
        setText,
        handlePeticion
    } = useHomeScreen();

    return (
        <View style={[ globalStyles.container, styles.container ]} >
            {(isLoading) ? (
                <View style={{ marginTop: 200 }} >
                    <ActivityIndicator size={100} color={colors.secondary} />
                </View>
            ) : (
                <>
                <CalendarApp style={{ marginTop: 40 }} getDates={setDates} />
                <DropBox 
                    style={{ marginTop: 20 }}
                    texto="Motivo:"
                    getValue={setMotivo}
                    values={motivos}
                />
                {(motivo.value === 'Otro') && (
                    <InputIcon 
                        style={{ marginTop: 20 }}
                        iconName="pencil" 
                        placeholder="Ingresa el motivo" 
                        onChangeText={setText}/>
                )}

                <TouchableOpacity style={styles.continaerBoton} onPress={selectImage} >
                    <Image 
                        source={require('../../assets/image-icon.png')}
                        style={{ width: 60, height: 60 }}
                    />
                    <Text style={[{ fontSize: settingsState.fontSize}, styles.textBoton]} >
                        Adjuntar evidencia
                    </Text>
                </TouchableOpacity>

                <Button 
                    style={{ width: 130, marginTop: 50 }}
                    onPress={() => handlePeticion(token!)}
                    text="Enviar"
                />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    continaerBoton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingVertical: 4,
        marginTop: 50,
        width: widthWindow - 100,
        backgroundColor: colors.secondary,
        borderRadius: 10,
    },
    textBoton: {
        color: 'white', 
        fontWeight: 'bold'
    }
});
