import Type from '../actions/types';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';

type State = {
  token: ExpoPushToken | undefined;
  notification: Notifications.Notification | null;
}

const initialState: State = {
  token: undefined,
  notification: null,
}

type SetTokenAction = {
  type: Type.SetPushNotificationToken;
  payload: ExpoPushToken;
}

type SetNotificationAction = {
  type: Type.SetPushNotification;
  payload: Notifications.Notification;
}

type Action = SetTokenAction | SetNotificationAction;

export const notificationReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case Type.SetPushNotificationToken:
      return { ...state, token: action.payload };
    case Type.SetPushNotification:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};
