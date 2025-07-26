import React, { useEffect, useReducer, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Button,
  Collapse,
  IconButton,
  Card,
  CardContent,
  InputBase,
} from "@mui/material";
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Clear,
  Search as SearchIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Pagination } from "../components/common/Pagination";
import { SearchBar } from "../components/movie/SearchBar";
import { QualityFilter } from "../components/filters/QualityFilter";
import { GenreFilter } from "../components/filters/GenreFilter";
import { SortFilter } from "../components/filters/SortFilter";
import { FilterModal } from "../components/movie/FilterModal";
import { movieActions, movieReducer, initialMovieState } from "../actions";
import { SearchParams } from "../types/movie.types";
import { DEFAULT_SEARCH_PARAMS, MINIMUM_RATINGS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const BrowseMoviesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);
  const [showFilters, setShowFilters] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Parse URL parameters
  const getSearchParamsFromUrl = (): SearchParams => {
    return {
      limit: parseInt(searchParams.get("limit") || "20", 10),
      page: parseInt(searchParams.get("page") || "1", 10),
      quality: searchParams.get("quality") || "All",
      minimum_rating: parseInt(searchParams.get("minimum_rating") || "0", 10),
      query_term:
        searchParams.get("query_term") || searchParams.get("search") || "",
      genre: searchParams.get("genre") || "All",
      sort_by: searchParams.get("sort_by") || "date_added",
      order_by: searchParams.get("order_by") || "desc",
      with_rt_ratings: searchParams.get("with_rt_ratings") === "true",
    };
  };

  const currentParams = getSearchParamsFromUrl();

  // Sync search query with current params
  React.useEffect(() => {
    setSearchQuery(currentParams.query_term || "");
  }, [currentParams.query_term]);

  // Update URL with new parameters
  const updateSearchParams = useCallback(
    (newParams: Partial<SearchParams>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "page" && value === 1) {
            params.delete(key);
          } else if (
            (key === "quality" || key === "genre") &&
            value === "All"
          ) {
            params.delete(key);
          } else if (key === "minimum_rating" && value === 0) {
            params.delete(key);
          } else {
            params.set(key, value.toString());
          }
        } else {
          params.delete(key);
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  // Fetch movies when parameters change
  useEffect(() => {
    const fetchParams = { ...currentParams };

    // Clean up parameters for API
    if (fetchParams.quality === "All") delete fetchParams.quality;
    if (fetchParams.genre === "All") delete fetchParams.genre;
    if (fetchParams.minimum_rating === 0) delete fetchParams.minimum_rating;
    if (!fetchParams.query_term) delete fetchParams.query_term;

    movieActions.fetchMovies(dispatch, fetchParams);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    updateSearchParams({ query_term: query, page: 1 });
  };

  const handleQualityChange = (quality: string) => {
    updateSearchParams({ quality, page: 1 });
  };

  const handleGenreChange = (genre: string) => {
    updateSearchParams({ genre, page: 1 });
  };

  const handleSortChange = (sort_by: string) => {
    updateSearchParams({ sort_by, page: 1 });
  };

  const handleOrderChange = (order_by: string) => {
    updateSearchParams({ order_by, page: 1 });
  };

  const handleRatingChange = (_: Event, value: number | number[]) => {
    updateSearchParams({ minimum_rating: value as number, page: 1 });
  };

  const handleRTRatingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateSearchParams({ with_rt_ratings: event.target.checked, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handleRetry = () => {
    const fetchParams = { ...currentParams };
    if (fetchParams.quality === "All") delete fetchParams.quality;
    if (fetchParams.genre === "All") delete fetchParams.genre;
    if (fetchParams.minimum_rating === 0) delete fetchParams.minimum_rating;
    if (!fetchParams.query_term) delete fetchParams.query_term;

    movieActions.fetchMovies(dispatch, fetchParams);
  };

  const hasActiveFilters =
    currentParams.quality !== "All" ||
    currentParams.genre !== "All" ||
    (currentParams.minimum_rating ?? 0) > 0 ||
    currentParams.query_term ||
    currentParams.with_rt_ratings;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Browse Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and download high-quality movies
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            onClick={() => setShowFilterModal(true)}
            variant="outlined"
            sx={{
              borderColor: "#00e600",
              color: "#fff",
              fontWeight: 600,
              px: 2,
              py: 0.7,
              borderRadius: 1.5,
              fontSize: 15,
              letterSpacing: 0.3,
              minWidth: 120,
              height: 40,
              "&:hover": {
                borderColor: "#00e600",
                bgcolor: "rgba(0,230,0,0.07)",
              },
            }}
          >
            Filters
          </Button>
          {hasActiveFilters && (
            <Button
              startIcon={<Clear />}
              onClick={handleClearFilters}
              color="secondary"
              variant="outlined"
              sx={{
                borderColor: "#888",
                color: "#fff",
                fontWeight: 500,
                px: 2,
                py: 0.7,
                borderRadius: 1.5,
                fontSize: 15,
                minWidth: 120,
                height: 40,
                "&:hover": {
                  borderColor: "#888",
                  bgcolor: "rgba(255,255,255,0.04)",
                },
              }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
        {/* Filter Modal */}
        <FilterModal
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentParams={currentParams}
          onSearch={handleSearch}
          onQualityChange={handleQualityChange}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
          onRatingChange={handleRatingChange}
          onRTRatingsChange={handleRTRatingsChange}
          onClearFilters={handleClearFilters}
        />
      </Box>

      {/* Results */}
      <Box mb={4}>
        {state.totalCount > 0 && (
          <Typography variant="h6" gutterBottom>
            {state.totalCount.toLocaleString()} movies found
          </Typography>
        )}

        <MovieGrid
          movies={state.movies}
          loading={state.loading}
          error={state.error}
          onRetry={handleRetry}
        />
      </Box>

      {/* Pagination */}
      {state.totalCount > 0 && (
        <Pagination
          currentPage={state.currentPage}
          totalCount={state.totalCount}
          limit={state.limit}
          onPageChange={handlePageChange}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        currentParams={currentParams}
        onSearch={handleSearch}
        onQualityChange={handleQualityChange}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        onRatingChange={handleRatingChange}
        onRTRatingsChange={handleRTRatingsChange}
        onClearFilters={handleClearFilters}
      />
    </Container>
  );
};

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  // Full genre list with icons and descriptions
  const genres = [
    {
      title: "Action",
      icon: "🎬",
      desc: "High-octane movies with fights, chases, and explosions.",
    },
    {
      title: "Adventure",
      icon: "🗺️",
      desc: "Epic journeys, quests, and exploration.",
    },
    { title: "Animation", icon: "🐭", desc: "Animated films for all ages." },
    {
      title: "Biography",
      icon: "📖",
      desc: "True stories of remarkable people.",
    },
    {
      title: "Comedy",
      icon: "😂",
      desc: "Laugh-out-loud movies and feel-good fun.",
    },
    {
      title: "Crime",
      icon: "🕵️‍♂️",
      desc: "Heists, mysteries, and criminal intrigue.",
    },
    {
      title: "Documentary",
      icon: "🎥",
      desc: "Real stories, real people, real life.",
    },
    {
      title: "Drama",
      icon: "🎭",
      desc: "Emotional, powerful, and thought-provoking stories.",
    },
    { title: "Family", icon: "👨‍👩‍👧‍👦", desc: "Movies for everyone in the family." },
    {
      title: "Fantasy",
      icon: "🧙‍♂️",
      desc: "Magic, mythical creatures, and other worlds.",
    },
    { title: "Film-Noir", icon: "🌃", desc: "Dark, stylish crime dramas." },
    {
      title: "History",
      icon: "🏺",
      desc: "Stories from the past brought to life.",
    },
    {
      title: "Horror",
      icon: "👻",
      desc: "Scary movies to keep you up at night.",
    },
    {
      title: "Music",
      icon: "🎵",
      desc: "Musical journeys and stories about music.",
    },
    {
      title: "Musical",
      icon: "🎤",
      desc: "Singing, dancing, and musical numbers.",
    },
    { title: "Mystery", icon: "🕵️‍♀️", desc: "Whodunits and puzzling tales." },
    {
      title: "Romance",
      icon: "💖",
      desc: "Love stories and romantic adventures.",
    },
    {
      title: "Sci-Fi",
      icon: "🚀",
      desc: "Futuristic worlds, technology, and space travel.",
    },
    {
      title: "Sport",
      icon: "🏆",
      desc: "Athletic competition and inspiring stories.",
    },
    {
      title: "Thriller",
      icon: "😱",
      desc: "Edge-of-your-seat suspense and excitement.",
    },
    {
      title: "War",
      icon: "⚔️",
      desc: "Stories of conflict, heroism, and survival.",
    },
    {
      title: "Western",
      icon: "🤠",
      desc: "Cowboys, outlaws, and the wild west.",
    },
  ];
  return (
    <Container maxWidth="xl">
      <Box mb={6} mt={6}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Browse by Genre
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {genres.map((genre) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              key={genre.title}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.22s, box-shadow 0.22s",
                  borderRadius: 3,
                  minWidth: 220,
                  maxWidth: 270,
                  width: "100%",
                  bgcolor: "#181818",
                  boxShadow: 2,
                  border: "1px solid #232323",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.03)",
                    boxShadow: 6,
                    borderColor: "#00e600",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 0,
                }}
                onClick={() =>
                  navigate(`/browse?genre=${encodeURIComponent(genre.title)}`)
                }
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    py: 3,
                    px: 2,
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <Box fontSize={48} mb={1}>
                    {genre.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={1}
                    sx={{ color: "#fff" }}
                  >
                    {genre.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#bdbdbd", minHeight: 44, mb: 2 }}
                  >
                    {genre.desc}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#00e600",
                      color: "#00e600",
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: "none",
                      px: 2.5,
                      py: 0.5,
                      fontSize: 14,
                      mt: 1,
                      "&:hover": {
                        bgcolor: "rgba(0,230,0,0.07)",
                        borderColor: "#00e600",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/browse?genre=${encodeURIComponent(genre.title)}`
                      );
                    }}
                  >
                    Browse
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
