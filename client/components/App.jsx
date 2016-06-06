import React from 'react';
import SearchView from './SearchView';
import ResultView from './ResultView';
import QueueView from './QueueView';
import PlayerView from './PlayerView';
import SignupView from './SignupView';
import $ from 'jquery';
import { Link } from 'react-router';

const socket = io();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket,
      master: false,
      searchResult: [],
      queue: [],
      currentSong: '',
    };
  }

  componentWillMount() {
    console.log("initialmount")
    const context = this;

    socket.on('connect', () => {
      socket.on('master', (data) => {
        console.log("i am a master",data)
        context.setState({
          master: data,
        });
      });
    });

    socket.on('queue', (data) => {
      if (data[0].length === 0) {
        this.setState({
          queue: data[0],
          currentSong: '',
        });
      } else {
        if (data[1]) {
          this.setState({
            queue: data[0],
            currentSong: data[1],
          });
        } else {
          this.setState({
            queue: data[0],
          });
        }
      }
    });
  }

  onClickSong(song) {
    // set up the state as the song that has been passed from searchResultView
    console.log("clicked");
    $.ajax({
      url: '/api/queue/addSong',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function (result) {
        if (result.length === 1) {
          socket.emit('update', result[0]);
          this.setState({
            currentSong: result[0],
            queue: result,
          });
        } else {
          socket.emit('update');
          this.setState({
            queue: result,
          });
        }
      }.bind(this),
      error: function (xhr, status, err) {
        window.alert('the same song cannot be added one after another');
      }.bind(this),
    });
  }

  requestBuildQueryString(params) {
    const queryString = [];
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  }

  handleSubmit(keyword) {
    const obj = { keyword: keyword };
    $.ajax({
      url: 'http://localhost:4568/server',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: this.requestBuildQueryString(obj),
      success: function (result) {
        this.setState({
          searchResult: result.data,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('error here');
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleChangeSong(song) {
    $.ajax({
      url: 'api/queue/songFinished',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function(result) {
        socket.emit('update', result[0]);
        if (result.length === 0) {
          this.setState({
            queue: result,
            currentSong: '',
          });
        } else {
          this.setState({
            queue: result,
            currentSong: result[0],
          });
        }
      }.bind(this),
      error: function (xhr, status, err) {
      }.bind(this),
    });
  }

  handleUpVote(song, i) {
    $.ajax({
      type: 'POST',
      url: '/api/queue/increaseRank',
      data: { index: i },
      success: function (result) {
        socket.emit('update');
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  handleDownVote(song, i) {
    $.ajax({
      type: 'POST',
      url: '/api/queue/decreaseRank',
      data: { index: i },
      success: function (result) {
        socket.emit('update');
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <h1>AppView</h1>
        <div>
          <ul class="navbar">
            <li><button><Link to="signin">Signin</Link></button></li>
            <li><button><Link to="signup">Signup</Link></button></li>
          </ul>
          <SearchView
            handleSubmit={this.handleSubmit.bind(this)}
          />
          <ResultView
            result={this.state.searchResult}
            clickSong={this.onClickSong.bind(this)}
          />
        </div>
        <div>
          <QueueView
            queue={this.state.queue}
            upVote={this.handleUpVote.bind(this)}
            downVote={this.handleDownVote.bind(this)}
          />
        </div>
        <div>
          <PlayerView
            currentSong={this.state.currentSong}
            master={this.state.master}
            changeSong={this.handleChangeSong.bind(this)}
            queue={this.state.queue}
          />
        </div>
      </div>
    );
  }
}