import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";

const MovieList = ({ searchQuery, setSelectedMovieId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const language = "fr";

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          { params: { api_key: apiKey, query: searchQuery, language } }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erreur API", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="movie-list-container">
      <h2>Liste des films</h2>
      {movies.length === 0 ? (
        <p>Aucun film trouvé.</p>
      ) : (
        <div className="movie-cards">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovieId(movie.id)} // Ajoute cette ligne pour gérer le clic
            >
              <div className="movie-card-image">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-genre">
                  {movie.genre_ids
                    .map((genreId) => {
                      // Convertir les IDs de genre en noms (exemple simplifié)
                      const genres = {
                        28: "Action",
                        12: "Adventure",
                        16: "Animation",
                        35: "Comedy",
                        80: "Crime",
                        99: "Documentary",
                        18: "Drama",
                        10751: "Family",
                        14: "Fantasy",
                        36: "History",
                        27: "Horror",
                        10402: "Music",
                        9648: "Mystery",
                        10749: "Romance",
                        878: "Science Fiction",
                        10770: "TV Movie",
                        53: "Thriller",
                        10752: "War",
                        37: "Western",
                      };
                      return genres[genreId];
                    })
                    .join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;