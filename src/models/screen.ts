import { NativeStackScreenProps  } from 'react-native-screens/native-stack';

export const enum SCREEN {
  Welcome = 'Welcome',
  MainFlow = 'MainFlow',
  Map = 'Map',
  Deck = 'Deck',
  Review = 'Review',
  Setting = 'Setting',
  Signin = 'Signin',
  Signup = 'Signup',
  ResolveAuth = 'ResolveAuth',
  AuthFlow = 'AuthFlow',
  MainBottomTabNavigation = 'MainBottomTabNavigation',
}

export type Screen = ObjectValues<typeof SCREEN>;

export type RootStackParamList = {
  [SCREEN.Welcome]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.Map]: undefined;
  [SCREEN.Deck]: undefined;
  [SCREEN.Review]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.Setting]: undefined;
  [SCREEN.Signin]: undefined;
  [SCREEN.Signup]: undefined;
  [SCREEN.ResolveAuth]: undefined;
  [SCREEN.AuthFlow]: undefined;
  [SCREEN.MainBottomTabNavigation]: undefined;
};

export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signup>;
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Welcome>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Map>;
export type DeckScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Deck>;
export type ReviewScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Review>;
export type SettingScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Setting>;
