export const dialogMessage = (message) => {
  return {
    type: 'DIALOG_MESSAGE',
    message: message
  }
};

export const dialogOpen = () => {
  return {
    type: 'DIALOG_OPEN',
  }
};

export const dialogClose = () => {
  return {
    type: 'DIALOG_CLOSE',
  }
};
