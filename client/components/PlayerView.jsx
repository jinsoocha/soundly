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
    console.log("streaming track", track)
    return SC.stream('/tracks/' + track.id)
    .then(player => { 
      player.play();
      player.on('play-start', () => {
        this.setState({
          currentSong: track,
        });        
      console.log("currentsongintheplayer", this.state.currentSong);
      });
      player.on('finish', () => {
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

  componentWillReceiveProps(nextProps) {
    console.log("queuefirstsong",nextProps.queue[0], "statecurrentsong",this.state.currentSong);
    if (nextProps.queue.length > 0 && nextProps.queue[0].id !== this.state.currentSong.id) {
      this.streamTrack(nextProps.queue[0]);
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
