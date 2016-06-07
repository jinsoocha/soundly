import React from 'react';
import { Link } from 'react-router';

const ParentView = (props) => (
  <div className="parentView">
    <div>{props.children}</div>
  </div>
);

export default ParentView;
