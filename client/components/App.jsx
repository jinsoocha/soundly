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
    };
  }

  onClickSong(song) {
    $.ajax({
      url: 'http://localhost:4568/queue',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function (result) {
        this.setState({
          queue: result.data,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleUpVote(song, i) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4568/queue/increaseRank',
      data: i,
      success: function (result) {
        this.setState({
          queue: result.data,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleDownVote(song, i) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4568/queue/decreaseRank',
      data: i,
      success: function (result) {
        this.setState({
          queue: result.data,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
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
      </div>
		);
  }
}

window.App = App;
