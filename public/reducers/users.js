const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        id: action.id,
        text: action.text,
        rating: action.rating
      };
    default:
      return state
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return [
        ...state,
        {id: 1, login: "Ваня", rating: 3434},
        {id: 2, login: "Ванgfgя", rating: 343434}
      ];
    case 'ADD_USER':
      return [
        ...state,
        user(undefined, action)
      ];
    default:
      return state
  }
};

export default users;