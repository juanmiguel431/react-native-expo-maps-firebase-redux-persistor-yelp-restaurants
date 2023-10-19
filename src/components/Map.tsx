import React, { useMemo, useState } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Details, Region, LatLng } from 'react-native-maps';

type MapProps = {
  initialRegion?: Region;
  currentLocation?: LatLng;
  currentLocationRadius?: number;
  locations?: LatLng[];
  height?: number;
  mapStyle?: StyleProp<ViewStyle>;
  onRegionChangeComplete?: (region: Region, details: Details) => void
  scrollEnabled?: boolean;
  cacheEnabled?: boolean;
  zoomEnabled?: boolean;
  provider?: 'default' | 'google';
}

export const Map: React.FC<MapProps> = (
  { currentLocation, currentLocationRadius,
    locations, initialRegion, height,
    mapStyle, onRegionChangeComplete, scrollEnabled, cacheEnabled,
    provider, zoomEnabled }) => {

  const _cacheEnabled = useMemo(() => {
    return Platform.OS === 'ios' ? undefined : cacheEnabled;
  }, [cacheEnabled]);

  const _provider = useMemo(() => {
    return provider === 'default' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE;
  }, [provider]);

  const _initialRegion: Region | undefined = useMemo(() => {
    if (initialRegion) {
      return initialRegion;
    }
    if (currentLocation) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        longitudeDelta: 0.045,
        latitudeDelta: 0.02,
      }
    }
  }, [initialRegion, currentLocation]);

  return (
    <MapView
      // liteMode
      zoomEnabled={zoomEnabled}
      provider={_provider}
      scrollEnabled={scrollEnabled}
      cacheEnabled={_cacheEnabled}
      style={StyleSheet.flatten([styles.map, { height: height || 250 }, mapStyle])}
      initialRegion={_initialRegion}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {currentLocation &&
        <Circle
          center={currentLocation}
          radius={currentLocationRadius || 10}
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
