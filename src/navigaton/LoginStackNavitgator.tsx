import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../context";
import { LoginScreen } from "../screens";
import { BottomTabHomeNavigator } from "./BottomTabHomeNavigator";

export type RootLoginStackParams  = {
    LoginScreen: undefined;
    BottomTabHomeNav: undefined;
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const LoginStackNavigator = () => {
    const {authState} = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            {(authState.islogged) ? (
                <Stack.Screen name="BottomTabHomeNav" component={BottomTabHomeNavigator} />
            ) : (
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}