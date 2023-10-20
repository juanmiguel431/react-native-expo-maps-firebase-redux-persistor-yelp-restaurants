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

type PurgeAction = {
  type: Type.persistPURGE
}

type ReducerAction = LikeRestaurantsAction | ResetLikedRestaurantsAction | PurgeAction;

export const likedRestaurantReducer = (state: ReducerState = initialState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case Type.persistPURGE:
      return { ...state, items: [] };
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
