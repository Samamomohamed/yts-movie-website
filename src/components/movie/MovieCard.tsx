import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
  Tooltip,
} from "@mui/material";
import {
  PlayArrow,
  Download,
  Star,
  AccessTime,
  DateRange,
} from "@mui/icons-material";
import { Movie } from "../../types/movie.types";
import { useNavigate } from "react-router-dom";
import "./movie.css";

interface MovieCardProps {
  movie: Movie;
  showDetails?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  showDetails = true,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle play action
    console.log("Play movie:", movie.title);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle download action
    console.log("Download movie:", movie.title);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "720p":
        return "primary";
      case "1080p":
        return "secondary";
      case "2160p":
      case "4K":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card className="movie-card" onClick={handleCardClick}>
      {/* Movie Poster */}
      <CardMedia
        component="img"
        image={movie.medium_cover_image}
        alt={movie.title}
        className="movie-poster"
      />

      {/* Hover Overlay */}
      <Box className="movie-hover-overlay">
        {/* Genres */}
        {movie.genres && (
          <Typography variant="subtitle2" className="movie-hover-genres">
            {movie.genres.join(", ")}
          </Typography>
        )}
        {/* Year and Runtime */}
        <Typography variant="h6" className="movie-hover-year">
          {movie.year}
        </Typography>
        {movie.runtime > 0 && (
          <Typography variant="body2" className="movie-hover-runtime">
            {movie.runtime} min
          </Typography>
        )}
        {/* Rating */}
        {movie.rating > 0 && (
          <Box className="movie-hover-rating">
            <Box component="span" className="movie-hover-star">
              ★
            </Box>
            <Typography variant="body1" className="movie-hover-rating-text">
              {movie.rating}
            </Typography>
          </Box>
        )}
        {/* IMDB Link */}
        {movie.imdb_code && (
          <Box className="movie-hover-imdb">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-hover-imdb-link"
              onClick={(e) => e.stopPropagation()}
            >
              VIEW ON IMDB
            </a>
          </Box>
        )}
      </Box>

      {/* Bottom Bar with Title and Year */}
      <Box className="movie-bottom-bar">
        <Typography variant="subtitle1" className="movie-title">
          {movie.title}
        </Typography>
        <Typography variant="subtitle2" className="movie-year">
          ({movie.year})
        </Typography>
      </Box>
    </Card>
  );
};
