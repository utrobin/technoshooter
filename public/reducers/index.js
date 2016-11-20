import { combineReducers } from 'redux';
import users from './users';

const gameApp = combineReducers({
  users,
});

export default gameApp