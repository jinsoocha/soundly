import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';


export default class SigninView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignin(e) {
    e.preventDefault();
    this.sendFormData(this.handleSuccess);
  }

  handleSuccess(result) {
    console.log('result', result);
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
      url: '/api/users/signin',
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
        <h1 id="heading">Signin!</h1>
        <form onSubmit={this.handleSignin.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Select a username</label>
            <input className="form-control" name="username" ref="username" required type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Select a password</label>
            <input className="form-control" name="password" ref="password" required type="text" />
          </div>
          <div className="form-group">
            <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}
