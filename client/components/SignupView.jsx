// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';

export default class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'info',
      message: '',
    };
  }

  handleSignup(e) {
    e.preventDefault();
    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  }

  sendFormData() {
    const formData = {
      username: React.findDOMNode(this.refs.username).value,
      password: React.findDOMNode(this.refs.password).value,
    };
  }

  render() {
    return (
      <div>
        <h1 id="heading">Signup!</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Select a username</label>
            <input classname="form-control" name="username" ref="username" required type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Select a password</label>
            <input classname="form-control" name="password" ref="password" required type="text"/>
          </div>
        </form>
      </div>
    );
  }
}
