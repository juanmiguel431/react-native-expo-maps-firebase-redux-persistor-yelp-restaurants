import { LatLng } from 'react-native-maps/lib/sharedTypes';

export type Coordinate = LatLng & {
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface Point {
  timestamp: number;
  coords: Coordinate;
}
