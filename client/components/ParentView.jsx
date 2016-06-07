import React from 'react';
import { Link } from 'react-router';

const ParentView = (props) => (
  <div className="parentView">
    <h1 className="welcome">Welcome to Soundly!</h1>
    <div className="homeOptions">
      <Link to="signin" className="signIn">sign in</Link>
      <Link to="/" className="joinRoom">join a room</Link>
      <Link to="signup" className="signup">sign up</Link>
    </div>
    <div>{props.children}</div>
  </div>
);

export default ParentView;
