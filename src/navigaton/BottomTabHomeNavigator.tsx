import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SettingsScreen } from '../screens';
import { BottomTabBarPersonalizada, HeaderApp } from '../components';
import { Ionicons } from '@expo/vector-icons';

export type RootBottomTabHomeNav  = {
    HomeScreen: undefined;
    SettingsScreen: undefined;
}

const Tab = createBottomTabNavigator<RootBottomTabHomeNav>();
export const BottomTabHomeNavigator = () => {
    return(
        <Tab.Navigator
            tabBar={({ insets, descriptors, navigation, state }) => (
                <BottomTabBarPersonalizada 
                    insets={insets}
                    descriptors={descriptors}
                    navigation={navigation}
                    state={state}
                />  
            )}
            screenOptions={({ route }) => ({
                tabBarIcon: ({color}) => {
                    let iconName = '';
                    switch(route.name) {
                        case 'HomeScreen':
                            iconName = 'home';
                            break;
                        case 'SettingsScreen':
                            iconName = 'settings';
                            break;
                    }

                    return <Ionicons name={iconName} color={color} size={40} />
                },
                header: () => <HeaderApp height={60} />
            })}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name='SettingsScreen' component={SettingsScreen} options={{ title: 'Ajustes' }} />
        </Tab.Navigator>
    );
}
