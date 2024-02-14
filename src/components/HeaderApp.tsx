import { StatusBar, View } from "react-native";
import { colors } from "../theme/styles";

interface Props {
    height: number;
}

export const HeaderApp = ({ height }: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.primary,
                height
            }}
        >
            <StatusBar backgroundColor={colors.primary} />
        </View>
    );
}
