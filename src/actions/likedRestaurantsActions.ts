import Type from './types';
import { Business } from '../models/yelp';

const likeRestaurant = (item: Business) => {
  return {
    type: Type.LikeRestaurant,
    payload: item
  };
};
