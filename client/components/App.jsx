//  App is our main view that contains every subview.

//  Note: I am using stateful class for every component
//  because I am not sure if a component would have a state at a later point as we code.
//  We can refactor to stateless functional class when we feel necessary.
//  Question for myself: why is stateless functional better than stateful?
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      currentSong: '',
    };
  }

  onClickSong(song) {
    // set up the state as the song that has been passed from searchResultView
    console.log(song);
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
        if (this.state.queue.length === 1) {
          this.setState({
            currentSong: this.state.queue[0],
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleChangeSong() {
    $.ajax({
      url: 'api/queue/firstSongFinished',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      success: function(result) {
        const tempQueue = result;
        this.setState({
          queue: tempQueue,
          currentSong: result.data[0],
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
        <h1>
          AppView
        </h1>
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
            currentSong={this.state.currentSong}
            queue={this.state.queue}
          />
        </div>
      </div>
    );
  }
}

window.App = App;
