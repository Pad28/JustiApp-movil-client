import { Button, Text, View } from "react-native";
import { globalStyles } from "../theme/styles";
import { useContext } from "react";
import { AuthContext } from "../context";

export const SettingsScreen = () => {
    const { logOut, authState } = useContext(AuthContext);

    return(
        <View style={ globalStyles.container } >
            <Text>SettingsScreen</Text>
            <Button title="Log out" onPress={logOut} />
            <Text>
                { JSON.stringify(authState.userAuthenticated, null, 5) }
            </Text>
        </View>
    );
}
