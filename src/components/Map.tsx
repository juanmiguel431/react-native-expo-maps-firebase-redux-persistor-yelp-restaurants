import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE, Details, Region } from 'react-native-maps';
import { Coordinate } from '../models/coordinate';

type MapProps = {
  initialRegion?: Region;
  currentLocation?: Coordinate;
  locations?: Coordinate[];
  height?: number;
  mapStyle?: StyleProp<ViewStyle>;
  onRegionChangeComplete?: (region: Region, details: Details) => void
}

export const Map: React.FC<MapProps> = (
  { currentLocation, locations, initialRegion, height, mapStyle, onRegionChangeComplete }) => {

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.flatten([styles.map, { height: height || 250 }, mapStyle])}
      initialRegion={initialRegion}
      onRegionChangeComplete={onRegionChangeComplete}
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
