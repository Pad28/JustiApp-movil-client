import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens";

export type RootLoginStackParams  = {
    LoginScreen: undefined;
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const LoginStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}