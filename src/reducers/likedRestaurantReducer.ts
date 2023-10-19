import Type from '../actions/types';
import { Business } from '../models/yelp';
import _ from 'lodash';

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

type ResetLikedRestaurantsAction = {
  type: Type.ResetLikedRestaurant
}

type ReducerAction = LikeRestaurantsAction | ResetLikedRestaurantsAction;

export const likedRestaurantReducer = (state: ReducerState = initialState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case Type.LikeRestaurant: {
      const items = _.uniqBy([...state.items, action.payload], 'id');
      return { ...state, items: items };
    }
    case Type.ResetLikedRestaurant:
      return { ...state, items: [] };
    default:
      return state;
  }
};
