import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { Coordinate } from '../models/coordinate';

type MapProps = {
  initialRegion?: Coordinate;
  currentLocation?: Coordinate;
  locations?: Coordinate[];
  height?: number;
  mapStyle?: StyleProp<ViewStyle>;
}

export const Map: React.FC<MapProps> = ({ currentLocation, locations, initialRegion, height, mapStyle }) => {

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.flatten([styles.map, { height: height || 250 }, mapStyle])}
      initialRegion={initialRegion ? {
        ...initialRegion,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      } : undefined}
    >
      {currentLocation &&
        <Circle
          center={currentLocation}
          radius={10}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
      }
      {locations && <Polyline coordinates={locations}/>}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {}
});

export default Map;
