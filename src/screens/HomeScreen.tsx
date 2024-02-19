import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context";

import { Ionicons } from "@expo/vector-icons";
import { colors, globalStyles } from "../theme/styles";
import { Button, CalendarApp, DropBox, InputIcon } from "../components";
import { useHomeScreen } from "../hooks/screens/useHomeScreen";


export const HomeScreen = () => {
    const { authState } = useContext(AuthContext);
    const {
        motivo, 
        motivos, 
        selectImage, 
        setDates, 
        setMotivo, 
        selectedImage,
        onChange,
        dates,
    } = useHomeScreen();

    const handlePeticion = () => {
        onChange(dates.start, 'fecha_justificada_inicio');
        onChange(dates.end, 'fecha_justificada_fin');
    }

    return (
        <View style={[ globalStyles.container, styles.container ]} >
            <CalendarApp style={{ marginTop: 40 }} getDates={setDates} />
            <DropBox 
                style={{ marginTop: 20 }}
                texto="Motivo:"
                getValue={setMotivo}
                values={motivos}
            />
            {(motivo.value === 'Otro') && (
                <InputIcon 
                    style={{ marginTop: 20 }}
                    iconName="pencil" 
                    placeholder="Ingresa el motivo" 
                    onChangeText={(value) => onChange(value, 'motivo')} />
            )}
            <View style={styles.continaerBoton} >
            <Ionicons size={80} name="image" />
                <Button 
                    style={{ width: 250 }}
                    onPress={selectImage}
                    text="Adjuntar evidencia"
                    fontColor="white"
                    color={colors.buttonSecondary}
                />
            </View>

            <Button 
                style={{ width: 130, marginTop: 50 }}
                onPress={handlePeticion}
                text="Enviar"
            />
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
        marginTop: 50 
    }
});
