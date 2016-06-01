// stateless component
class QueueEntryView extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      count: 0,
    };

    function handleUpVote() {
      this.setState ({
        count: count + 1,
      });
    }

    function handleDownVote() {
      this.setState ({
        count: count - 1,
      })
    }

    render() {
      var song = this.props.song;
      return (
        <div>{song}</div>
        <div onClick={this.handleDownVote}>Down Vote</div>
        <div onClick={this.handleUpVote}>Up Vote</div>
      )
    }
  }
}
