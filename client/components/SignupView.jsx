// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import App from './App';


export default class SignupView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignup(e) {
    e.preventDefault();
    this.sendFormData(this.handleSuccess);
  }

  handleSuccess(result) {
    const roomID = result.user.roomid;
    browserHistory.push('main/' + roomID);
    // programmatically add the room param to the root
    window.sessionStorage.accessToken = result.token;
  }

  sendFormData(callback) {
    const formData = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
    // send data
    $.ajax({
      url: '/api/users/signup',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: formData,
      success: function(result) {
        callback(result);
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup.bind(this)} className="signupForm">
          <div className="usernameForm">
            <label htmlFor="username" className="username">Username</label>
            <input className="usernameInput" name="username" ref="username" required type="text" />
          </div>
          <div className="passwordForm">
            <label htmlFor="password" className="password">Password</label>
            <input className="passwordInput" name="password" ref="password" required type="text" />
          </div>
          <div className="signupWrapper">
            <button className="signupButton">Signup</button>
          </div>
        </form>
      </div>
    );
  }
}
