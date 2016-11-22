import { connect } from 'react-redux';
import Leaderboard from '../views/Leaderboard/Leaderboard';
import { getUsers } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    page: state.page,
    amountPage: state.amountPage,
    preloader: state.preloader,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => {
      dispatch(getUsers(data))
    }
  }
};

const VisibleLeaderboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);

export default VisibleLeaderboard;