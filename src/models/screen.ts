import { NativeStackScreenProps  } from 'react-native-screens/native-stack';

export const enum SCREEN {
  Welcome = 'Welcome',
  Auth = 'Auth',
  MainFlow = 'MainFlow',
  Map = 'Map',
  Deck = 'Deck',
  ReviewFlow = 'ReviewFlow',
  Review = 'Review',
  Setting = 'Setting',
  Signin = 'Signin',
  Signup = 'Signup',
}

export type Screen = ObjectValues<typeof SCREEN>;

export type RootStackParamList = {
  [SCREEN.Welcome]: undefined;
  [SCREEN.Auth]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.Map]: undefined;
  [SCREEN.Deck]: { id: string };
  [SCREEN.ReviewFlow]: undefined;
  [SCREEN.Review]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.Setting]: undefined;
  [SCREEN.Signin]: undefined;
  [SCREEN.Signup]: undefined;
};

export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signup>;
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Welcome>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Auth>;
export type MainFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.MainFlow>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Map>;
export type DeckScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Deck>;
export type ReviewFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.ReviewFlow>;
export type ReviewScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Review>;
export type SettingScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Setting>;
