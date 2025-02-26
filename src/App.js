import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <header>
        <SearchBar setSearchQuery={setSearchQuery} />
      </header>

      <main>
        <MovieList searchQuery={searchQuery} />
        <ConditionalMovieDetails searchQuery={searchQuery} />
      </main>
    </Router>
  );
};

// Composant pour gérer l'affichage conditionnel de MovieDetails
const ConditionalMovieDetails = ({ searchQuery }) => {
  const location = useLocation();
  const isMovieSelected = location.pathname.startsWith("/movie/");

  if (!searchQuery || !isMovieSelected) return null; // On masque MovieDetails si aucune recherche

  return (
    <Routes>
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;
