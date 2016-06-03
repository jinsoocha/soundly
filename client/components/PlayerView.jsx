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

  streamTrack(track) {
    return SC.stream('/tracks/' + track.id).then(player => {
      console.log('playing the song', player);
      player.play();
      player.on('finish', () => {
        console.log('finished');
        this.props.changeSong();
      });
    }).catch(() => console.log('Cannot play the song'));
  }

  render() {
    console.log("queuefirstsong",this.props.queue[0], "statecurrentsong",this.state.currentSong);
    if (this.props.queue.length > 0 && this.props.queue[0].id !== this.state.currentSong.id) {
      this.streamTrack(this.props.queue[0]);
      this.setState({
        currentSong: this.props.queue[0],
      });
      console.log("currentsongintheplayer", this.state.currentSong);
    }
    return (
      <div>
        <h1>PLAYER</h1>
        {this.state.currentSong.title}
      </div>
    );
  }
}
