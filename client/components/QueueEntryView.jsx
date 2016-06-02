class QueueEntryView extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div>
        <div>{ this.props.song.title }</div>
        <div onClick={this.props.handleUpVote.bind(null, this.props.song)}>Up Vote</div>
        <div onClick={this.props.handleDownVote.bind(null, this.props.song)}>Down Vote</div>
      </div>
    );
  }
}

window.QueueEntryView = QueueEntryView;