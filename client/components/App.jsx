import React from 'react';
import SearchResultView from './SearchResultView';
import QueueView from './QueueView';
import PlayerView from './PlayerView';
import $ from 'jquery';

const socket = io();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.onClickSong = this.onClickSong.bind(this);
    this.handleChangeSong = this.handleChangeSong.bind(this);
    this.state = {
      socket: socket,
      master: false,
      queue: [],
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
      context.updateQueue(data);
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
        // displaying a "song is added" message
        $('.songAdded').fadeToggle(500).fadeToggle(500);
      }.bind(this),
      error: function (xhr, status, err) {
        // displaying a "song is not added" message;
        $('.notAdded').fadeToggle(500).fadeToggle(500);
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
        // upvote click animation
        $('.upvoteMsg').fadeToggle(500).fadeToggle(500);
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
        // downvote click animation
        $('.downvoteMsg').fadeToggle(500).fadeToggle(500);
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
        <PlayerView changeSong={this.handleChangeSong} queue={this.state.queue} master={this.state.master} />
      </div>
		);
  }
}
