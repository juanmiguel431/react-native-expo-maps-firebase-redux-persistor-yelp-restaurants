import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { MapScreenProps } from '../models/screen';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import { Point } from '../models/coordinate';
import Map from '../components/Map';

export const MapScreen: React.FC<MapScreenProps> = () => {

  const isFocused = useIsFocused();

  const callBack = useCallback((location: Point) => {
    // addLocation(location, recording);
    console.log(location);
  }, []);

  const shouldTrack = isFocused;

  const [errorMsg] = useLocation(shouldTrack, callBack);

  return (
    <View style={{ flex: 1 }}>
      <Map mapStyle={{ flex: 1 }} />
    </View>
  );
};
