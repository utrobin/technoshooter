import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { cyan700 } from 'material-ui/styles/colors';
import User from './user';

import './Leaderboard.scss';

const style = {
  textAlign: 'center',
  fontSize: 24,
  fontWeight: 500,
  color: "#fff"
};

const styleButton = {
  display: "block",
  margin: "auto",
  marginTop: 15,
};

const styleHeader = {
  color: cyan700
};

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUsers(this.props.page);
  }

  render() {
    return (
      <div className="ledearboard">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                colSpan="3"
                style={style}
              >
                Leaderboard
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn style={styleHeader} className="table__th_left">id</TableHeaderColumn>
              <TableHeaderColumn style={styleHeader} className="table__th_middle">Login</TableHeaderColumn>
              <TableHeaderColumn style={styleHeader} className="table__th_right">Rating</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.props.users.map(user =>
                <User
                  key={user.id}
                  {...user}
                />
              )
            }
          </TableBody>
        </Table>
        <div style={(this.props.page > this.props.amountPage || this.props.preloader) ? {display: "none"} : {}}>
          <RaisedButton
            label="load more"
            primary={true}
            style={styleButton}
            onTouchTap={() => {this.props.getUsers(this.props.page)}}
          />
        </div>
        <div className="table__preloader">
          <CircularProgress
            size={60}
            thickness={7}
            style={this.props.preloader ? {} : {display: "none"}}
          />
        </div>
      </div>
    );
  }
}
