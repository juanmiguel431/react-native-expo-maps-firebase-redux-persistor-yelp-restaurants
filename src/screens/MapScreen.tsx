import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapScreenProps } from '../models/screen';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import { Point } from '../models/coordinate';
import Map from '../components/Map';
import { Details, Region } from 'react-native-maps';

export const MapScreen: React.FC<MapScreenProps> = () => {
  const [region, setRegion] = useState<Region>({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  });

  const isFocused = useIsFocused();

  const callBack = useCallback((location: Point) => {
    // addLocation(location, recording);
    console.log(location);
  }, []);

  const shouldTrack = isFocused;

  const [errorMsg] = useLocation(shouldTrack, callBack);

  const onRegionChangeComplete = useCallback((region: Region, details: Details) => {
    setRegion(region);
  }, []);

  return (
    <View style={styles.view}>
      <Map
        mapStyle={styles.map}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={region}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  view: {
    flex: 1
  }
})
