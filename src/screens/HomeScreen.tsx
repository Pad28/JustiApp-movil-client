import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { AuthContext, SettingsContext } from "../context";

import { colors, globalStyles, heightWindow, widthWindow } from "../theme/styles";
import { Button, CalendarApp, DropBox, InputIcon } from "../components";
import { useHomeScreen, useReproducirAudio } from "../hooks";


export const HomeScreen = () => {
    const { token, userAuthenticated } = useContext(AuthContext).authState;
    const { settingsState } = useContext(SettingsContext);
    const {
        motivo, 
        motivos, 
        selectImage, 
        setDates, 
        setMotivo, 
        isLoading,
        isLoadingUpload,
        setText,
        handlePeticion,
        isSelectedImage,
        selectedImage,
    } = useHomeScreen();

    const { reproducirAudio } = useReproducirAudio();

    const [colorDrop, setColorDrop] = useState("white");

    async function leerCalendario() {
        reproducirAudio({
            soundPath: require('../../assets/audio/rangoFecha.mp3')
        });
    }

    async function leerDrop() {
        reproducirAudio({
            soundPath: require('../../assets/audio/MotivoDrop.mp3'),
            onPlayAudio() {
                setColorDrop("yellow");
            },
            onEndAudio() {
                setColorDrop("white");
            },
        });
    }

    return (
        <View style={[ globalStyles.container, styles.container ]} >
            <ScrollView  >
            {(isLoading || isLoadingUpload) ? (
                <View style={{ marginTop: 200 }} >
                    <ActivityIndicator size={100} color={colors.secondary} />
                </View>
            ) : (
                <>
                <CalendarApp 
                    style={{ marginTop: 40 }} 
                    getDates={setDates} 
                    onPress={(settingsState.modoInclusivo ? leerCalendario : undefined)}    
                />
                <DropBox 
                    style={{ marginTop: 20 }}
                    texto="Motivo:"
                    getValue={setMotivo}
                    values={motivos}
                    styleDrop={{ backgroundColor: colorDrop }}
                    onPress={(settingsState.modoInclusivo ? leerDrop : undefined)}
                />
                {(motivo.value === 'Otro') && (
                    <InputIcon 
                        style={{ marginTop: 20, alignSelf: "center" }}
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

                {(isSelectedImage) && (
                    <Image 
                        source={{ uri: selectedImage }}
                        style={{ 
                            alignSelf: "center", 
                            height: 250, 
                            width: 250, 
                            marginTop: 30, 
                            borderRadius: 10
                        }}
                    />
                )}

                <Button 
                    style={{ width: 130, marginTop: 50, alignSelf: "center" }}
                    onPress={() => handlePeticion(
                        token!, 
                        userAuthenticated!.matricula, 
                        userAuthenticated!.tutor!
                    )}
                    text="Enviar"
                />
                </>
            )}

            <View style={{ height: 200 }} />
            </ScrollView>
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
        alignSelf: "center",
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
