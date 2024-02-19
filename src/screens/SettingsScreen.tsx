import { View, StyleSheet } from "react-native";
import { colors, globalStyles } from "../theme/styles";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { Button, ButtonIcon, ModalInput } from "../components";

export const SettingsScreen = () => {
    const { logOut, authState } = useContext(AuthContext);

    const [ uno, setUno] = useState(false);
    const [ dos, setDos] = useState(false);
    const [ tres, setTres] = useState(false);

    return(
        <View style={[ globalStyles.container, styles.container ]} >
            <ButtonIcon 
                text={authState.userAuthenticated?.nombre!}
                iconName="pencil"
                onPress={() => setUno(true)}
                style={{ marginTop: 30 }}
            />
            <ButtonIcon 
                text={authState.userAuthenticated?.apellidos!}
                iconName="pencil"
                onPress={() => setDos(true)}
                style={{ marginTop: 30 }}
            />
            <ButtonIcon 
                text={'contraseña'}
                iconName="pencil"
                onPress={() => setTres(true)}
                style={{ marginTop: 30 }}
            />

            <Button 
                text="Cerrar seción"
                onPress={logOut}
                style={{ marginTop: 30 }}
                color={colors.buttonSecondary}
                fontColor="white"
            />

            <ModalInput 
                iconName="pencil"
                onChangeText={() => {}}
                placeHolder={authState.userAuthenticated?.nombre!}
                setShowModal={setUno}
                showModal={uno}
            />

            <ModalInput 
                iconName="pencil"
                onChangeText={() => {}}
                placeHolder={authState.userAuthenticated?.apellidos!}
                setShowModal={setDos}
                showModal={dos}
            />

            <ModalInput 
                iconName="pencil"
                onChangeText={() => {}}
                placeHolder={'****'}
                setShowModal={setTres}
                showModal={tres}
            />
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        alignItems: 'center'
    }
});