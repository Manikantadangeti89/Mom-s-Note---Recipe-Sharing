import React, { useState } from 'react';
import './SearchBar.css'; // Importing individual CSS file for SearchBar

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
