import React, { useEffect, useReducer } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  NewReleases,
  Star,
  MovieFilter,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MovieGrid } from "../components/movie/MovieGrid";
import { movieActions, movieReducer, initialMovieState } from "../actions";
import { SearchParams } from "../types/movie.types";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [trendingState, trendingDispatch] = useReducer(
    movieReducer,
    initialMovieState
  );
  const [latestState, latestDispatch] = useReducer(
    movieReducer,
    initialMovieState
  );
  const [ratedState, ratedDispatch] = useReducer(
    movieReducer,
    initialMovieState
  );

  useEffect(() => {
    // Fetch trending movies
    const trendingParams: SearchParams = {
      limit: 8,
      sort_by: "download_count",
      order_by: "desc",
    };
    movieActions.fetchMovies(trendingDispatch, trendingParams);

    // Fetch latest movies
    const latestParams: SearchParams = {
      limit: 8,
      sort_by: "date_added",
      order_by: "desc",
    };
    movieActions.fetchMovies(latestDispatch, latestParams);

    // Fetch top rated movies
    const ratedParams: SearchParams = {
      limit: 8,
      sort_by: "rating",
      order_by: "desc",
      minimum_rating: 7,
    };
    movieActions.fetchMovies(ratedDispatch, ratedParams);
  }, []);

  const handleRetryTrending = () => {
    movieActions.fetchMovies(trendingDispatch, {
      limit: 8,
      sort_by: "download_count",
      order_by: "desc",
    });
  };

  const handleRetryLatest = () => {
    movieActions.fetchMovies(latestDispatch, {
      limit: 8,
      sort_by: "date_added",
      order_by: "desc",
    });
  };

  const handleRetryRated = () => {
    movieActions.fetchMovies(ratedDispatch, {
      limit: 8,
      sort_by: "rating",
      order_by: "desc",
      minimum_rating: 7,
    });
  };

  const categories = [
    { title: "Action", icon: "🎬", path: "/browse?genre=Action" },
    { title: "Comedy", icon: "😄", path: "/browse?genre=Comedy" },
    { title: "Drama", icon: "🎭", path: "/browse?genre=Drama" },
    { title: "Horror", icon: "👻", path: "/browse?genre=Horror" },
    { title: "Sci-Fi", icon: "🚀", path: "/browse?genre=Sci-Fi" },
    { title: "Thriller", icon: "😱", path: "/browse?genre=Thriller" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#1a1a1a",
          color: "white",
          py: 6,
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                lineHeight: 1.2,
                mb: 3,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Download YTS YIFY movies: HD smallest size
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#bdbdbd",
                mb: 4,
                fontWeight: 400,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                lineHeight: 1.6,
                maxWidth: "700px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Welcome to the official YTS.MX website. Here you can browse and
              download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D
              quality, all at the smallest file size. YTS Movies Torrents.
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                py: 1.5,
                bgcolor: "rgba(0, 191, 255, 0.08)",
                border: "1px solid rgba(0, 191, 255, 0.2)",
                borderRadius: 3,
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 12px rgba(0, 191, 255, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#00bfff",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Important
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#bdbdbd",
                  fontWeight: 400,
                  fontSize: "0.8rem",
                }}
              >
                - YTSMX is the only new official domain for YIFY Movies
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Trending Movies */}
        <Box mb={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <TrendingUp color="primary" />
              <Typography variant="h4" fontWeight="bold">
                Trending Movies
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/trending")}
              endIcon={<MovieFilter />}
            >
              View All
            </Button>
          </Box>
          <MovieGrid
            movies={trendingState.movies}
            loading={trendingState.loading}
            error={trendingState.error}
            onRetry={handleRetryTrending}
          />
        </Box>

        {/* Latest Movies */}
        <Box mb={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <NewReleases color="primary" />
              <Typography variant="h4" fontWeight="bold">
                Latest Movies
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/browse?sort_by=date_added")}
              endIcon={<MovieFilter />}
            >
              View All
            </Button>
          </Box>
          <MovieGrid
            movies={latestState.movies}
            loading={latestState.loading}
            error={latestState.error}
            onRetry={handleRetryLatest}
          />
        </Box>

        {/* Top Rated Movies */}
        <Box mb={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Star color="primary" />
              <Typography variant="h4" fontWeight="bold">
                Top Rated Movies
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() =>
                navigate("/browse?sort_by=rating&minimum_rating=7")
              }
              endIcon={<MovieFilter />}
            >
              View All
            </Button>
          </Box>
          <MovieGrid
            movies={ratedState.movies}
            loading={ratedState.loading}
            error={ratedState.error}
            onRetry={handleRetryRated}
          />
        </Box>
      </Container>
    </Box>
  );
};
