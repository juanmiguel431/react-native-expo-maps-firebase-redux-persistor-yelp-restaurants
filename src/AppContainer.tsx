import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, SCREEN } from './models/screen';
import { AuthScreen, DeckScreen, MapScreen, ReviewScreen, SettingScreen, WelcomeScreen } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Button } from '@rneui/themed';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const ReviewFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN.Review}
        component={ReviewScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Button
                title="Setting"
                size="sm"
                onPress={() => {
                  navigation.navigate(SCREEN.Setting);
                }}
              />
            </View>
          )
        })}
      />
      <Stack.Screen name={SCREEN.Setting} component={SettingScreen}/>
    </Stack.Navigator>
  );
};

const MainFlow = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREEN.Map} component={MapScreen}/>
      <Tab.Screen name={SCREEN.Deck} component={DeckScreen}/>
      <Tab.Screen
        name={SCREEN.ReviewFlow}
        component={ReviewFlow}
        options={{ headerShown: false, title: 'Review Jobs' }}/>
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={SCREEN.Welcome} component={WelcomeScreen} options={{ headerShown: false }}/>
          <Tab.Screen name={SCREEN.Auth} component={AuthScreen}/>
          <Tab.Screen name={SCREEN.MainFlow} component={MainFlow} options={{ headerShown: false }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
