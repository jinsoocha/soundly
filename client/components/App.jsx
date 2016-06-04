import React from 'react';
import SearchResultView from './SearchResultView';
import QueueView from './QueueView';
import PlayerView from './PlayerView';
import $ from 'jquery';

const socket = io();
window.master = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      time: 0,
    };
  }

  componentWillMount() {
    console.log("initialmount")
    const context = this;

    socket.on('connect', () => {
      socket.on('master', (data) => {
        console.log("i am a master")
        window.master = data;
      });
      console.log("requestSongtime")
      socket.emit('requestSongtime');
    });

    socket.on('getSongtime', () => {
      console.log("gettingsongtime", window.master)    
      if (window.master) {
      console.log("gettingsongtime cuz it is master")
        socket.emit('sendSongtime', 3);
      }
    });

    socket.on('setSongtime', (data) => {
      console.log("settingsongtime for non masters")
      context.syncSong(data);
    });

    socket.on('queue', (data) => {
      context.updateQueue(data);
    });
  }

  syncSong(data) {
    console.log("syncing song", data);
    this.setState({
      time: data,
    });
  }

  updateQueue(data) {
    console.log("updating queue")
    this.setState({
      queue: data,
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
        socket.emit('update', { socket: 'connected' });
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        window.alert('the same song cannot be added one after another');
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
        socket.emit('update', { socket: 'connected' });
        this.setState({
          queue: result,
        });
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
        socket.emit('update', { socket: 'connected' });
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
        socket.emit('update', { socket: 'connected' });
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
          <SearchResultView clickSong={this.onClickSong.bind(this)}/>
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
            changeSong={this.handleChangeSong.bind(this)}
            queue={this.state.queue}
          />
        </div>
      </div>
		);
  }
}
