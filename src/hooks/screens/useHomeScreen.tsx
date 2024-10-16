import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import FormData from 'form-data';

import * as ImagePicker from 'expo-image-picker';
import { ItemType } from "react-native-dropdown-picker";
import { usePeticionPost } from "../usePeticionPost";
import { useUploadFile } from "../useUploadFile";
import { envs } from "../../config/envs";
import axios from "axios";

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

    const { isLoading, peticionPostAlert, setIsLoading } = usePeticionPost({ 
        motivo: '', fecha_justificada_inicio: '', fecha_justificada_fin: '' 
    });
    const { uploadImage, isLoading: isLoadingUpload, setIsLoading: setIsLoadingUpload } = useUploadFile();
    const [text, setText] = useState(''); // Si se selecciona como motivo "otro"
    const [dates, setDates] = useState({ start: '', end: '' });
    const [motivo, setMotivo] = useState<ItemType<string>>({ label: '', value: '' });
    const motivos = [
        {label: 'Salud', value: 'Salud'},
        {label: 'Perdida de libertad', value: 'Perdida de libertad'},
        {label: 'Comisión de trabajo', value: 'Comisión de trabajo'},
        {label: 'Comisión de institucional', value: 'Comisión de institucional'},
        {label: 'Fallecimiento de un familiar', value: 'Fallecimiento de un familiar'},
        {label: 'Accidente', value: 'Accidente'},
        {label: 'Trámite oficial externo', value: 'Trámite oficial externo'},
        {label: 'Otro', value: 'Otro'}
    ];
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isSelectedImage, setIsSelectedImage] = useState<boolean>(false);

    const selectImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            setIsSelectedImage(false);
            return Alert.alert('Aviso', 'No hay imagen que subir');
        }
        setSelectedImage(result.assets[0].uri)
        setIsSelectedImage(true);
    };

    const handlePeticion = async(token: string, alumno: string, tutor: string) => {
        setIsLoading(true);
            let str = motivo.label;
            if(motivo.label == 'Otro') str = text;
            if(!selectedImage) return Alert.alert("Error", "Evidencia no selecionada");
            try {

                const filePath = selectedImage;
                const formData = new FormData();
                formData.append('evidencia_img', {
                    uri: filePath,
                    type: 'image/jpeg',
                    name: 'image.jpg'
                });
                
                formData.append('motivo', str);
                formData.append('fecha_justificada_inicio', dates.start);
                formData.append('fecha_justificada_fin', dates.end);
                formData.append('id_alumno', alumno);
                formData.append('id_tutor', tutor);
                
                const config = {
                    method: 'post',
                    url: `${envs.API_URL}/api/justificante/enviar-evidencia`,
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data'
                    },
                    data: formData
                };
                await axios.request(config);
                Alert.alert('Éxito', 'Justificante enviado con exito');
                setIsSelectedImage(false);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                Alert.alert("Error", "Hubo un error al subir la imagen");
                
            }

        }

    return {
        isSelectedImage,
        motivos,
        setMotivo,
        setDates,
        dates,
        motivo,
        selectImage,
        selectedImage,
        isLoading,
        isLoadingUpload,
        peticionPostAlert,
        setIsLoading,
        handlePeticion,
        setText
    };
}
