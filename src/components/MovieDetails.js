import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = ({ selectedMovieId }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedMovieId) return;

    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const language = "fr";

        const [response, creditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${selectedMovieId}`, {
            params: { api_key: apiKey, language },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${selectedMovieId}/credits`, {
            params: { api_key: apiKey, language },
          }),
        ]);

        setMovie({
          ...response.data,
          director: creditsResponse.data.crew.find((member) => member.job === "Director"),
          cast: creditsResponse.data.cast.slice(0, 5),
        });
      } catch (error) {
        setError("Erreur lors de la récupération des détails du film.");
      }
    };

    fetchMovieDetails();
  }, [selectedMovieId]);

  if (!movie) return <h2>Chargement...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-details">
      <div className="movie-content">
        <div className="movie-image">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h2 className="movie-title">
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p><strong>🎬 Réalisateur :</strong> {movie.director ? movie.director.name : "Non disponible"}</p>
          <p><strong>🎭 Genre :</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p><strong>⭐ Note :</strong> {movie.vote_average} / 10</p>
          <p><strong>👥 Acteurs principaux :</strong></p>
          <ul>
            {movie.cast.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="movie-synopsis">
        <h3>📜 Synopsis :</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;