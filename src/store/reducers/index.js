import { clickReducer } from './clickReducer';
import { userReducer } from './userReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  lembretes: clickReducer,
  user: userReducer
});