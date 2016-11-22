import fetch from 'isomorphic-fetch';

export const addUsers = (data) => {
  return {
    type: 'ADD_USER',
    data
  }
};

export const amountPage = (page) => {
  return {
    type: 'AMOUNT_PAGE',
    page
  }
};

export const addPage = () => {
  return {
    type: 'ADD_PAGE',
  }
};

export const togglePreloader = () => {
  return {
    type: 'TOGGLE',
  }
};

export const getUsers = (page) => {
  return (dispatch) => {
    dispatch(togglePreloader());
    fetch(`/api/best?page=${page}`)
      .then(response => response.json())
      .then(data => {
        dispatch(addPage());
        dispatch(amountPage(data.pages));
        dispatch(addUsers(data.users));
        dispatch(togglePreloader());
      })
  }
};
