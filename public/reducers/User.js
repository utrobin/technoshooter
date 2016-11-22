// export const page = (state = 1, action) => {
//   switch (action.type) {
//     case 'ADD_PAGE':
//       console.log(action);
//       return ++state;
//     default:
//       return state
//   }
// };
//
// export const amountPage = (state = 10, action) => {
//   switch (action.type) {
//     case 'AMOUNT_PAGE':
//       console.log(action, "тут");
//       return action.page;
//     default:
//       return state
//   }
// };
//
export const authentification  = (state = null, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return action.value;
    default:
      return state
  }
};

export const error = (state = "", action) => {
  switch (action.type) {
    case 'ADD_ERROR_SIGNUP':
      return action.error;
    default:
      return state
  }
};
