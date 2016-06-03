import React from 'react';

export default class ResultEntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.clickSong(this.props.track);
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
				{this.props.track.title} {this.props.track.duration / 1000}
      </div>
		);
  }
}
