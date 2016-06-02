class QueueEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{ this.props.song.title } { this.props.song.duration / 1000 }</div>
        <div onClick={this.props.handleDownVote.bind(this)}>Down Vote</div>
        <div onClick={this.props.handleUpVote.bind(this)}>Up Vote</div>
      </div>
    );
  }
}

window.QueueEntryView = QueueEntryView;