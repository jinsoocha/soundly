//  SearchResultView is a parent view of SearchView and ResultView
//  This view manages the data flow between SearchView and ResultView
import React from 'react';
import SearchView from './SearchView';
import ResultView from './ResultView';

export default class SearchResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      tracks: [],
    };
  }
  
  handleKeyword(keyword) {
    this.setState({
      keyword: keyword,
    });
  }

  handleGetTracks(tracks) {
    this.setState({ tracks });
  }

  render() {
    return (
      <div className="search">
        <SearchView keyword={this.handleKeyword.bind(this)} getTracks={this.handleGetTracks.bind(this)}/>
        <ResultView keyword={this.state.keyword} tracks={this.state.tracks} clickSong={this.props.clickSong}/>
      </div>
		);
  }
}

