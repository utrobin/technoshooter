import { connect } from 'react-redux';
import Signup from '../views/Signup/Signup';
import { addUsers } from '../actions/User';

const mapStateToProps = (state) => {
  return {
    error: state.errorSignup,
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

const SignupUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

export default SignupUser;