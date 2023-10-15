import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SigninScreenProps, SCREEN } from '../models/screen';
import { Button, Input, Text } from '@rneui/themed';

export const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text h1>Login</Text>
      <Input
        label="Email"
        placeholder="someone@domain.com"
        textContentType="emailAddress"
        autoFocus
        keyboardType="email-address"
      />
      <Input
        label="Password"
        placeholder="password"
        secureTextEntry
      />
      <Button
        title="Sign In"
        onPress={() => {

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
  create: {
  },
  createContainer: {
    marginTop: 20
  }
})
