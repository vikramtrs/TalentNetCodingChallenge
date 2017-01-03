import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label><strong>{label}</strong></label>
    <div>
      <input className="form-control" {...input} type={type} />
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
);

class Signin extends Component {
  handleFormSubmit({ firstname, lastname, email }) {
    this.props.signinUser(firstname, lastname, email);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="signinForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="firstname" label="First Name" component={renderField} type="text" />
        <Field name="lastname" label="Last Name" component={renderField} type="text" />
        <Field name="email" label="Email" component={renderField} type="email" />

        <button action="submit" className="btn btn-primary">
          <strong>Sign In</strong>
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.firstname) {
    errors.firstname = 'Please enter your first name.';
  }

  if (!formProps.lastname) {
    errors.lastname = 'Please enter your last name.';
  }

  if (!formProps.email) {
    errors.email = 'Please enter your email address.';
  } else {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!emailRegex.test(formProps.email)) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  return errors;
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

export default Signin = connect(null, actions)(Signin);
