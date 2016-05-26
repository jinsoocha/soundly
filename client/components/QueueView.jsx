import { Router, Route, hashHistory } from 'react-router';

var Queue = React.createClass({
  render: function() {
    return (<h1>Welcome to the Queue</h1>);
  }
});

ReactDOM.render((
  <Queue/>
  ), document.getElementById('app'))