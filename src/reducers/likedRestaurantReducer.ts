import Type from '../actions/types';
import { Business } from '../models/yelp';

type ReducerState = {
  items: Business[];
}

const initialState: ReducerState = {
  items: [],
};

type LikeRestaurantsAction = {
  type: Type.LikeRestaurant,
  payload: Business;
}

type ReducerAction = LikeRestaurantsAction;

export const likedRestaurantReducer = (state: ReducerState = initialState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case Type.LikeRestaurant:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};
