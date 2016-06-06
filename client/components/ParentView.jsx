import React from 'react';
import { Link } from 'react-router';

const ParentView = (props) => (
  <div>
    <ul>
      <li><Link to="/">Join a room</Link></li>
      <li><Link to="signin">Sign in</Link></li>
      <li><Link to="signup">Sign up</Link></li>
    </ul>
    <div>
    {props.children}
    </div>
  </div>
);

export default ParentView;
