import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieList.css";

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]); // Stocker la liste des films

  // Effectué une requête à l'API The Movie Database pour récupérer la liste des films
  useEffect(() => {
    // Récupère la liste des films à partir de l'API The Movie Database
    const fetchMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const language = "fr";
      // Effectue la requête à l'API The Movie Database avec le mot-clé de recherche et la langue
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          { params: { api_key: apiKey, query: searchQuery, language } }
        );
        // Récupère la liste des films dans le state
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erreur API", error);
      }
    };
    // Appelle la fonction fetchMovies pour récupérer la liste des films
    fetchMovies();
  }, [searchQuery]);

  // Affiche la liste des films dans une liste HTML
  return (
    <div className="movie-list-container">
      <h2>Liste des films</h2>
      {movies.length === 0 ? (
        <p>Aucun film trouvé.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
