import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer } from './authReducer';
import { restaurantReducer } from './restaurantReducer';
import ReduxThunk from 'redux-thunk';
import { likedRestaurantReducer } from './likedRestaurantReducer';
import { PersistConfig } from 'redux-persist/es/types';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likedRestaurant'],
};

export const reducers = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  likedRestaurant: likedRestaurantReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;

const store = createStore(persistedReducers, {}, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);

export default store;
