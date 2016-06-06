//  SearchView renders the input bar and sends the search input to the server on submit.
import React from 'react';

const SearchView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(document.getElementById("searchInput").value);
  };
  const searchLogo = '/styles/imgs/searchLogo.svg';
  return (
    <form onSubmit={handleSubmit} className="searchBox">
      <input type="text" id="searchInput" placeholder="Search from artists, bands, tracks, podcasts" className="searchInput" required />
      <input type="image" src={searchLogo} className="searchLogo" />
    </form>
  );
};

export default SearchView;
