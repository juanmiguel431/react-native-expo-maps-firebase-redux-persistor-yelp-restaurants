import React from 'react';
import { View } from 'react-native';
import { SignupScreenProps, SCREEN } from '../models/screen';
import { Button, Input, Text } from '@rneui/themed';

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text h1>Create an account</Text>
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
        title="Sign Up"
        onPress={() => {

        }}
      />
    </View>
  );
};
