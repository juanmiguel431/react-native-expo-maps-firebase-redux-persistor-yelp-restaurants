import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, SCREEN } from './models/screen';
import {
  DeckScreen,
  MapScreen,
  ResolveAuthScreen,
  ReviewScreen,
  SettingScreen,
  SigninScreen,
  SignupScreen,
  WelcomeScreen
} from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from './reducers';
import React, { useEffect, useRef, useState } from 'react';
import { setNotification, setNotificationToken } from './actions/notificationActions';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './services/sendPushNotification';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={SCREEN.Map}
        component={MapScreen}
        options={{
          headerShown: false,
          title: 'Map',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => {
            return <Icon name="my-location" color={color}/>
          }
        }}
      />
      <Tab.Screen
        name={SCREEN.Deck}
        component={DeckScreen}
        options={{
          title: 'Restaurants',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => {
            return <Icon name="description" color={color}/>
          }
        }}
      />
      <Tab.Screen
        name={SCREEN.Review}
        component={ReviewScreen}
        options={({ navigation }) => ({
          title: 'Review',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => {
            return <Icon name="favorite" color={color}/>
          },
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
    </Tab.Navigator>
  );
};

const MainFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN.MainBottomTabNavigation}
        component={BottomTabNavigation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name={SCREEN.Setting} component={SettingScreen}/>
    </Stack.Navigator>
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

type Props = StateProps & DispatchProps;

const _AppContainer: React.FC<Props> = ({ isSignedIn, setNotificationToken, setNotification }) => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setNotificationToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current){
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [setNotification, setNotificationToken]);

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

type DispatchProps = {
  setNotificationToken: (token: ExpoPushToken | undefined) => void;
  setNotification: (notification: Notifications.Notification | null) => void;
}

const AppContainer = connect(mapStateToProps, {
  setNotificationToken, setNotification
})(_AppContainer);

export default AppContainer;
