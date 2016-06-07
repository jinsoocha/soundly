// dashboard view to be used when a user navigates to our page.
import React from 'react';
import { browserHistory } from 'react-router';


const HomeView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    browserHistory.push('main/' + document.getElementById('roomid').value);
  };

  return (
    <div className="hero-unit">
      <form onSubmit={handleSubmit.bind(this)} className="roomForm">
        <input name="roomid" id="roomid" placeholder="Enter the room ID" className="roomInput" />
      </form>
    </div>
  );
};

export default HomeView;
