import { useContext, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import { Calendar, DateData } from 'react-native-calendars';
import { colors, widthWindow } from "../theme/styles";
import { SettingsContext } from "../context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./Button";

interface Props {
    style?: StyleProp<ViewStyle>;
    getDates: React.Dispatch<React.SetStateAction<{
        start: string;
        end: string;
    }>>
}

export const CalendarApp = ({ style, getDates }: Props) => {
    const { settingsState } = useContext(SettingsContext);

    const [text, setText] = useState('Ingresar fechas a justificar');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleDayPress = (day: DateData) => {
        if (!startDate) {
          setStartDate(day.dateString);
        } else if (!endDate) {
          setEndDate(day.dateString);
        } else {
          setStartDate(day.dateString);
          setEndDate('');
        }
    };

    const markedDates: {[key: string]: { startingDay?: boolean; endingDay?: boolean; color?: string }} = {}
    if(startDate && endDate) {
        let currentDate = new Date(startDate);
        while(currentDate <= new Date(endDate)) {
            const dateString = currentDate.toISOString().split('T')[0];
            markedDates[dateString] = { color: colors.terciary };
            currentDate.setDate(currentDate.getDate() + 1);
        }
        markedDates[startDate] = { startingDay: true, color: colors.terciary };
        markedDates[endDate] = { endingDay: true, color: colors.terciary };
    } else if(startDate) {
        markedDates[startDate] = { startingDay: true, color: colors.terciary };
    } else if(endDate) {
        markedDates[endDate] = { endingDay: true, color: colors.terciary };
    }

    return (
        <View style={[ styles.continer, style ]}>

            <Text style={{ fontSize: settingsState.fontSize }} > {text} </Text>
            <TouchableOpacity style={ styles.boton } onPress={() => setShowModal(true)} >
                <Ionicons name="calendar" size={40} />
            </TouchableOpacity>

            <Modal 
                transparent 
                visible={showModal} 
                animationType="slide"
            >
                <View style={styles.calendarModal} >
                    <Calendar
                        style={styles.calendar}
                        onDayPress={handleDayPress}
                        minDate={new Date().toString()}
                        markingType="period"
                        markedDates={markedDates}
                    />

                    <Button 
                        text="Aceptar" 
                        style={styles.botonModal}
                        onPress={() => {
                            setText(`${startDate} al ${endDate}`)
                            setShowModal(false);
                            getDates({ start: startDate, end: endDate });
                        }} 
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    continer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 58,
        width: widthWindow - 20,
        borderRadius: 8,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
    },
    boton: {
        backgroundColor: colors.buttonPrimary,
        height: 46,
        width: 46,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendar: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    calendarModal: {
        borderRadius: 10,
        elevation: 8,
        marginHorizontal: 20,
        backgroundColor: 'white'
    },
    botonModal: {
        width: 100,
        marginVertical: 20,
        alignSelf: 'center'
    }
});