import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import FormData  from 'form-data';

import * as ImagePicker from 'expo-image-picker';
import { ItemType } from "react-native-dropdown-picker";
import { usePeticionPost } from "../usePeticionPost";
import { useUploadFile } from "../useUploadFile";

export const useHomeScreen = () => {
    const [text, setText] = useState(''); // Si se selecciona como motivo "otro"

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos insuficientes', 'Se necesita permiso para acceder a la galería de imágenes');
                Linking.openSettings();
            }
        })();
    }, []);

    const [dates, setDates] = useState({ start: '', end: '' });
    const [motivo, setMotivo] = useState<ItemType<string>>({ label: '', value: '' });
    const motivos = [
        {label: 'Salud', value: 'Salud'},
        {label: 'Perdida de libertad', value: 'Perdida de libertad'},
        {label: 'Comisión de trabajo', value: 'Comisión de trabajo'},
        {label: 'Comisión de institucional', value: 'Comisión de institucional'},
        {label: 'Fallecimineto de un familial', value: 'Fallecimineto de un familiar'},
        {label: 'Accidente', value: 'Accidente'},
        {label: 'Tramite oficial externo', value: 'Tramite oficial externo'},
        {label: 'Otro', value: 'Otro'}
    ];
    const [selectedImage, setSelectedImage] = useState('');

    const selectImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        } else {
            Alert.alert('Aviso', 'No hay imagen que subir')
        }
    };

    const { isLoading, peticionPostAlert, setIsLoading } = usePeticionPost({ 
        motivo: '', fecha_justificada_inicio: '', fecha_justificada_fin: '' 
    });

    const handlePeticion = async(token: string, alumno: string, tutor: string) => {
        let str = motivo.label;
        if(motivo.label == 'Otro') str = text;

        const data = new FormData();
        data.append('evidencia_img', {
            uri: selectImage,
            type: 'image/jpeg',
            name: 'image.jpg'
        });
        data.append('motivo', str);
        data.append('fecha_justificada_inicio', dates.start);
        data.append('fecha_justificada_fin', dates.end);
        data.append('id_alumno', alumno);
        data.append('id_tutor', tutor);

        if(!selectedImage) return Alert.alert('Error', 'Evidencia faltante');
        const res = await peticionPostAlert({
            path: '/api/justificante/enviar-evidencia',
            body: data,
            validateEmpty: false,
            config: {headers: { 'Authorization': `Bearer ${token}` }}
        });


        setMotivo({});
    }

    return {
        motivos,
        setMotivo,
        setDates,
        dates,
        motivo,
        selectImage,
        selectedImage,
        isLoading,
        peticionPostAlert,
        setIsLoading,
        handlePeticion,
        setText
    };
}
