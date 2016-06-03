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

  streamTrack(track) {
    return SC.stream('/tracks/' + track.id)
    .then(player => { 
      console.log('playing the song', player);
      player.play();
      player.on('finish', () => {
        console.log('finished');
        this.props.changeSong(track);
      });
    })
    .catch(err => {
      throw err;
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("queuefirstsong",nextProps.queue[0], "statecurrentsong",this.state.currentSong);
    if (nextProps.queue.length > 0 && nextProps.queue[0].id !== this.state.currentSong.id) {
      this.streamTrack(nextProps.queue[0]);
      this.setState({
        currentSong: nextProps.queue[0],
      });
      console.log("currentsongintheplayer", this.state.currentSong);
    }    
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
