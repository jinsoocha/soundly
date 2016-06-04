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
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("queuefirstsong",nextProps.queue[0], "statecurrentsong",this.state.currentSong);
    if (nextProps.queue.length > 0) {
      if (nextProps.queue[0].id !== this.state.currentSong.id) {
        this.streamTrack(nextProps.queue[0]);
      }
    }
  }

  streamTrack(track) {
    console.log("streaming track", track)
    let currentPlayer;
    return SC.stream('/tracks/' + track.id)
    .then(player => {
      if (currentPlayer) {
        currentPlayer.pause();
      }
      currentPlayer = player;
      currentPlayer.play();
      currentPlayer.on('play-start', () => {
        this.setState({
          currentSong: track,
        });
        console.log("currentsongintheplayer", this.state.currentSong);
      });
      currentPlayer.on('finish', () => {
        console.log('finished');
        this.setState({
          currentSong: '',
        });
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
