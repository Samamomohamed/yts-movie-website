export const MOVIE_QUALITIES = [
  { value: "All", label: "All Qualities" },
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
  { value: "1080p.x265", label: "1080p x265" },
  { value: "2160p", label: "4K" },
  { value: "3D", label: "3D" },
];

export const MOVIE_GENRES = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

export const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "year", label: "Year" },
  { value: "rating", label: "Rating" },
  { value: "peers", label: "Peers" },
  { value: "seeds", label: "Seeds" },
  { value: "download_count", label: "Downloads" },
  { value: "like_count", label: "Likes" },
  { value: "date_added", label: "Date Added" },
];

export const ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export const MINIMUM_RATINGS = [
  { value: 0, label: "All Ratings" },
  { value: 1, label: "1+ Stars" },
  { value: 2, label: "2+ Stars" },
  { value: 3, label: "3+ Stars" },
  { value: 4, label: "4+ Stars" },
  { value: 5, label: "5+ Stars" },
  { value: 6, label: "6+ Stars" },
  { value: 7, label: "7+ Stars" },
  { value: 8, label: "8+ Stars" },
  { value: 9, label: "9+ Stars" },
];

export const DEFAULT_SEARCH_PARAMS = {
  limit: 20,
  page: 1,
  quality: "All",
  minimum_rating: 0,
  genre: "All",
  sort_by: "date_added",
  order_by: "desc",
  with_rt_ratings: false,
};
