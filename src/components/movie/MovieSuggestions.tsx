import React, { useEffect, useReducer } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Movie } from "../../types/movie.types";
import { MovieCard } from "./MovieCard";
import { Loading } from "../common/Loading";
import { ErrorMessage } from "../common/ErrorMessage";
import { movieActions, movieReducer, initialMovieState } from "../../actions";
import "./movie.css";

interface MovieSuggestionsProps {
  movieId: number;
}

export const MovieSuggestions: React.FC<MovieSuggestionsProps> = ({
  movieId,
}) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  useEffect(() => {
    movieActions.fetchMovieSuggestions(dispatch, movieId);
  }, [movieId]);

  const handleRetry = () => {
    movieActions.fetchMovieSuggestions(dispatch, movieId);
  };

  if (state.loading) {
    return <Loading message="Loading suggestions..." />;
  }

  if (state.error) {
    return <ErrorMessage error={state.error} onRetry={handleRetry} />;
  }

  if (state.suggestedMovies.length === 0) {
    return null;
  }

  return (
    <Container className="movie-suggestions-container">
      <Typography variant="h4" gutterBottom className="movie-suggestions-title">
        You might also like
      </Typography>

      <Box className="movie-suggestions-grid">
        {state.suggestedMovies.map((movie) => (
          <Box key={movie.id} className="movie-suggestions-item">
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
