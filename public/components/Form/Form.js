import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './Form.scss';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.addClassError = this.addClassError.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.requeredFields = {};

    this.state = {
      errorFields: {},
    };
  }

  componentWillMount() {
    this.getFieldsRequered();
  }

  onBlur(event) {
    const temp = event.target;
    if (temp.value === '' && this.requeredFields[temp.name] === true) {
      let errorFields = this.state.errorFields;
      errorFields[temp.name] = "This field is required";
      this.setState({
        errorFields: errorFields
      })
    }
  }

  onFocus(event) {
    const temp = event.target.name;
    let errorFields = this.state.errorFields;
    errorFields[temp] = "";
    this.setState({
      errorFields: errorFields
    })
  }

  getFormData() {
    const elements = this.form.elements;
    const fields = {};

    Object.keys(elements).forEach((element) => {
      const name = elements[element].name;
      const value = elements[element].value;

      if (!name) {
        return;
      }

      fields[name] = value;
    });

    return fields;
  }

  checkFill() {
    const formData = this.getFormData();
    return Object.keys(formData).every((element) => {
      if (formData[element] === '' && this.requeredFields[element] === true) {
        return false;
      }
      return true;
    });
  }

  getFieldsRequered() {
    const { fields = [] } = this.props.data;

    fields.forEach((field) => {
      if (field.required) {
        this.requeredFields[field.name] = true;

        let temp = this.state.errorFields;
        temp[field.name] = "";
        this.setState({
          errorFields: temp
        })
      } else {
        this.requeredFields[field.name] = false;
      }
    });
  }

  addClassError() {
    const formData = this.getFormData();
    const fields = Object.keys(this.requeredFields);

    fields.forEach((element, i) => {
      const temp = fields[i];
      if (this.requeredFields[temp] && formData[temp] === '') {
        let errorFields = this.state.errorFields;
        errorFields[temp] = "This field is required";
        this.setState({
          errorFields: errorFields
        })
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.checkFill()) {
      this.addClassError();
      return;
    }

    const formData = this.getFormData();

    if (formData.password1 !== undefined && formData.password1 !== formData.password2
      && formData.password1 !== '' && formData.password2 !== '') {
      let errorFields = this.state.errorFields;
      errorFields["password2"] = "Пароли не совпадают";
      this.setState({
        errorFields: errorFields
      });
      return;
    }

    this.props.data.action(formData, this.props.data.url);
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
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                type={el.type}
                name={el.name}
                errorText={this.state.errorFields[el.name] || ""}
                fullWidth={true}
              />
            )
          })
        }
        <RaisedButton
          onTouchTap={this.onSubmit}
          className="form__button"
          label={this.props.data.controls.name}
          primary={true}
          fullWidth={true}
        />
      </form>
    );
  }
}
