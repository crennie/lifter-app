import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import api from './api';

export default combineReducers({
  routing: routerReducer,
  api
})