import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../context';
import { UserAuthenticated } from '../interfaces';

import { usePeticionPost } from '../hooks';
import { HeaderApp } from '../components/HeaderApp';
import { colors, globalStyles } from '../theme/styles';
import { Button, InputIcon } from '../components';
import { RootLoginStackParams } from '../navigaton';
import { StackScreenProps } from '@react-navigation/stack';
import { Audio } from 'expo-av';

interface Props extends StackScreenProps<RootLoginStackParams,any>{

}

export const LoginScreen = ({ navigation }: Props ) => {
    const { logIn } = useContext(AuthContext);
    const { form, isLoading, onChange, peticionPostAlert } = usePeticionPost({
        correo: "", password: ""
    });
    const [sound, setSound] = useState<any>();

    const handlePeticion = () => {
        peticionPostAlert("/api/auth/login", form)
            .then(res => {
                if (!res) return;
                const { token, user } = res as UserAuthenticated;
                logIn(user, token);
            });
    }
    const [modalVisible, setModalVisible] = useState(true);

    async function InicioInclusivo() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/InicioInclusivo.mp3')
        );
        setSound(sound);
        sound.playAsync();
    }

    useEffect(() => {
        if(modalVisible){
            InicioInclusivo()
        }
    }, []);

    return (
        <View style={{ flex: 1 }} >
            <HeaderApp height={140} />
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <View>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={modalVisible}
                                
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Bienvenido!</Text>
                                        <Pressable
                                            style={[styles.button, styles.buttonInclusivo]}
                                            onPress={() => {navigation.navigate("LoginScreenInclusivo")
                                            setModalVisible(false)}
                                            }>
                                            <Text style={styles.textStyle}>Modo Inclusivo</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(false)}
                                            >
                                            <Text style={styles.textStyle}>Cerrar</Text>
                                        </Pressable>
                                    </View>
                                </View>


                            </Modal>

                        </View>
                        <Image
                            source={require("../../assets/JustiAppLogo.png")}
                            style={[styles.image, { marginTop: 50 }]}
                        />
                        {
                            (isLoading) ? (
                                <View style={{ marginTop: 100 }} >
                                    <ActivityIndicator size={80} color={colors.secondary} />
                                </View>
                            ) : (
                                <>
                                    <InputIcon
                                        style={{ alignSelf: "center", marginTop: 40 }}
                                        onChangeText={value => onChange(`${value}@upt.edu.mx`, "correo")}
                                        placeholder="Matricula"
                                        iconName='person'
                                    />

                                    <InputIcon
                                        style={{ alignSelf: "center", marginTop: 40 }}
                                        onChangeText={value => onChange(value, "password")}
                                        placeholder="Contraseña"
                                        iconName="lock-closed"
                                        security={true}
                                    />

                                    <Button
                                        style={{ width: 180, alignSelf: "center", marginTop: 60 }}
                                        text="Aceptar"
                                        onPress={handlePeticion}
                                    />
                                </>
                            )
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 140,
        height: 140,
        borderRadius: 30,
        alignSelf: "center",
    },
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
