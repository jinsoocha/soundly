import React from 'react';
import SC from 'soundcloud';
import config from '../config/config';

SC.initialize({
  client_id: window.SCId,
});

export default class PlayerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queue.length > 0) {
      if (this.state.currentSong !== '') {
        console.log("hello",nextProps.queue[0].id,this.state.currentSong.id) 
        if (nextProps.queue[0].id !== this.state.currentSong.id) {
          this.streamTrack(nextProps.queue[0]);
          this.setState({
            currentSong: nextProps.queue[0],
          });
        }
      } else {
        this.setState({
          currentSong: nextProps.queue[0],
        });
        this.streamTrack(nextProps.queue[0]);
      }
    } else {
      this.setState({
        currentSong: '',
      });
    }
  }

  streamTrack(track) {
    console.log("streaming track", track, "statecurrentsong",this.state.currentSong);
    let currentPlayer;
    return SC.stream('/tracks/' + track.id)
    .then(player => {
      if (currentPlayer) {
        currentPlayer.pause();
      }
      currentPlayer = player;
      currentPlayer.play();
      currentPlayer.on('play-start', () => {
        console.log('playing')
      });
      currentPlayer.on('finish', () => {
        if (window.master) {
          console.log('finished');
          this.props.changeSong(track);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {    
    return (
      <div className="playerBox">
        <div className="currentSongTitle">{this.state.currentSong.title}</div>
      </div>
    );
  }
}
