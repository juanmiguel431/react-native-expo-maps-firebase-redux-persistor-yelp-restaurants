import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SigninScreenProps, SCREEN } from '../models/screen';
import { Button, Input, Text } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { loginUser } from '../actions';

type Props = SigninScreenProps & StateProps & DispatchProps;

const _SigninScreen: React.FC<Props> = ({ navigation, loginUser, error }) => {
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
      {error && <Text style={styles.error}>{error}</Text>}

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
  },
  error: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center'
  }
})

type DispatchProps = {
  loginUser: typeof loginUser;
}

type StateProps = {
  error: string;
}

const mapStateToProps: MapStateToProps<StateProps, SigninScreenProps, RootState> = ({ auth }) => {
  return {
    error: auth.error
  }
}

export const SigninScreen = connect<{}, DispatchProps, SigninScreenProps, RootState>(mapStateToProps, {
  loginUser
})(_SigninScreen);
