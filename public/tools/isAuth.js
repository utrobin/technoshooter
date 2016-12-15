import React from 'react';
import { auth, login } from '../actions/User';
import fetch from 'isomorphic-fetch';

const isAuth = (dispatch) => {
  fetch('/api/isauth', {
    method: 'post',
    credentials: 'include',
  })
    .then(response => {return response.json()})
    .then(data => {
      document.querySelector('.main-preloader').style.display = 'none';

      let user = localStorage.getItem('user');
      if (user !== undefined) {
        dispatch(login(JSON.parse(data)));
      }

      dispatch(auth(data))
    });
};

export default isAuth;
