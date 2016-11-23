import { combineReducers } from 'redux';
import { users, page, amountPage, preloader } from './Leaderboard';
import { errorSignup, errorSignin, authentification, user } from './User';

const rootReducer = combineReducers({
  users,
  page,
  amountPage,
  preloader,
  errorSignup,
  errorSignin,
  authentification,
  user
});

export default rootReducer;
