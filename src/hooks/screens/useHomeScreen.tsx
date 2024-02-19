import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import { ItemType } from "react-native-dropdown-picker";
import { useUploadFile } from "../useUploadFile";
import { usePeticionPost } from "../usePeticionPost";

export const useHomeScreen = () => {

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

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        } else {
            Alert.alert('Aviso', 'No seleccionaste nunguna imagen')
        }
    };

    const { form, isLoading, onChange, peticionPostAlert, setIsLoading } = usePeticionPost({ 
        motivo: '', fecha_justificada_inicio: '', fecha_justificada_fin: '' 
    });
    const { uploadImage, isLoading: isLoadingImg, setIsLoading: setIsLoadingImg } = useUploadFile();

    return {
        motivos,
        setMotivo,
        setDates,
        dates,
        motivo,
        selectImage,
        selectedImage,
        form,
        isLoading,
        onChange,
        isLoadingImg,
        setIsLoadingImg,
    };
}
