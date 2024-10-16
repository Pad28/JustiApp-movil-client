import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { LoginStackNavigator } from './src/navigaton';
import { AuthProvider, SettingsProvider } from './src/context';

export default function App() {

  return (
    <NavigationContainer>
      <AppState>
        <LoginStackNavigator />
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
  return (
    <SettingsProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </SettingsProvider>
  );
}