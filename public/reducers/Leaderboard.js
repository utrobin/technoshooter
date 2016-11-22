export const page = (state = 1, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      console.log(action);
      return ++state;
    default:
      return state
  }
};

export const amountPage = (state = 10, action) => {
  switch (action.type) {
    case 'AMOUNT_PAGE':
      console.log(action, "тут");
      return action.page;
    default:
      return state
  }
};

export const preloader = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state;
    default:
      return state
  }
};

export const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        ...action.data
      ];
    default:
      return state
  }
};
