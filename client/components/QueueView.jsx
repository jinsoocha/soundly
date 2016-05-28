class QueueView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render () {

    var tracks = this.props.tracks;

    return (
      <div>
      {tracks.map((track) => {
        return (<QueueEntryView key={song.id.scId} song={song} parentFunction={this.parentFunction}/>);
      })};
    );
  }
}

window.QueueView = QueueView;