import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import { Movie } from "../../types/movie.types";
import { MovieCard } from "./MovieCard";
import { Loading } from "../common/Loading";
import { ErrorMessage } from "../common/ErrorMessage";
import "./movie.css";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  if (loading) {
    return <Loading message="Loading movies..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={onRetry} />;
  }

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <Box className="movie-grid-empty">
        <Box className="movie-grid-empty-content">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No movies found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Container className="movie-grid-container">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className="movie-grid"
      >
        {movies.map((movie) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
            key={movie.id}
            className="movie-grid-item"
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
