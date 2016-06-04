import React from 'react';
import SC from 'soundcloud';

SC.initialize({
  client_id: window.SCId,
});

export default class PlayerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
      currentPlayer: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queue.length > 0) {
      if (this.state.currentSong !== '') {
        console.log("hello",nextProps.queue[0].id,this.state.currentSong.id) 
        if (nextProps.queue[0].id !== this.state.currentSong.id) {
          this.setState({
            currentSong: nextProps.queue[0],
          });
          if (this.props.master) {
            this.streamTrack(nextProps.queue[0]);
          }
        }
      } else {
        this.setState({
          currentSong: nextProps.queue[0],
        });
        if (this.props.master) {
          this.streamTrack(nextProps.queue[0]);
        }
      }
    } else {
      this.setState({
        currentSong: '',
      });
    }
  }

  streamTrack(track) {
    console.log("streaming track", track, "statecurrentsong",this.state.currentSong);
    return SC.stream('/tracks/' + track.id)
    .then(player => {
      let context = this;
      if (this.state.currentPlayer) {
        this.state.currentPlayer.pause();
      }
      this.state.currentPlayer = player;
      this.state.currentPlayer.play();
      this.state.currentPlayer.on('play-start', () => {
        console.log('playing');
      });
      this.state.currentPlayer.on('finish', () => {
        console.log('finished');
        this.props.changeSong(track);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
      <div>
        <h1>PLAYER</h1>
        {this.state.currentSong.title}
      </div>
    );
  }
}
