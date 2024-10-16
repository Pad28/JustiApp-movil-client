import React from 'react'
import { 
    ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View 
} from 'react-native';

import { useLoginScreenInclusivo } from '../hooks';
import { colors, globalStyles } from '../theme/styles';
import { Button, InputIcon, HeaderApp } from '../components';

export const LoginScreen = () => {

    const { 
        settingsState,
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
        changeModoInclusivo
    } = useLoginScreenInclusivo();

    return (
        <View style={{ flex: 1 }} >
            <HeaderApp height={140} />
            <View style={ globalStyles.container } >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >     

                        <RenderModal 
                            onPressAcept={() => changeModoInclusivo(true)}
                        />

                        <TouchableWithoutFeedback
                            onPress={() => setCounter(counter + 1)}
                        >
                        <Image 
                            source={require("../../assets/JustiAppLogo.png")}
                            style={[ styles.image, { marginTop: 50 } ]}
                        />
                        </TouchableWithoutFeedback>
                        {
                            (isLoading || isLoadinUser) ? (
                                <View style={{ marginTop: 100 }} >
                                    <ActivityIndicator size={80} color={colors.secondary} />
                                </View>
                            ) : (
                                <>
                                <InputIcon 
                                    style={{ alignSelf: "center", marginTop: 40, backgroundColor: colorMatricula }}
                                    onChangeText={value => onChange(value, "matricula")}
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
