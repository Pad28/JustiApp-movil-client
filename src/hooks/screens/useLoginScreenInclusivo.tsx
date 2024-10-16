import { useContext, useEffect, useState } from "react";
import { colors } from "../../theme/styles";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useReproducirAudio } from "../useReproducirAudio";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, SettingsContext } from "../../context";
import { usePeticionPost } from "../usePeticionPost";
import { UserAuthenticated } from "../../interfaces";

interface ModalProps {
    onPressAcept: () => void;
}

export const useLoginScreenInclusivo = () => {
    const { logIn, isLoadinUser, authState } = useContext(AuthContext);
    
    const { 
        changeModoInclusivo, settingsState, changeDevelopmentSettings 
    } = useContext(SettingsContext);

    const [colorMatricula, setColorMatricula] = useState(colors.backgroundTerciary);
    const [colorPasswword, setColorPassword] = useState(colors.backgroundTerciary);
    const [modalVisible, setModalVisible] = useState(false);
    const { reproducirAudio } = useReproducirAudio();
    const [counter, setCounter] = useState(0);

    const { form, isLoading, onChange, peticionPostAlert, clearValues} = usePeticionPost({ 
        matricula: "", password: "" 
    });

    useEffect(() => {
        setTimeout(() => {
            reproducirAudio({
                soundPath: require('../../../assets/audio/InicioInclusivo.mp3'),
            });
            setModalVisible(true);
        }, 500);
    }, []);

    useEffect(() => {
        if(counter == 20 && !settingsState.developmentSettings ) {
            changeDevelopmentSettings(true);
            Alert.alert('Alert', 'Opciones de desarrollo activadas');
        }
    }, [counter]);
    
    async function leerMatricula() {
        reproducirAudio({
            soundPath: require('../../../assets/audio/NumeroControl.mp3'),
            onPlayAudio: () => {
                setColorMatricula("yellow");
                setColorPassword(colors.backgroundTerciary);
            },
            onEndAudio: () => setColorMatricula(colors.backgroundTerciary),
        });

    }
    
    async function leerContrasena() {
        reproducirAudio({
            soundPath: require('../../../assets/audio/Password.mp3'),
            onPlayAudio: () => {
                setColorPassword("yellow");
                setColorMatricula(colors.backgroundTerciary);
            },
            onEndAudio: () => setColorPassword(colors.backgroundTerciary),
        });
    }

    const handlePeticion = async() => {
        await peticionPostAlert({ path: "/api/auth/login/alumno", body: form, validateEmpty: true })
            .then(res => {
                if(!res || typeof res === 'string') return;
                const { token, user } = res as UserAuthenticated;
                logIn(user, token);
            });
        clearValues();
    }

    const RenderModal = ( { onPressAcept }: ModalProps ) => {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[ styles.modalText, styles.modalTitle ]}>Bienvenido!</Text>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonInclusivo]}
                            onPress={() => {
                                    onPressAcept();
                                    setModalVisible(false);
                                }}
                            >
                            <Text style={styles.textStyle}>Modo Inclusivo</Text>
                            <Ionicons 
                                name="eye-outline" 
                                size={50} 
                                style={{ alignSelf: "center", marginTop: 10 }}  
                                color={"white"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                    setModalVisible(false);
                                }}
                            >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    return {
        settingsState,
        changeDevelopmentSettings,
        changeModoInclusivo,
        colorMatricula, 
        colorPasswword, 
        leerContrasena, 
        leerMatricula, 
        RenderModal, 
        counter,
        setCounter,
        isLoadinUser,
        handlePeticion,
        isLoading,
        onChange,
    };
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        justifyContent: "center",
        marginVertical: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'blue',
        width: 100,
        height: 70
    },
    buttonInclusivo: {
        backgroundColor: 'red',
        width: 180,
        height: 120
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 24
    },
})