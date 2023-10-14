import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, SCREEN } from './src/models/screen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthScreen, DeckScreen, MapScreen, ReviewScreen, SettingScreen, WelcomeScreen } from './src/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const ReviewFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.Review} component={ReviewScreen}/>
      <Stack.Screen name={SCREEN.Setting} component={SettingScreen}/>
    </Stack.Navigator>
  );
};

const MainFlow = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREEN.Map} component={MapScreen}/>
      <Tab.Screen name={SCREEN.Deck} component={DeckScreen}/>
      <Tab.Screen name={SCREEN.ReviewFlow} component={ReviewFlow}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={SCREEN.Welcome} component={WelcomeScreen} options={{ headerShown: false }}/>
          <Tab.Screen name={SCREEN.Auth} component={AuthScreen}/>
          <Tab.Screen name={SCREEN.MainFlow} component={MainFlow} options={{ headerShown: false }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
