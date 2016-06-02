class QueueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleUpVote(song, i) {
    console.log(song, i);
    // $.ajax({
    //   type: 'POST',
    //   url: 'http://localhost:4568/queue',
    //   data: this.props.song,
    //   success: function (result) {
    //     upVote = result.data.upVote;
    //   }.bind(this),
    //   error: function (xhr, status, err) {
    //     console.error(status, err.toString());
    //   }.bind(this),
    // });
  }

  handleDownVote(song, i) {

    // $.ajax({
    //   type: 'POST',
    //   url: 'http://localhost:4568/queue',
    //   data: song,
    //   success: function (result) {
    //     downVote = result.data.upVote;
    //   }.bind(this),
    //   error: function (xhr, status, err) {
    //     console.error(status, err.toString());
    //   }.bind(this),
    // });
  }

  render() {
    const queue = this.props.queue;
    return (
      <div>
        <h3>Queue</h3>
          <ul>
            {queue.map((song, i) =>
              <QueueEntryView
                key={song.id}
                song={song}
                handleUpVote={this.handleUpVote.bind(this, song, i)}
                handleDownVote={this.handleDownVote.bind(this, song, i)}
              />
              )}
          </ul>
      </div>
    );
  }
}

window.QueueView = QueueView;
