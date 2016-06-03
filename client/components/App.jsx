import React from 'react';
import SearchResultView from './SearchResultView';
import QueueView from './QueueView';
import PlayerView from './PlayerView';
import SignupView from './SignupView';
import $ from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
    };
  }

  onClickSong(song) {
    // set up the state as the song that has been passed from searchResultView
    console.log("clicked");
    $.ajax({
      url: '/api/queue/addSong',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function(result) {
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleChangeSong() {
    $.ajax({
      url: 'api/queue/songFinished',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      success: function(result) {
        this.setState({
          queue: result,
          currentSong: result[0],
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
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}