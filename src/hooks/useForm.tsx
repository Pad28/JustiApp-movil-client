import { useState } from "react";

export const useForm = <T extends Object>(initState: T) => {
    const [form, setForm] = useState<T>(initState);

    const onChange = (value: string, field: keyof T) => {
        setForm({ ...form, [field]: value });        
    }

    const validateEmptyFields = (message: string) => {
        const keys = Object.keys(form) as (keyof T)[];
        keys.forEach(k => {
            if(!form[k]) {
                throw new Error(message);
            }
        });
    }
 
    return {
        ...form,
        form,
        onChange,
        validateEmptyFields
    }
}