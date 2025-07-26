import { apiClient } from "./apiClient";
import {
  MovieResponse,
  MovieDetailsResponse,
  MovieSuggestionsResponse,
  SearchParams,
} from "../types/movie.types";

export const movieRequests = {
  // List movies with filters
  getMovies: async (params: SearchParams = {}): Promise<MovieResponse> => {
    const response = await apiClient.get("/list_movies.json", { params });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (
    movieId: number,
    withImages: boolean = false,
    withCast: boolean = false
  ): Promise<MovieDetailsResponse> => {
    const params = {
      movie_id: movieId,
      with_images: withImages,
      with_cast: withCast,
    };
    const response = await apiClient.get("/movie_details.json", { params });
    return response.data;
  },

  // Get movie suggestions
  getMovieSuggestions: async (
    movieId: number
  ): Promise<MovieSuggestionsResponse> => {
    const response = await apiClient.get("/movie_suggestions.json", {
      params: { movie_id: movieId },
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (
    query: string,
    params: Omit<SearchParams, "query_term"> = {}
  ): Promise<MovieResponse> => {
    return movieRequests.getMovies({ ...params, query_term: query });
  },

  // Get movies by quality
  getMoviesByQuality: async (
    quality: string,
    params: SearchParams = {}
  ): Promise<MovieResponse> => {
    return movieRequests.getMovies({ ...params, quality });
  },

  // Get movies by genre
  getMoviesByGenre: async (
    genre: string,
    params: SearchParams = {}
  ): Promise<MovieResponse> => {
    return movieRequests.getMovies({ ...params, genre });
  },

  // Get trending movies (sorted by date_added)
  getTrendingMovies: async (
    params: SearchParams = {}
  ): Promise<MovieResponse> => {
    return movieRequests.getMovies({
      ...params,
      sort_by: "date_added",
      order_by: "desc",
    });
  },
};
