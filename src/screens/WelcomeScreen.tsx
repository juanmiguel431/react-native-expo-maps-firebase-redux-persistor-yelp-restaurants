import React from 'react';
import { SCREEN, WelcomeScreenProps } from '../models/screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slides from '../components/Slides';
import { Slide } from '../models';

const SLIDE_DATA: Slide[] = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Slides
        data={SLIDE_DATA}
        onComplete={() => {
          navigation.navigate(SCREEN.Auth);
        }}
      />
    </SafeAreaView>
  );
};
