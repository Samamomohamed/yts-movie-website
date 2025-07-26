import React, { useEffect, useReducer, useState } from "react";
import { Container, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import { TrendingUp, DateRange, Download, ThumbUp } from "@mui/icons-material";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Pagination } from "../components/common/Pagination";
import { movieActions, movieReducer, initialMovieState } from "../actions";
import { SearchParams } from "../types/movie.types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const TrendingPage: React.FC = () => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const trendingOptions = [
    {
      label: "This Week",
      icon: <DateRange />,
      params: { sort_by: "date_added", order_by: "desc" },
    },
    {
      label: "Most Downloaded",
      icon: <Download />,
      params: { sort_by: "download_count", order_by: "desc" },
    },
    {
      label: "Most Liked",
      icon: <ThumbUp />,
      params: { sort_by: "like_count", order_by: "desc" },
    },
    {
      label: "Trending",
      icon: <TrendingUp />,
      params: { sort_by: "peers", order_by: "desc" },
    },
  ];

  useEffect(() => {
    const fetchParams: SearchParams = {
      ...trendingOptions[currentTab].params,
      page: currentPage,
      limit: 20,
    };

    movieActions.fetchMovies(dispatch, fetchParams);
  }, [currentTab, currentPage]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    const fetchParams: SearchParams = {
      ...trendingOptions[currentTab].params,
      page: currentPage,
      limit: 20,
    };

    movieActions.fetchMovies(dispatch, fetchParams);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Trending Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover what's popular right now
        </Typography>
      </Box>

      {/* Trending Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {trendingOptions.map((option, index) => (
            <Tab
              key={index}
              label={option.label}
              icon={option.icon}
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          ))}
        </Tabs>

        {trendingOptions.map((_, index) => (
          <TabPanel key={index} value={currentTab} index={index}>
            <Box p={3}>
              <MovieGrid
                movies={state.movies}
                loading={state.loading}
                error={state.error}
                onRetry={handleRetry}
              />
            </Box>
          </TabPanel>
        ))}
      </Paper>

      {/* Pagination */}
      {state.totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCount={state.totalCount}
          limit={state.limit}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};
