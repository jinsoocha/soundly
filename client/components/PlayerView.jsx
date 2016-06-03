class PlayerView extends React.Component {
  constructor(props) {
    super(props);
    //  TODO: need to pass this state to queueView
  }

  streamTrack(track) {
    return SC.stream('/tracks/' + track.id)
      .then(player => { 
        console.log("playing the song", player)
        player.play();
        player.on('finish', () => {
          this.props.changeSong();
        });
      })
      .catch(() => console.log('Cannot play the song'));
  }
  
  render() {
    if (this.props.currentSong) {
      console.log("currentsongintheplayer", this.props.currentSong)
      this.streamTrack(this.props.currentSong);
      var playingSong = <div>{this.props.currentSong.title}</div>
    }
    return (
      <div>
        <h1>
        PLAYER
        </h1>
        {playingSong}
      </div>
    );
  }
}

window.PlayerView = PlayerView;