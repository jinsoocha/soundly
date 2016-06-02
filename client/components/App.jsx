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
      queue: [],
      currentSong: '',
    };
  }

  onClickSong(song) {
    console.log("clicked",song)
    // set up the state as the song that has been passed from searchResultView
    $.ajax({
      url: 'http://localhost:4568/queue',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: song,
      success: function(result) {
        console.log("Queueing the new song",result.data);
        this.setState({
          queue: result.data,
        });
        if(this.state.queue.length === 1) {
          this.setState({
            currentSong: this.state.queue[0],
          });
          console.log("Playing the first song in the queue when length=1", this.state.currentSong)
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }

  handleChangeSong() {  
    console.log("changing song")
    $.ajax({
      url: 'http://localhost:4568/remove',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      success: function(result) {
        this.setState({
          queue: result.data,
          currentSong: result.data[0],
        });
        console.log("Changing queue and song on finish",this.state.queue, this.state.currentSong)
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
