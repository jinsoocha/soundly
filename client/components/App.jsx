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
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.onClickSong = this.onClickSong.bind(this);
    this.handleChangeSong = this.handleChangeSong.bind(this);
    this.state = {
      queue: [],
    };
  }

  componentWillMount() {
    console.log("initialmount")
    const context = this;
    socket.on('queue', (data) => {
      context.updateQueue(data);
    });
    socket.on('master', (data) => {
      console.log("i am a master")
      window.master = data;
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
        <SearchResultView clickSong={this.onClickSong} />
        <QueueView queue={this.state.queue} upVote={this.handleUpVote} downVote={this.handleDownVote} />
        <PlayerView changeSong={this.handleChangeSong} queue={this.state.queue} />
      </div>
		);
  }
}
