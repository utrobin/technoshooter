import { connect } from 'react-redux';
import Main from '../views/Main/Main';
import { signoutUser } from '../actions/User';

const mapStateToProps = (state) => {
  return {
    error: state.errorSignin,
    auth: state.authentification,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => {
      dispatch(signoutUser())
    }
  }
};

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainPage;