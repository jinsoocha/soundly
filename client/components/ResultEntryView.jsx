import React from 'react';

export default class ResultEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.clickSong(this.props.track);
  }

  render() {
    const {track} = this.props;
    const time = track.duration / 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const default_art = 'http://www.dardensmith.com/wp-content/themes/soundcheck/images/default-artwork.png';

    return (
      <div onClick={this.handleClick.bind(this)} className="resultEntry">
        <img src={track.artwork_url || default_art} alt="artwork" className="resultImg"/>
        <div className="resultDetails">
          <div className="resultTitle">{track.title}</div>
        </div>
      </div>
		);
  }
}