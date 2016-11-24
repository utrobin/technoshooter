import { connect } from 'react-redux';
import Signin from '../views/Signin/Signin';
import { addUsers } from '../actions/User';

const mapStateToProps = (state) => {
  return {
    error: state.errorSignin,
    user: state.user,
    auth: state.authentification,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUsers: (formData, url, where, message) => {
      dispatch(addUsers(formData, url, where, message))
    }
  }
};

const SigninUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);

export default SigninUser;