import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, widthWindow } from '../theme/styles';

interface Props extends BottomTabBarProps {}
export const BottomTabBarPersonalizada = ({  descriptors, insets, navigation, state }: Props) => {

    const activeBackgroundColor = colors.terciary;  
    const inactiveBackgroundColor = colors.primary; 
    const activeTintColor = "black";
    const inactiveTintColor = "white";

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = 
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                const tintColor = isFocused ? activeTintColor : inactiveTintColor;
                const backgroundColor = isFocused
                    ? activeBackgroundColor
                    : inactiveBackgroundColor;

                const onPress = () => {
                    navigation.navigate(route.name);
                };
                return (
                    <TouchableOpacity
                        key={route.name + index}
                        style={[ {backgroundColor: backgroundColor}, styles.boton]}
                        onPress={onPress}
                    >   
                        {options.tabBarIcon !== undefined && (
                            options.tabBarIcon({ focused: true, color: tintColor!, size: 34 })
                        )}

                        <Text style={[ {color: tintColor}, styles.text ]} > 
                            { label as string } 
                        </Text>
                    </TouchableOpacity>
                );
            })}    
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 90,
        width: widthWindow - 60,
        marginBottom: 16,
        borderRadius: 40,
        backgroundColor: colors.primary,
        elevation: 8
    },
    boton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 72,
        borderRadius: 28,
    },
    text: {
        fontSize: (widthWindow > 450) ? 10 : 18,
        fontWeight: 'bold',
    }
});