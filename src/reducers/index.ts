import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer, PURGE } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxThunk from 'redux-thunk';
import { authReducer } from './authReducer';
import { restaurantReducer } from './restaurantReducer';
import { likedRestaurantReducer } from './likedRestaurantReducer';
import { notificationReducer } from './notificationReducer';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likedRestaurant'],
};

export const reducers = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  likedRestaurant: likedRestaurantReducer,
  notification: notificationReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;

const store = createStore(persistedReducers, {}, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);

export default store;
