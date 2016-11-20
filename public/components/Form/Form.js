import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './Form.scss';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    // this._onSubmit = this._onSubmit.bind(this);
    // this._onFocus = this._onFocus.bind(this);
    // this._onBlur = this._onBlur.bind(this);
    // this.addFields = this.addFields.bind(this);
    // this._onChange = this._onChange.bind(this);

    this.state = {
      submit: false,
      error: "",
    };
  }

  render() {
    const { fields = [] } = this.props.data;
    return (
      <form ref={(form) => this.form = form}>
        {
          fields.map((el) => {
            return (
              <TextField
                key={el.id}
                floatingLabelText={el.label}
                type={el.type}
                name={el.name}
                fullWidth={true}
              />
            )
          })
        }
        <RaisedButton
          className="form__button"
          label={this.props.data.controls.name}
          primary={true}
          fullWidth={true}
          labelStyle={{
            textTransform: "none",
            letterSpacing: 0.6,
            fontSize: 16,
          }}
        />
      </form>
    );
  }
}