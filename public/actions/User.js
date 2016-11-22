import fetch from 'isomorphic-fetch';

// export const addUsers = (data) => {
//   return {
//     type: 'ADD_USER',
//     data
//   }
// };
//
// export const amountPage = (page) => {
//   return {
//     type: 'AMOUNT_PAGE',
//     page
//   }
// };
//
export const auth = (value) => {
  console.log(value)
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

export const addUsers = (formData, url) => {
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
        console.log(data);
      });


    // const result = this.send(this.urlSignup, formData, 'POST');
    // const obj = JSON.parse(result);
    //
    // if (typeof (obj.login) === 'undefined') {
    //   addMessage('', false);
    //   addMessageError(obj.reason, true);
    // } else {
    //   this.user.login = obj.login;
    //   this.user.email = obj.email;
    //
    //   router.go('/');
    // }
  };
  // dispatch(togglePreloader());

};
