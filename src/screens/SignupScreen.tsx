import React, { useState } from 'react';
import { View } from 'react-native';
import { SignupScreenProps, SCREEN } from '../models/screen';
import { Button, Input, Text } from '@rneui/themed';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { signupUser } from '../actions';

type Props = SignupScreenProps & DispatchProps;

const _SignupScreen: React.FC<Props> = ({ navigation, signupUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text h1>Create an account</Text>
      <Input
        label="Email"
        placeholder="someone@domain.com"
        textContentType="emailAddress"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          signupUser({ email, password });
        }}
      />
    </View>
  );
};

type DispatchProps = {
  signupUser: typeof signupUser;
}

export const SignupScreen = connect<{}, DispatchProps, SignupScreenProps, RootState>(null, {
  signupUser
})(_SignupScreen);
