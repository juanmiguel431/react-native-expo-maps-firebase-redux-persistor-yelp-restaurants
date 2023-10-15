import React from 'react';
import { View } from 'react-native';
import { SettingScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { User } from 'firebase/auth';
import { Button, Text } from '@rneui/themed';
import { signOutUser } from '../actions';

type Props = SettingScreenProps & StateProps & DispatchProps;

const _SettingScreen: React.FC<Props> = ({ user, signOutUser }) => {
  return (
    <View>
      <Text h4>{user?.email}</Text>
      <Button
        title="Sign Out"
        onPress={signOutUser}
      />
    </View>
  );
};

type StateProps = {
  user: User | null;
}

const mapStateToProps: MapStateToProps<StateProps, SettingScreenProps, RootState> = ({ auth }) => {
  return { user: auth.user };
}

type DispatchProps = {
  signOutUser: typeof signOutUser;
}

export const SettingScreen = connect(mapStateToProps, {
  signOutUser
})(_SettingScreen);
