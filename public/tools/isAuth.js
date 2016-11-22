import React from 'react';
import { auth } from '../actions/User';

const isAuth = (dispatch) => {
  fetch('/api/isauth', {
    method: 'post',
    credentials: 'include',
  })
    .then(response => {return response.json()})
    .then(data => {
      dispatch(auth(data))
    });
};

export default isAuth;
