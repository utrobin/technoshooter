import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { dialogClose } from '../../actions/dialogMessage';
import CircularProgress from 'material-ui/CircularProgress';

import './Preloader.scss';

const App = ({children, auth, dialogMessage, dialogC}) => (
  <div className="Wrapper">
    {children}
    {/*Прелоадер, при запросе об ауентификации пользователя, но работает плохо из-за быстро интернета*/}
    {/*{auth === null ? (*/}
      {/*<div className="Wrapper__preloader">*/}
        {/*<CircularProgress size={200} thickness={50} />*/}
      {/*</div>*/}
    {/*) : (*/}
      {/*children*/}
    {/*)}*/}
    <Snackbar
      open={dialogMessage.open}
      message={dialogMessage.message}
      autoHideDuration={dialogMessage.duration}
      onRequestClose={dialogC}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.authentification,
    dialogMessage: state.dialogMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dialogC: () => {
      dispatch(dialogClose())
    }
  }
};

const Preloader = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Preloader;
