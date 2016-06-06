//  SearchView renders the input bar and sends the search input to the server on submit.
import React from 'react';
import $ from 'jquery';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  //  we need this to send the input data to the client
  requestBuildQueryString(params) {
    const queryString = [];
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.keyword(this.refs.searchInput.value);
    const obj = { keyword: this.refs.searchInput.value };
    console.log(this.refs.searchInput.value);
    $.ajax({
      url: 'http://localhost:4568/server',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: this.requestBuildQueryString(obj),
      success: function (result) {
        console.log(result.data);
        // sending the data from the server to the parent, SearchResultView
        this.props.getTracks(result.data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
    });
  }
  // <button type="submit" className="searchButton">Search</button>
  render() {
    const searchLogo = '/styles/imgs/searchLogo.svg';
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="searchBox">
        <input type="text" ref="searchInput" placeholder="Search from artists, bands, tracks, podcasts" className="searchInput" autofocus required />
        <input type="image" src= {searchLogo} className="searchLogo" />
      </form>
    );
  }
}
