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
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Welcome>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Auth>;
export type MainFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.MainFlow>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Map>;
export type DeckScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Deck>;
export type ReviewFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.ReviewFlow>;
export type ReviewScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Review>;
export type SettingScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Setting>;
