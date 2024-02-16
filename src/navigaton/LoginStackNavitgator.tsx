import { useContext } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens";
import { AuthContext } from "../context";
import { BottomTabHomaNavigator } from "./BottomTabHomaNavigator";
import { StackRouter } from "@react-navigation/native";
import { LoginScreenInclusivo } from "../screens/LoginScreenInclusivo";

export type RootLoginStackParams  = {
    LoginScreen: undefined;
    HomeNavigator: undefined;
    LoginScreenInclusivo: undefined;
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const LoginStackNavigator = () => {
    const { authState } = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{ 
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >   
            {(authState.islogged) ? (
                    <Stack.Screen name="HomeNavigator" component={BottomTabHomaNavigator} />
            ) : (
                <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name = "LoginScreenInclusivo" component={LoginScreenInclusivo}/>
                </>
            )}
        </Stack.Navigator>
    );
}