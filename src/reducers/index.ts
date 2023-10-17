import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { authReducer } from './authReducer';
import { yelpReducer } from './yelpReducer';
import ReduxThunk from 'redux-thunk';

export const reducers = combineReducers({
  auth: authReducer,
  yelp: yelpReducer,
});

export type RootState = ReturnType<typeof reducers>;

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
