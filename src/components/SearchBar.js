import React, { useState } from "react";
import "./SearchBar.css";

// Composant SearchBar qui permet de rechercher un film
const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

    // Gestion du changement dans le champ de recherche
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setSearchQuery(value);
  };

  // Fonction  pour vider le champ de recherche
  const clearSearch = () => {
    setQuery("");
    setSearchQuery("");
  };

  // Affichage du composant SearchBar  dans App.js
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Rechercher un film..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button className="clear-button" onClick={clearSearch}>✖</button>
      )}
    </div>
  );
};

export default SearchBar;
