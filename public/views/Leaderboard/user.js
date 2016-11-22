import React from 'react';
import {TableHeaderColumn, TableRow} from 'material-ui/Table';

const style ={
  color: "#fff"
};

const User = ({ id, login, rating }) => (
  <TableRow className="table__tr">
    <TableHeaderColumn style={style} className="table__th_left">{id}</TableHeaderColumn>
    <TableHeaderColumn style={style} className="table__th_middle">{login}</TableHeaderColumn>
    <TableHeaderColumn style={style} className="table__th_right">{rating}</TableHeaderColumn>
  </TableRow>
);

export default User;