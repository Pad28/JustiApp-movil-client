import { Modal, StyleSheet, View } from "react-native";
import { InputIcon } from "./InputIcon";
import { Button } from "./Button";
import { colors } from "../theme/styles";

interface Props {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    iconName: string;
    onChangeText: (value: string) => void;
    placeHolder: string;
}

export const ModalInput = (props: Props) => {
    const { iconName, onChangeText,placeHolder, showModal, setShowModal } = props;

    return (
        <Modal transparent animationType="slide" visible={showModal}>
            <View style={styles.container} >
                <InputIcon iconName={iconName} onChangeText={onChangeText} placeholder={placeHolder} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, width: '100%' }} >
                    <Button 
                        text="Cancelar" 
                        onPress={() => {
                            setShowModal(false);
                            onChangeText('');
                        }} 
                    />
                    
                    <Button text="Aceptar" 
                        color={colors.buttonSecondary} 
                        onPress={() => setShowModal(false)} 
                        fontColor="white"
                    />
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 8,
        margin: 20,

        height: 300,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});