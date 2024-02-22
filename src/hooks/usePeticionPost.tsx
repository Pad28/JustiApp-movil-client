import { useState } from "react"
import { AxiosRequestConfig } from "axios";

import { useForm } from "./useForm";
import { JustiAppApi } from "../api/server";
import { Alert } from "react-native";

export const usePeticionPost = <T extends Object>(initState: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const { form, onChange, validateEmptyFields } = useForm(initState);

    const peticionPost = async(path:string, body: Object, validateEmpty: boolean, config?: AxiosRequestConfig) => {
        setIsLoading(true);
        if(validateEmpty) validateEmptyFields('Completa todos los campos');
        const response = await JustiAppApi.post(path, body, config)
            .catch(error => {
                setIsLoading(false);
                if(error.response) {
                    if(error.response.data.error) throw new Error(error.response.data.error);
                    throw new Error(error.response.data.errors[0].msg);
                }

                if(error.request) throw new Error('Ups... ocurrio un error, intentalo mas tarde.');
            });
        setIsLoading(false);
        if(!response) return 'Error en la peticion';
        return response.data;
    }

    const peticionPostAlert = async(path:string, body: Object, validateEmpty: boolean, config?: AxiosRequestConfig, alertMessage?: string) => {
        const result = await peticionPost(path, body, validateEmpty, config)
            .catch(error => {
                setIsLoading(false);
                Alert.alert("Error", (alertMessage) ? alertMessage : error.message);
            });
        return result;
    }

    return {
        form,
        onChange,
        isLoading,
        setIsLoading,
        peticionPost,
        peticionPostAlert,
    }
}