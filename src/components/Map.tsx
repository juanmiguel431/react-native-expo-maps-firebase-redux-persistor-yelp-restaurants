import React, { useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MapView, { Polyline, Circle, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Details, Region, LatLng } from 'react-native-maps';

type MapProps = {
  initialRegion?: Region;
  currentLocation?: LatLng;
  currentLocationRadius?: number;
  locations?: LatLng[];
  mapStyle?: StyleProp<ViewStyle>;
  onRegionChangeComplete?: (region: Region, details: Details) => void
  scrollEnabled?: boolean;
  cacheEnabled?: boolean;
  zoomEnabled?: boolean;
  rotateEnabled?: boolean;
  pitchEnabled?: boolean;
  zoomTapEnabled?: boolean;
  provider?: 'default' | 'google';
}

export const Map: React.FC<MapProps> = (
  { currentLocation, currentLocationRadius,
    locations, initialRegion,
    mapStyle, onRegionChangeComplete, scrollEnabled, cacheEnabled,
    provider, zoomEnabled, rotateEnabled, pitchEnabled, zoomTapEnabled }) => {

  const _cacheEnabled = useMemo(() => {
    return Platform.OS === 'ios' ? undefined : cacheEnabled;
  }, [cacheEnabled]);

  const _provider = useMemo(() => {
    return provider === 'google' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;
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
      provider={_provider}
      zoomEnabled={zoomEnabled}
      rotateEnabled={rotateEnabled}
      pitchEnabled={pitchEnabled}
      scrollEnabled={scrollEnabled}
      zoomTapEnabled={zoomTapEnabled}
      cacheEnabled={_cacheEnabled}
      style={StyleSheet.flatten([styles.map, mapStyle])}
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
