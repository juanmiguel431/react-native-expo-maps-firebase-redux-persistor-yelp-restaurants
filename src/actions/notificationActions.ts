import Type from './types';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import { Dispatch } from 'redux';

export const setNotificationToken = (token: ExpoPushToken | undefined) => {
  return {
    type: Type.SetPushNotificationToken,
    payload: token
  };
};

export const setNotification = (notification: Notifications.Notification | null) => {
  return {
    type: Type.SetPushNotification,
    payload: notification
  };
};

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export const sendPushNotification = (expoPushToken: ExpoPushToken) => async (dispatch: Dispatch) => {
  try {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    dispatch({ type: Type.SendPushNotification });

  } catch (e) {

  } finally {

  }
}
