import { connect } from 'react-redux';
import Signup from '../views/Signup/Signup';
import { addUsers } from '../actions/User';

const mapStateToProps = (state) => {
  return {
    error: state.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUsers: (data, url) => {
      dispatch(addUsers(data, url))
    }
  }
};

const SignupUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

export default SignupUser;