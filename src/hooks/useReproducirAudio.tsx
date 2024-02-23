import { AVPlaybackSource, Audio } from "expo-av"
import { useState } from "react"

interface reproducirAudioOptions {
    soundPath: AVPlaybackSource;
    onPlayAudio?: () => void;
    onEndAudio?: () => void;
    onStopAudio?: () => void;
}

export const useReproducirAudio = () => {
    const [sound, setSound] = useState<Audio.Sound | undefined>();

    const reproducirAudio = async(options: reproducirAudioOptions) => {
        const { soundPath, onEndAudio, onPlayAudio, onStopAudio } = options;
        
        const audioActual = sound;
        if (audioActual) {
            await sound.stopAsync();
            if(onStopAudio) onStopAudio();
            setSound(undefined);
        }
        
        const newSound = new Audio.Sound();
        setSound(newSound);
        try {
            await newSound.loadAsync(soundPath);
            if(onPlayAudio) onPlayAudio();
            await newSound.playAsync();
            const { durationMillis } = await newSound.getStatusAsync() as any;
            setTimeout(() => {
                if(onEndAudio) onEndAudio();
                setSound(undefined);
            }, durationMillis);
        } catch (error) {
            console.error('Error cargando sonido para matrícula', error);
        }
    }   

    return {
        reproducirAudio,
    }
}
