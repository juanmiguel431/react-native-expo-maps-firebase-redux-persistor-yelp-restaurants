import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SigninScreenProps, SCREEN } from '../models/screen';
import { Button, Input, Text } from '@rneui/themed';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { loginUser } from '../actions';

type Props = SigninScreenProps & DispatchProps;

const _SigninScreen: React.FC<Props> = ({ navigation, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text h1>Login</Text>
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
        title="Sign In"
        onPress={() => {
          loginUser({ email, password });
        }}
      />

      <View style={styles.createContainer}>
        <Button
          title="Create an account"
          style={styles.create}
          type="clear"
          onPress={() => {
            navigation.navigate(SCREEN.Signup)
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  create: {},
  createContainer: {
    marginTop: 20
  }
})

type DispatchProps = {
  loginUser: typeof loginUser;
}

export const SigninScreen = connect<{}, DispatchProps, SigninScreenProps, RootState>(null, {
  loginUser
})(_SigninScreen);
