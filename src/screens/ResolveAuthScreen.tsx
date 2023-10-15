import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { connect } from 'react-redux';
import { resolveAuth } from '../actions';
import { RootState } from '../reducers';
import * as SplashScreen from 'expo-splash-screen';

type Props = DispatchProps;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const _ResolveAuthScreen: React.FC<Props> = ({ resolveAuth }) => {

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      // await new Promise(r => setTimeout(r, 3000));
      await SplashScreen.hideAsync();
      resolveAuth(user);
    });

    return () => {
      console.log('unsubscribe from onAuthStateChanged');
      unsubscribe();
    }

  }, [resolveAuth]);

  return null;
};

type DispatchProps = {
  resolveAuth: typeof resolveAuth;
}

export const ResolveAuthScreen = connect<{}, DispatchProps, {}, RootState>(null, {
  resolveAuth
})(_ResolveAuthScreen);
