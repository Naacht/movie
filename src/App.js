import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null); // État pour stocker l'ID du film sélectionné

  return (
    <Router>
      <header>
        <SearchBar setSearchQuery={setSearchQuery} />
      </header>

      <main className="main-container">
        <MovieList searchQuery={searchQuery} setSelectedMovieId={setSelectedMovieId} />
        {selectedMovieId && <MovieDetails selectedMovieId={selectedMovieId} />} {/* Affiche directement MovieDetails */}
      </main>
    </Router>
  );
};

export default App;