// dashboard view to be used when a user navigates to our page.
import React from 'react';
import { Link, browserHistory } from 'react-router';


const HomeView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    browserHistory.push('main/' + document.getElementById('roomid').value);
  };

  return (
    <div className="hero-unit">
      <div className="parentView">
        <h1 className="welcome">Welcome to Soundly!</h1>
        <div className="homeOptions">
          <Link to="signin" className="signIn">sign in</Link>
          <Link to="/" className="joinRoom">join a room</Link>
          <Link to="signup" className="signup">sign up</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit.bind(this)} className="roomForm">
        <input name="roomid" id="roomid" placeholder="Enter the room ID" className="roomInput" />
      </form>
    </div>
  );
};

export default HomeView;

