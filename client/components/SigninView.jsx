// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


export default class SigninView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'info',
      message: '',
    };
  }

  handleSignin(e) {
    e.preventDefault();
    console.log('$$$event', event);
    console.log(this.refs.username.value);
    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  }

  sendFormData() {
    const formData = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
    // send data
    $.ajax({
      url: '/api/users/signin',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: formData,
      success: function(result) {
        // redirect to main
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        this.setState({ type: 'info', message: err.toString() });
      },
    });
  }

  render() {
    return (
      <div>
        <h1 id="heading">Signin!</h1>
        <h2>{this.state.message}</h2>
        <form onSubmit={this.handleSignin.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Select a username</label>
            <input className="form-control" name="username" ref="username" required type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Select a password</label>
            <input className="form-control" name="password" ref="password" required type="text"/>
          </div>
          <div className="form-group">
            <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}
