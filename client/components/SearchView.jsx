//  SearchView renders the input bar and sends the search input to the server on submit.
import React from 'react';

const SearchView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(document.getElementById("searchInput").value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input autofocus type="text" name="searchInput" id="searchInput" placeholder="Keyword" required />
    </form>
  );
};

export default SearchView;
