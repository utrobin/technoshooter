import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import User from './user';

import './Leaderboard.scss';

const style = {
  textAlign: 'center',
  fontSize: 24,
  fontWeight: 500,
  color: "#fff"
};

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      error: "",
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
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
            <TableHeaderColumn className="table__th_left">id</TableHeaderColumn>
            <TableHeaderColumn className="table__th_middle">Login</TableHeaderColumn>
            <TableHeaderColumn className="table__th_right">Rating</TableHeaderColumn>
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
    );
  }
}
