import Type from '../actions/types';
import { Business } from '../models/yelp';

type YelpReducerState = {
  items: Business[];
  loading: boolean;
  error: string;
}

const initialState: YelpReducerState = {
  items: [],
  loading: false,
  error: '',
};

type FetchRestaurantsAction = {
  type: Type.YelpFetchRestaurants,
  payload: Business[];
}

type SetLoadingAction = {
  type: Type.YelpLoading,
  payload: boolean;
}

type SetErrorAction = {
  type: Type.YelpError,
  payload: string;
}

type YelpReducerAction = FetchRestaurantsAction | SetLoadingAction | SetErrorAction;

export const restaurantReducer = (state: YelpReducerState = initialState, action: YelpReducerAction): YelpReducerState => {
  switch (action.type) {
    case Type.YelpFetchRestaurants:
      return { ...state, items: action.payload, error: '' };
    case Type.YelpLoading:
      return { ...state, loading: action.payload };
    case Type.YelpError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
