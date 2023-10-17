import { Dispatch } from 'redux';
import Type from './types';
import yelp from '../apis/yelp';
import { BusinessSearch } from '../models/yelp';
import { CommonActions } from '@react-navigation/native';
import { SCREEN } from '../models/screen';

type Location = {
  latitude: number;
  longitude: number;
}

export const MAP_RADIUS = 3250;

export const getRestaurants = ({ latitude, longitude }: Location) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.YelpLoading, payload: true });

    const response = await yelp.get<BusinessSearch>('/search', {
      params: {
        latitude: latitude,
        longitude: longitude,
        radius: MAP_RADIUS
      }
    });

    dispatch({ type: Type.YelpFetchRestaurants, payload: response.data.businesses });
    CommonActions.navigate(SCREEN.Deck);

  } catch (e) {
    if (e instanceof Error) {
      dispatch({ type: Type.YelpError, payload: e.message });
    }
  } finally {
    dispatch({ type: Type.YelpLoading, payload: false });
  }
};
