import React, { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ArrowBack, Home, Movie } from "@mui/icons-material";
import { MovieDetails } from "../components/movie/MovieDetails";
import { MovieSuggestions } from "../components/movie/MovieSuggestions";
import { Loading } from "../components/common/Loading";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { movieActions, movieReducer, initialMovieState } from "../actions";

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const movieId = id ? parseInt(id, 10) : 0;

  useEffect(() => {
    if (movieId) {
      movieActions.fetchMovieDetails(dispatch, movieId, true, true);
    }
  }, [movieId]);

  const handleRetry = () => {
    if (movieId) {
      movieActions.fetchMovieDetails(dispatch, movieId, true, true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (state.loading) {
    return <Loading message="Loading movie details..." />;
  }

  if (state.error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorMessage error={state.error} onRetry={handleRetry} />
      </Container>
    );
  }

  if (!state.currentMovie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorMessage error="Movie not found" />
      </Container>
    );
  }

  return (
    <Box>
      {/* Navigation */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton onClick={handleBack} size="large">
            <ArrowBack />
          </IconButton>

          <Breadcrumbs>
            <Link
              color="inherit"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Home fontSize="small" />
              Home
            </Link>
            <Link
              color="inherit"
              href="/browse"
              onClick={(e) => {
                e.preventDefault();
                navigate("/browse");
              }}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Movie fontSize="small" />
              Movies
            </Link>
            <Typography color="text.primary">
              {state.currentMovie.title}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Container>

      {/* Movie Details */}
      <MovieDetails movie={state.currentMovie} />

      {/* Movie Suggestions */}
      <MovieSuggestions movieId={movieId} />
    </Box>
  );
};
