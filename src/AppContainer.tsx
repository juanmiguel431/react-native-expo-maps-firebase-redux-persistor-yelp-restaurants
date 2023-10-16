import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, SCREEN } from './models/screen';
import {
  SigninScreen,
  DeckScreen,
  MapScreen,
  ReviewScreen,
  SettingScreen,
  WelcomeScreen,
  ResolveAuthScreen,
  SignupScreen
} from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from './reducers';
import React from 'react';

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
      <Tab.Screen name={SCREEN.Map} component={MapScreen} options={{ headerShown: false }}/>
      <Tab.Screen name={SCREEN.Deck} component={DeckScreen}/>
      <Tab.Screen
        name={SCREEN.ReviewFlow}
        component={ReviewFlow}
        options={{ headerShown: false, title: 'Review Jobs' }}/>
    </Tab.Navigator>
  );
};

const AuthFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN.Welcome} component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={SCREEN.Signin} component={SigninScreen}/>
      <Stack.Screen name={SCREEN.Signup} component={SignupScreen}/>
    </Stack.Navigator>
  );
};

const resolveAuth = (isSignedIn: boolean | null) => {
  switch (isSignedIn) {
    case true:
      return <Stack.Screen name={SCREEN.MainFlow} component={MainFlow} options={{ headerShown: false }}/>;
    case false:
      return <Stack.Screen name={SCREEN.AuthFlow} component={AuthFlow} options={{ headerShown: false }}/>;
    default:
      return <Stack.Screen name={SCREEN.ResolveAuth} component={ResolveAuthScreen} options={{ headerShown: false }}/>
  }
}

type Props = StateProps;

const _AppContainer: React.FC<Props> = ( { isSignedIn }) => {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator>
          {resolveAuth(isSignedIn)}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

type StateProps = {
  isSignedIn: boolean | null;
};

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = ({ auth }) => {
  return { isSignedIn: auth.isSignedIn };
}

const AppContainer = connect(mapStateToProps)(_AppContainer);

export default AppContainer;
