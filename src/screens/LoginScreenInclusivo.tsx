import React, { useContext, useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

import { AuthContext } from '../context';
import { UserAuthenticated } from '../interfaces';

import { usePeticionPost } from '../hooks';
import { HeaderApp } from '../components/HeaderApp';
import { colors, globalStyles } from '../theme/styles';
import { Button, InputIcon } from '../components';
import { Audio } from 'expo-av';

export const LoginScreenInclusivo = () => {
    const { logIn } = useContext(AuthContext);
    const { form, isLoading, onChange, peticionPostAlert} = usePeticionPost({ 
        correo: "", password: "" 
    });
    const [sound, setSound] = useState<any>();
    const [colorMatricula, setColorMatricula] = useState("white");
    const [colorContrasena, setColorContrasena] = useState("white");

    async function LeerMatricula() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/NumeroControl.mp3')
        );
        setSound(sound);
        const { durationMillis } = await sound.getStatusAsync();

        console.log("es la duracion: ", durationMillis);

        console.log('Playing Sound');
        setColorMatricula("yellow")
        sound.playAsync();
        setTimeout(() => {
            setColorMatricula("white")
        }, durationMillis);
    }

    async function LeerContrasena() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/Contraseña.mp3')
        );
        setSound(sound);
        const { durationMillis } = await sound.getStatusAsync();

        console.log("es la duracion: ", durationMillis);

        console.log('Playing Sound');
        setColorContrasena("yellow")
        sound.playAsync();
        setTimeout(() => {
            setColorContrasena("white")
        }, durationMillis);
    }

    const handlePeticion = () => {
        peticionPostAlert("/api/auth/login", form)
            .then(res => {
                if(!res) return;
                const { token, user } = res as UserAuthenticated;
                logIn(user, token);
            });
    }

    return (
        <View style={{ flex: 1 }} >
            <HeaderApp height={140} />
            <View style={ globalStyles.container } >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >       
                        <Image 
                            source={require("../../assets/JustiAppLogo.png")}
                            style={[ styles.image, { marginTop: 50 } ]}
                        />
                        {
                            (isLoading) ? (
                                <View style={{ marginTop: 100 }} >
                                    <ActivityIndicator size={80} color={colors.secondary} />
                                </View>
                            ) : (
                                <>
                                <InputIcon
                                    click={LeerMatricula} 
                                    style={{ alignSelf: "center", marginTop: 40, backgroundColor: colorMatricula }}
                                    onChangeText={value => onChange(`${value}@upt.edu.mx`, "correo")}
                                    placeholder="Matricula"
                                    iconName='person'
                    
                                />

                                <InputIcon
                                    click={LeerContrasena} 
                                    style={{ alignSelf: "center", marginTop: 40 , backgroundColor: colorContrasena }}
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
    }
})
