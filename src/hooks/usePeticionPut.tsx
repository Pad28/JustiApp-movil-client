import { useState } from "react";
import { useForm } from "./useForm";
import { AxiosRequestConfig } from "axios";
import { JustiAppApi } from "../api/server";
import { Alert } from "react-native";

export const usePeticionPut = <T extends Object>(initState: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const { form, onChange } = useForm(initState);

    const peticionPut = async(path: string, body: Object, config?: AxiosRequestConfig) => {
        setIsLoading(true);
        const response = await JustiAppApi.put(path, body, config)
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

    const peticionPutAlert = async(path:string, body: Object, config?: AxiosRequestConfig, alertMessage?: string) => {
        const result = await peticionPut(path, body, config)
            .catch(error => {
                setIsLoading(false);
            Alert.alert('Error', (alertMessage) ? alertMessage : error.message);    
            })
        return result;
    } 

    return {
        isLoading,
        setIsLoading,
        peticionPut,
        peticionPutAlert,
        form,
        onChange
    };
}
