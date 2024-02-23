import { useState } from "react"
import { AxiosRequestConfig } from "axios";

import { useForm } from "./useForm";
import { JustiAppApi } from "../api/server";
import { Alert } from "react-native";

interface peticionPostOptions {
    path: string;
    body: Object;
    validateEmpty: boolean;
    config?: AxiosRequestConfig;
    successMessage?: string;
    errorMessage?: string;
}

export const usePeticionPost = <T extends Object>(initState: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const { form, onChange, validateEmptyFields, clearValues } = useForm(initState);

    const peticionPost = async(options: peticionPostOptions) => {
        const { path, body, validateEmpty, config } = options;

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

    const peticionPostAlert = async(options: peticionPostOptions) => {
        const result = await peticionPost(options)
            .catch(error => {
                setIsLoading(false);
                Alert.alert("Error", (options.errorMessage) ? options.errorMessage : error.message);
            });
        return result;
    }

    return {
        form,
        onChange,
        clearValues,
        isLoading,
        setIsLoading,
        peticionPost,
        peticionPostAlert,
    }
}