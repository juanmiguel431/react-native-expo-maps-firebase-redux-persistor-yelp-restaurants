import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { authReducer } from './authReducer';
import { restaurantReducer } from './restaurantReducer';
import ReduxThunk from 'redux-thunk';
import { likedRestaurantReducer } from './likedRestaurantReducer';

export const reducers = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  likedRestaurant: likedRestaurantReducer,
});

export type RootState = ReturnType<typeof reducers>;

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
