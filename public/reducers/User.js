export const authentification  = (state = null, action) => {
  switch (action.type) {
    case 'RESET_AUTH':
      return false;
    case 'IS_AUTH':
      return action.value;
    default:
      return state
  }
};

export const errorSignup = (state = "", action) => {
  switch (action.type) {
    case 'ADD_ERROR_SIGNUP':
      return action.error;
    default:
      return state
  }
};

export const errorSignin = (state = "", action) => {
  switch (action.type) {
    case 'ADD_ERROR_SIGNIN':
      return action.error;
    default:
      return state
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNOUT':
      return {};
    case 'LOGIN':
      return action.user;
    default:
      return state
  }
};
