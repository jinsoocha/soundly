//  App is our main view that contains every subview.

//  Note: I am using stateful class for every component
//  because I am not sure if a component would have a state at a later point as we code.
//  We can refactor to stateless functional class when we feel necessary.
//  Question for myself: why is stateless functional better than stateful?

class App extends React.Component {
  constructor(props) {
    super(props);
    //  TODO: need to pass this state to queueView
    this.state = {
      clickedSong: '',
      queue: [],
      currentSong: '',
    };
  }

  onClickSong(song) {
    // set up the state as the song that has been passed from searchResultView
    this.setState({
      clickedSong: song,
    });
    $.ajax({
      url: 'http://localhost:4568/queue',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function(result) {
        console.log(result);
        this.setState({
          queue: result.data,
        });
        if(this.state.queue.length === 1) {
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
      url: 'http://localhost:4568/remove',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      success: function(result) {
        console.log(result.data)
        this.setState({
          queue: result.data,
          currentSong: result.data[0],
        });
      }.bind(this),
      error: function(xhr, status, err) {
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
            song={this.state.clickedSong}
            queue={this.state.queue}
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
