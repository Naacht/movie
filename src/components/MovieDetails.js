import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
const MovieDetails = () => {
  const { id } = useParams(); // Récupèration l'id du film depuis l'URL
  const [movie, setMovie] = useState(null); // Etat pour stocker les détails du film
  const [error, setError] = useState(null); // Etat pour stocker les erreurs éventuelles

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const language = "fr";

        // Récupère les détails du film et les acteurs
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          { params: { api_key: apiKey, language: language } }
        );

        // Récupère les crédits du film (acteurs et réalisateur)
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          { params: { api_key: apiKey, language: language } }
        );

        // Met à jour les états avec les données récupérées
        setMovie({
          ...response.data,
          director: creditsResponse.data.crew.find((member) => member.job === "Director"),
          cast: creditsResponse.data.cast.slice(0, 5),
        });
      } catch (error) {
        setError("Erreur lors de la récupération des détails du film.");
      }
    };

    // Appelle la fonction fetchMovieDetails lors du montage du composant
    fetchMovieDetails();
  }, [id]);

  // Si aucun film n'est chargé ou une erreur s'est produite, affiche un message de chargement
  if (!movie) return <h2>Chargement...</h2>;
  if (error) return <p>{error}</p>;

  // Affiche les détails du film et les acteurs principaux sur une carte de film
  return (
    <div className="movie-details-container">
      <div className="movie-card">
        <h2 className="movie-title">
          {movie.title} ({new Date(movie.release_date).getFullYear()})
        </h2>
        <div className="movie-content">
          <div className="movie-image">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-info">
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
    </div>
  );
};

export default MovieDetails;
