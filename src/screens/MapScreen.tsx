import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapScreenProps, SCREEN } from '../models/screen';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import { Point } from '../models/coordinate';
import Map from '../components/Map';
import { Details, Region } from 'react-native-maps';
import { Button } from '@rneui/themed';
import { connect } from 'react-redux';
import { getRestaurants, MAP_RADIUS } from '../actions';
import { LatLng } from 'react-native-maps';

type Props = MapScreenProps & DispatchProps;

const _MapScreen: React.FC<Props> = ({ getRestaurants, navigation }) => {
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
        currentLocation={{ latitude: region.latitude, longitude: region.longitude }}
        currentLocationRadius={MAP_RADIUS}
      />
      <View style={styles.buttonContainer}>
        <Button
          size="lg"
          title="Search This Area"
          icon={{ name: 'search' }}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
          onPress={async () => {
            await getRestaurants({ latitude: region.latitude, longitude: region.longitude });
            navigation.navigate(SCREEN.Deck);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: 40,
    left: 0,
    position: 'absolute',
    right: 0
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    width: 220
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 150, 136, 1)',
    borderRadius: 3,
  },
  map: {
    flex: 1
  },
  view: {
    flex: 1
  }
});

type DispatchProps = {
  getRestaurants: (location: LatLng) => Promise<void>;
}

export const MapScreen = connect(null, {
  getRestaurants
})(_MapScreen);
