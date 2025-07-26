export interface Movie {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: Torrent[];
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface MovieResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movie[];
  };
}

export interface MovieDetailsResponse {
  status: string;
  status_message: string;
  data: {
    movie: Movie;
  };
}

export interface MovieSuggestionsResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    movies: Movie[];
  };
}

export interface SearchParams {
  limit?: number;
  page?: number;
  quality?: string;
  minimum_rating?: number;
  query_term?: string;
  genre?: string;
  sort_by?: string;
  order_by?: string;
  with_rt_ratings?: boolean;
}

export interface Cast {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
}
