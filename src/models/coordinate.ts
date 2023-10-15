
export type Coordinate = {
  latitude: number;
  longitude: number;
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
