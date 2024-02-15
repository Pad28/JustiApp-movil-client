import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../context";

export const HomeScreen = () => {
    const { logOut } = useContext(AuthContext);

    return (
        <View>
            <Text style={{ marginTop: 100 }} >Home Screen</Text>
            <Button title="log out" onPress={logOut} />
        </View>
    );
}
