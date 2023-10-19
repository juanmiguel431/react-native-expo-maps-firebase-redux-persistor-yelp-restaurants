import React from 'react';
import { View } from 'react-native';
import { SettingScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { User } from 'firebase/auth';
import { Button, Text } from '@rneui/themed';
import { signOutUser } from '../actions';
import { resetLikedRestaurant } from '../actions/likedRestaurantsActions';

type Props = SettingScreenProps & StateProps & DispatchProps;

const _SettingScreen: React.FC<Props> = ({ user, signOutUser, resetLikedRestaurant, likedRestaurants }) => {
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
        title="Reset liked jobs"
        onPress={resetLikedRestaurant}
      />
    </View>
  );
};

type StateProps = {
  user: User | null;
  likedRestaurants: number;
}

const mapStateToProps: MapStateToProps<StateProps, SettingScreenProps, RootState> = ({ auth, likedRestaurant }) => {
  return { user: auth.user, likedRestaurants: likedRestaurant.items.length };
}

type DispatchProps = {
  signOutUser: () => void;
  resetLikedRestaurant: () => void;
}

export const SettingScreen = connect(mapStateToProps, {
  signOutUser, resetLikedRestaurant
})(_SettingScreen);
