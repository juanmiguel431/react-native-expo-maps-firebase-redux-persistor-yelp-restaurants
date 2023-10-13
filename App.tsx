import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Slides from './src/components/Slides';
import { Slide } from './src/models';

const SLIDE_DATA: Slide[] = [
  { text: 'Welcome to JobApp' },
  { text: 'Use this to get a job' },
  { text: 'Set your location, then swipe away' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar style="auto"/>
        <Slides data={SLIDE_DATA}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
