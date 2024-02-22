import FormData  from 'form-data';
import { usePeticionPost } from './usePeticionPost';

export const useUploadFile = () => {
    const { isLoading, peticionPostAlert, setIsLoading } = usePeticionPost({});

    const uploadImage = async(pathFile: string, pathApi: string, token: string) => {
        const formData = new FormData();
        formData.append('evidencia_img', {
            uri: pathFile,
            type: 'image/jpeg',
            name: 'image.jpg'
        });

        const response = await peticionPostAlert(pathApi, formData, false,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;
    }

    return {
        uploadImage,
        setIsLoading,
        isLoading,
    }
}
