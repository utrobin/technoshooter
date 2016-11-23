export const authentification  = (state = null, action) => {
  switch (action.type) {
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
    case 'LOGIN':
      return action.user;
    default:
      return state
  }
};
