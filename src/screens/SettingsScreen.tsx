import { View, StyleSheet, ActivityIndicator, ScrollView, Text, Switch } from "react-native";
import { useContext, useState } from "react";

import { AuthContext, SettingsContext } from "../context";
import { colors, globalStyles, } from "../theme/styles";
import { Button, ButtonIcon, Incrementer, ModalInput } from "../components";
import { usePeticionPut } from "../hooks/usePeticionPut";
import { User, UserUpdateResponse } from "../interfaces";

export const SettingsScreen = () => {
    const { logOut, authState, logIn  } = useContext(AuthContext);
    
    const { 
        changeFontSize, settingsState, changeDevelopmentSettings, changeModoInclusivo
    } = useContext(SettingsContext);

    const [ nombreModal, setNombreModal] = useState(false);
    const [ apellidosModal, setApellidosModal] = useState(false);
    const [ passwordModal, setPasswordModal] = useState(false);
    const { form, isLoading, onChange, peticionPutAlert } = usePeticionPut({
        nombre: '', apellidos: '', password: '',
    });
    
    const handlePeticion = (data: Object) => {
        peticionPutAlert(
            `/api/user/alumno/${authState.userAuthenticated!.matricula}`,
            data,
            { headers: { Authorization: `Bearer ${authState.token}` } }
        ).then(res => {
            const { user } = (res as UserUpdateResponse);
            logIn(user as User, authState.token!);
        });
    }

    return(
        <View style={[ globalStyles.container, styles.container ]} >
            {(isLoading) ? (
                <View style={{ marginTop: 200 }} >
                    <ActivityIndicator color={colors.secondary} size={100} />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} >
                    <ButtonIcon
                        label="Nombre:" 
                        text={authState.userAuthenticated?.nombre!}
                        iconName="pencil"
                        onPress={() => setNombreModal(true)}
                        style={{ marginTop: 30 }}
                    />
                    <ButtonIcon
                        label="Apellido:" 
                        text={authState.userAuthenticated?.apellidos!}
                        iconName="pencil"
                        onPress={() => setApellidosModal(true)}
                        style={{ marginTop: 30 }}
                    />
                    <ButtonIcon
                        label="Constraseña:" 
                        text={'*********'}
                        iconName="pencil"
                        onPress={() => setPasswordModal(true)}
                        style={{ marginTop: 30 }}
                    />

                    <View 
                        style={{ 
                            width: "100%", 
                            alignSelf: 'center', 
                            borderTopWidth: 1, 
                            borderColor: 'gray', 
                            marginTop: 30,
                        }} 
                    />

                    <View style={styles.containerIncrement}>
                        <Text style={{ fontSize: settingsState.fontSize }} >Tamaño de letra</Text>
                        <Incrementer 
                            value={settingsState.fontSize}
                            onPressPlus={() => {
                                if(settingsState.fontSize < 25) {
                                    changeFontSize(settingsState.fontSize + 1);
                                }
                            }}
                            onPressRest={() => {
                                if(settingsState.fontSize > 16) {
                                    changeFontSize(settingsState.fontSize - 1)
                                }
                                
                            }}
                        />
                    </View>

                    <View style={[styles.containerIncrement]}>
                        <View style={{ flex:1, alignItems: "center"}} >
                            <Text style={{ fontSize: settingsState.fontSize }} >Modo inclusivo</Text>
                        </View>
                        <View style={{ flex:1, alignItems: "center"  }} >
                            <Switch 
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={settingsState.modoInclusivo ? '#f5dd4b' : '#f4f3f4'}
                                value={settingsState.modoInclusivo}
                                onValueChange={() => changeModoInclusivo(!settingsState.modoInclusivo)}
                            />
                        </View>
                    </View>
                    
                    {(settingsState.developmentSettings) && (
                        <View>
                            <Text style={{ fontSize: settingsState.fontSize }} >
                                AuthContext
                            </Text>
                            <Text style={{ backgroundColor: colors.backgroundTerciary }} >
                                { JSON.stringify(authState, null, 5) }
                            </Text>
                            <Text style={{ fontSize: settingsState.fontSize }} >
                                SettingsContext
                            </Text>
                            <Text style={{ backgroundColor: colors.backgroundTerciary }} >
                                { JSON.stringify(settingsState, null, 5) }
                            </Text>
                            
                            <Button
                                onPress={() => changeDevelopmentSettings(false)}
                                text="Desactivar información de desarrollador"
                                style={{ marginTop: 20 }}
                            />
                        </View>
                    )}        
                    
                    <Button 
                        text="Cerrar sesión"
                        onPress={logOut}
                        color={'black'}
                        fontColor="white"
                        style={{ marginTop: 100 }}
                        iconName="log-out"
                    />

                    <View style={{height: 260}} />
                </ScrollView>
            )}

            <ModalInput 
                iconName="pencil"
                onChangeText={value => onChange(value, 'nombre')}
                placeHolder={authState.userAuthenticated?.nombre!}
                setShowModal={setNombreModal}
                showModal={nombreModal}
                onPressAceptar={() => {
                    setNombreModal(false);
                    handlePeticion({ nombre: form.nombre })
                }}
            />

            <ModalInput 
                iconName="pencil"
                onChangeText={value => onChange(value, 'apellidos')}
                placeHolder={authState.userAuthenticated?.apellidos!}
                setShowModal={setApellidosModal}
                showModal={apellidosModal}
                onPressAceptar={() => {
                    setApellidosModal(false);
                    handlePeticion({ apellidos: form.apellidos })
                }}
            />

            <ModalInput 
                iconName="pencil"
                onChangeText={value => onChange(value, 'password')}
                placeHolder={'********'}
                setShowModal={setPasswordModal}
                showModal={passwordModal}
                security={true}
                onPressAceptar={() => {
                    setPasswordModal(false);
                    handlePeticion({ password: form.password })
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        alignItems: 'center'
    },
    containerIncrement: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
    }
});