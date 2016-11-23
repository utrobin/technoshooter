import { connect } from 'react-redux';
import Signin from '../views/Signin/Signin';
import { addUsers } from '../actions/User';

const mapStateToProps = (state) => {
  return {
    error: state.errorSignin,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUsers: (data, url) => {
      dispatch(addUsers(data, url, "SIGNIN"))
    }
  }
};

const SigninUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);

export default SigninUser;