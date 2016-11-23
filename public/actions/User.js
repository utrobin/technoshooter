import fetch from 'isomorphic-fetch';

export const auth = (value) => {
  return {
    type: 'IS_AUTH',
    value
  };
};

export const addErrorSignup = (error) => {
  return {
    type: 'ADD_ERROR_SIGNUP',
    error
  }
};

export const addErrorSignin = (error) => {
  return {
    type: 'ADD_ERROR_SIGNIN',
    error
  }
};

export const login = (user) => {
  return {
    type: 'LOGIN',
    user
  }
};

export const addUsers = (formData, url, where) => {
  return (dispatch) => {

    if (formData.password1 !== undefined) {
      formData.password = formData.password1;
      delete formData.password1;
      delete formData.password2;
    }

    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {return response.json()})
      .then(data => {
        if (data.code !== undefined) {
          if (where === "SIGNUP") {
            dispatch(addErrorSignup(data.reason));
          }
          else if (where === "SIGNIN") {
            dispatch(addErrorSignin(data.reason));
          }
          return;
        }
        dispatch(login(data));
        dispatch(auth(true));
      });
  };
};
