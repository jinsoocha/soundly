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
    const { track } = this.props;
    const defaultArt = "/styles/imgs/defaultart.png"

    return (
      <div onClick={this.handleClick.bind(this)} className="resultEntry">
        <img src={track.artwork_url || defaultArt} alt="artwork" className="resultImg"/>
        <div className="resultDetails">
          <div className="resultTitle">{track.title}</div>
        </div>
      </div>
		);
  }
}