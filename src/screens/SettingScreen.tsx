import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { User } from 'firebase/auth';
import { Button, Text } from '@rneui/themed';
import { signOutUser } from '../actions';
import { resetLikedRestaurant } from '../actions/likedRestaurantsActions';
import { sendPushNotification } from '../actions/notificationActions';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';

type Props = SettingScreenProps & StateProps & DispatchProps;

const _SettingScreen: React.FC<Props> = (
  { user, signOutUser, resetLikedRestaurant, likedRestaurants, sendPushNotification, token,
    notification }) => {

  console.log(token);

  return (
    <View>
      <Text h4>{user?.email}</Text>
      <Button
        title="Sign Out"
        onPress={signOutUser}
      />
      <Text h4>Liked Restaurants: {likedRestaurants}</Text>
      <Button
        size="lg"
        icon={{ name: 'delete-forever', color: 'white' }}
        buttonStyle={{ backgroundColor: '#f44336' }}
        title="Reset liked restaurants"
        onPress={resetLikedRestaurant}
      />
      <Text h4>Test Notifications</Text>

      <View style={styles.notificationContainer}>
        <Text>Your expo push token: {token?.data}</Text>
        <View style={styles.notificationMessage}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
      </View>

      <Button
        title="Press to Send Notification"
        onPress={() => {
          sendPushNotification(token);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    // alignItems: 'center',
    // flex: 1,
    // justifyContent: 'space-around'
  },
  notificationMessage: {
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

type StateProps = {
  user: User | null;
  likedRestaurants: number;
  token: ExpoPushToken | undefined;
  notification: Notifications.Notification | null;
}

const mapStateToProps: MapStateToProps<StateProps, SettingScreenProps, RootState> = ({ auth, likedRestaurant, notification }) => {
  return {
    user: auth.user,
    likedRestaurants: likedRestaurant.items.length,
    token: notification.token,
    notification: notification.notification
  };
}

type DispatchProps = {
  signOutUser: () => void;
  resetLikedRestaurant: () => void;
  sendPushNotification: (token: ExpoPushToken | undefined) => void;
}

export const SettingScreen = connect(mapStateToProps, {
  signOutUser, resetLikedRestaurant, sendPushNotification
})(_SettingScreen);
