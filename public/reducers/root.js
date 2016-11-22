import { combineReducers } from 'redux';
import { users, page, amountPage, preloader } from './Leaderboard';
import { error, authentification } from './User';

const rootReducer = combineReducers({
  users,
  page,
  amountPage,
  preloader,
  error,
  authentification,
});

export default rootReducer;
