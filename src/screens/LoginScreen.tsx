import React, { useContext } from 'react'
import { 
    ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, View 
} from 'react-native';

import { AuthContext, SettingsContext } from '../context';
import { UserAuthenticated } from '../interfaces';

import { useLoginScreenInclusivo, usePeticionPost } from '../hooks';
import { colors, globalStyles } from '../theme/styles';
import { Button, InputIcon, HeaderApp } from '../components';

export const LoginScreen = () => {
    const { logIn, isLoadinUser } = useContext(AuthContext);
    const { changeModoInclusivo, settingsState } = useContext(SettingsContext);
    const { form, isLoading, onChange, peticionPostAlert, clearValues} = usePeticionPost({ 
        correo: "", password: "" 
    });

    const { 
        colorMatricula, 
        colorPasswword, 
        leerContrasena, 
        leerMatricula, 
        RenderModal, 
        modalVisible, 
    } = useLoginScreenInclusivo();

    const handlePeticion = async() => {
        await peticionPostAlert({ path: "/api/auth/login", body: form, validateEmpty: true })
            .then(res => {
                if(!res || typeof res === 'string') return;
                const { token, user } = res as UserAuthenticated;
                logIn(user, token);
            });
        clearValues();
    }

    return (
        <View style={{ flex: 1 }} >
            <HeaderApp height={140} />
            <View style={ globalStyles.container } >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >       
                        <RenderModal 
                            modal={modalVisible}
                            onPressAcept={() => changeModoInclusivo(true)}
                        />
                        <Image 
                            source={require("../../assets/JustiAppLogo.png")}
                            style={[ styles.image, { marginTop: 50 } ]}
                        />
                        {
                            (isLoading || isLoadinUser) ? (
                                <View style={{ marginTop: 100 }} >
                                    <ActivityIndicator size={80} color={colors.secondary} />
                                </View>
                            ) : (
                                <>
                                <InputIcon 
                                    style={{ alignSelf: "center", marginTop: 40, backgroundColor: colorMatricula }}
                                    onChangeText={value => onChange(`${value}@upt.edu.mx`, "correo")}
                                    placeholder="Matricula"
                                    iconName='person'
                                    onFocus={settingsState.modoInclusivo ? leerMatricula : () => {}}
                                />

                                <InputIcon 
                                    style={{ alignSelf: "center", marginTop: 40, backgroundColor: colorPasswword }}
                                    onChangeText={value => onChange(value, "password")}
                                    placeholder="Contraseña"
                                    iconName="lock-closed"
                                    security={true}
                                    onFocus={settingsState.modoInclusivo ? leerContrasena : () => {}}
                                />

                                <Button 
                                    style={{ width: 180, alignSelf: "center", marginTop: 60 }}
                                    text="Aceptar" 
                                    onPress={handlePeticion} 
                                />
                                </>
                            )
                        }

                        <View style={{ height: 50 }} />
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
