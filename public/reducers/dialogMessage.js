const initState = {
  open: false,
  message: "",
  duration: 4000
};

export const dialogMessage = (state = initState, action) => {
  switch (action.type) {
    case 'DIALOG_OPEN':
      return Object.assign({}, state, {
        open: true
      });
    case 'DIALOG_CLOSE':
      return Object.assign({}, state, {
        open: false
      });
    case 'DIALOG_MESSAGE':
      return Object.assign({}, state, {
        message: action.message
      });
    case 'AUTO_HIDE_DURATION':
      return Object.assign({}, state, {
        duration: action.duration
      });
    default:
      return state
  }
};
