import React from 'react'
import { Image, StyleSheet, View } from 'react-native';

import { HeaderApp } from '../components/HeaderApp';
import { globalStyles } from '../theme/styles';
import { InputIcon } from '../components';

export const LoginScreen = () => {
    return (
        <View style={{ flex: 1 }} >
            <HeaderApp height={140} />
            <View style={ globalStyles.container } >
                
                <Image 
                    source={require("../../assets/JustiAppLogo.png")}
                    style={[ styles.image, { marginTop: 50 } ]}
                />

                <InputIcon 

                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        borderRadius: 30,
        alignSelf: "center",
    }
})
