import Type from './types';
import { Business } from '../models/yelp';

export const likeRestaurant = (item: Business) => {
  return {
    type: Type.LikeRestaurant,
    payload: item
  };
};

export const resetLikedRestaurant = () => {
  return {
    type: Type.ResetLikedRestaurant
  };
};
