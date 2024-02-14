import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LoginStackNavigator } from './src/navigaton';

export default function App() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}
