// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';
import App from './components/App';

export default class SignupView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignup(e) {
    e.preventDefault();
    console.log(this.refs.userInput.value);
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSignup.bind(this)}>
            <p>
              <input type="text" name="usernameInput" ref="userInput"></input>
              <input type="text" name="passwordInput" ref="userInput"></input>
             </p>
          </form>
        </div>
      </div>
    );
  }
}
