import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens';

const Tab = createBottomTabNavigator();
export const BottomTabHomaNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='HomeScreen' component={HomeScreen} />
        </Tab.Navigator>
    );
}
