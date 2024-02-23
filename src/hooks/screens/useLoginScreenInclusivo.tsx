import { useEffect, useState } from "react";
import { colors } from "../../theme/styles";
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useReproducirAudio } from "../useReproducirAudio";

interface ModalProps {
    onPressAcept: () => void;
    modal: boolean;
}


export const useLoginScreenInclusivo = () => {
    const [colorMatricula, setColorMatricula] = useState(colors.backgroundTerciary);
    const [colorPasswword, setColorPassword] = useState(colors.backgroundTerciary);
    const [modalVisible, setModalVisible] = useState(false);
    const { reproducirAudio } = useReproducirAudio();

    useEffect(() => {
        setModalVisible(true);
    }, []);

    async function leerMatricula() {
        reproducirAudio({
            soundPath: require('../../../assets/audio/NumeroControl.mp3'),
            onPlayAudio: () => setColorMatricula("yellow"),
            onEndAudio: () => setColorMatricula(colors.backgroundTerciary),
            onStopAudio: () => setColorMatricula(colors.backgroundTerciary),
        });

    }
    
    async function leerContrasena() {
        reproducirAudio({
            soundPath: require('../../../assets/audio/Password.mp3'),
            onPlayAudio: () => setColorPassword("yellow"),
            onEndAudio: () => setColorPassword(colors.backgroundTerciary),
            onStopAudio: () => setColorPassword(colors.backgroundTerciary),
        });
    }

    const RenderModal = ( { onPressAcept, modal }: ModalProps ) => {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Bienvenido!</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonInclusivo]}
                            onPress={() => {
                                    onPressAcept();
                                    setModalVisible(false)
                                }}
                            >
                            <Text style={styles.textStyle}>Modo Inclusivo</Text>
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
        leerMatricula,
        leerContrasena,
        colorMatricula,
        colorPasswword,
        RenderModal,
        modalVisible,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})