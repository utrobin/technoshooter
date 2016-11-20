import { connect } from 'react-redux';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import { getUsers } from '../actions/index'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers())
    }
  }
};

const VisibleLeaderboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);

export default VisibleLeaderboard;