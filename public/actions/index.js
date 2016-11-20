let nextTodoId = 0
export const addUsers = (data) => {
  return {
    type: 'ADD_USER',
    data
  }
};

export const getUsers = () => {
  return dispatch => {
    fetch('/api/best?page=1')
      .then(function(response) {
        dispatch(addUsers("gfg"));
        console.log(response);
        return response.json();
      })
      .catch( alert );
  }
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}