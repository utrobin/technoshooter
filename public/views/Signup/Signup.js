import React from 'react';
import Form from '../../components/Form/Form';
import Paper from 'material-ui/Paper';
import Logo from '../../components/Logo/Logo';
import { browserHistory } from 'react-router';

import './Signup.scss';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.auth === true) {
      browserHistory.push("/");
      return (
        <div></div>
      )
    }
    else {
      return (
        <div className="signup__wrapper">
          <div className="signup">
            <Logo />
            <h1 className="signup__title">Sign up to TechnoShooter</h1>
            <Paper zDepth={3}>
              {this.props.error !== "" ? <span className="signup__form__error">{this.props.error}</span> : ""}
            </Paper>
            <Paper zDepth={3} className="signup__form">
              <Form
                data={
                {
                  fields: [
                    {
                      id: 1,
                      name: 'login',
                      type: 'text',
                      label: 'Username',
                      required: true,
                    }, {
                      id: 2,
                      name: 'email',
                      type: 'email',
                      label: 'Email',
                      required: false,
                    }, {
                      id: 3,
                      name: 'password1',
                      type: 'password',
                      label: 'Password',
                      required: true,
                    }, {
                      id: 4,
                      name: 'password2',
                      type: 'password',
                      label: 'Repeat password',
                      required: true,
                    },
                  ],
                  controls: {
                    name: 'Sign up'
                  },
                  action: this.props.addUsers,
                  error: this.props.error,
                  url: '/api/signup',
                  message: `You have successfully registered`,
                  type: 'SIGNUP',
                }
                }
              />
            </Paper>
          </div>
        </div>
      )
    }
  }
}
