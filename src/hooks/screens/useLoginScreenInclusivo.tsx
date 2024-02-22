import { useEffect, useState } from "react";
import { colors } from "../../theme/styles";
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
    onPressAcept: () => void;
    modal: boolean;
}


export const useLoginScreenInclusivo = () => {
    const [colorMatricula, setColorMatricula] = useState(colors.backgroundTerciary);
    const [colorPasswword, setColorPassword] = useState(colors.backgroundTerciary);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        setModalVisible(true);
    }, []);

    async function leerMatricula() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../../../assets/audio/NumeroControl.mp3'));
            setColorMatricula("yellow");
            await soundObject.playAsync();
            const { durationMillis } = await soundObject.getStatusAsync() as any;
            setTimeout(() => {
                setColorMatricula(colors.backgroundTerciary);
            }, durationMillis);
        } catch (error) {
            console.error('Error cargando sonido para matrícula', error);
        }
    }
    
    async function leerContrasena() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../../../assets/audio/Password.mp3'));
            setColorPassword("yellow");
            await soundObject.playAsync();
            const { durationMillis } = await soundObject.getStatusAsync() as any;
            setTimeout(() => {
                setColorPassword("white");
            }, durationMillis);
        } catch (error) {
            console.error('Error cargando sonido para contraseña', error);
        }
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