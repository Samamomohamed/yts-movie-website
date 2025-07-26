import { movieRequests } from "../requests";
import { Movie, SearchParams } from "../types/movie.types";

export interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  suggestedMovies: Movie[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  limit: number;
}

export type MovieAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_MOVIES";
      payload: {
        movies: Movie[];
        totalCount: number;
        page: number;
        limit: number;
      };
    }
  | { type: "SET_CURRENT_MOVIE"; payload: Movie | null }
  | { type: "SET_SUGGESTED_MOVIES"; payload: Movie[] }
  | { type: "CLEAR_MOVIES" };

export const initialMovieState: MovieState = {
  movies: [],
  currentMovie: null,
  suggestedMovies: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  limit: 20,
};

export const movieReducer = (
  state: MovieState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload.movies,
        totalCount: action.payload.totalCount,
        currentPage: action.payload.page,
        limit: action.payload.limit,
        loading: false,
        error: null,
      };
    case "SET_CURRENT_MOVIE":
      return { ...state, currentMovie: action.payload, loading: false };
    case "SET_SUGGESTED_MOVIES":
      return { ...state, suggestedMovies: action.payload };
    case "CLEAR_MOVIES":
      return { ...state, movies: [], currentMovie: null, suggestedMovies: [] };
    default:
      return state;
  }
};

// Action creators
export const movieActions = {
  fetchMovies: async (
    dispatch: React.Dispatch<MovieAction>,
    params: SearchParams = {}
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const response = await movieRequests.getMovies(params);

      dispatch({
        type: "SET_MOVIES",
        payload: {
          movies: response.data.movies,
          totalCount: response.data.movie_count,
          page: response.data.page_number,
          limit: response.data.limit,
        },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to fetch movies",
      });
    }
  },

  fetchMovieDetails: async (
    dispatch: React.Dispatch<MovieAction>,
    movieId: number,
    withImages: boolean = true,
    withCast: boolean = true
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const response = await movieRequests.getMovieDetails(
        movieId,
        withImages,
        withCast
      );

      dispatch({ type: "SET_CURRENT_MOVIE", payload: response.data.movie });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to fetch movie details",
      });
    }
  },

  fetchMovieSuggestions: async (
    dispatch: React.Dispatch<MovieAction>,
    movieId: number
  ) => {
    try {
      const response = await movieRequests.getMovieSuggestions(movieId);
      dispatch({ type: "SET_SUGGESTED_MOVIES", payload: response.data.movies });
    } catch (error) {
      console.error("Failed to fetch movie suggestions:", error);
    }
  },

  searchMovies: async (
    dispatch: React.Dispatch<MovieAction>,
    query: string,
    params: SearchParams = {}
  ) => {
    return movieActions.fetchMovies(dispatch, { ...params, query_term: query });
  },

  clearMovies: (dispatch: React.Dispatch<MovieAction>) => {
    dispatch({ type: "CLEAR_MOVIES" });
  },
};
