import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Rating,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  PlayArrow,
  Download,
  Share,
  Favorite,
  FavoriteBorder,
  Star,
  AccessTime,
  Language,
  DateRange,
  CloudDownload,
} from "@mui/icons-material";
import { Movie } from "../../types/movie.types";

interface MovieDetailsProps {
  movie: Movie;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [selectedTorrent, setSelectedTorrent] = React.useState(0);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Movie Poster */}
        <Box
          component="img"
          src={movie.large_cover_image}
          alt={movie.title}
          sx={{
            width: { xs: "100%", md: 320 },
            height: { xs: "auto", md: 480 },
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: 4,
            mb: { xs: 3, md: 0 },
          }}
        />

        {/* Movie Information */}
        <Box flex={1} minWidth={0}>
          {/* Title and Rating */}
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            mb={1}
            flexWrap="wrap"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: "#fff", mb: 0.5, lineHeight: 1.1 }}
              >
                {movie.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#bdbdbd", mb: 1 }}>
                {movie.title_english !== movie.title && movie.title_english}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Rating
                  value={movie.rating / 2}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ fontSize: 22 }}
                />
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#ffd700" }}
                >
                  {movie.rating}/10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  IMDb
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1} mt={{ xs: 1, md: 0 }}>
              <IconButton
                onClick={handleFavoriteToggle}
                color="secondary"
                size="small"
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton onClick={handleShare} size="small">
                <Share />
              </IconButton>
            </Box>
          </Box>

          {/* Meta Info */}
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <DateRange color="action" fontSize="small" />
              <Typography variant="body2">{movie.year}</Typography>
            </Box>
            {movie.runtime > 0 && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTime color="action" fontSize="small" />
                <Typography variant="body2">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Typography>
              </Box>
            )}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Language color="action" fontSize="small" />
              <Typography variant="body2">
                {movie.language || "English"}
              </Typography>
            </Box>
            {movie.mpa_rating && (
              <Chip
                label={movie.mpa_rating}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>

          {/* Genres */}
          <Box mb={2}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  sx={{
                    bgcolor: "#00e600",
                    color: "#000",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#00ff00",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Synopsis */}
          <Box mb={2}>
            <Typography
              variant="body2"
              sx={{ color: "#bdbdbd", mb: 0.5, fontWeight: 500 }}
            >
              {movie.description_full || movie.summary}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" flexWrap="wrap" gap={1.5} mb={2}>
            {movie.yt_trailer_code && (
              <Button
                variant="contained"
                size="small"
                startIcon={<PlayArrow />}
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`,
                    "_blank"
                  )
                }
                sx={{
                  fontWeight: 600,
                  bgcolor: "#00e600",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "#00ff00",
                  },
                }}
              >
                Trailer
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<Download />}
              href={movie.url}
              target="_blank"
              sx={{
                fontWeight: 600,
                borderColor: "#00e600",
                color: "#00e600",
                "&:hover": {
                  borderColor: "#00ff00",
                  color: "#00ff00",
                  bgcolor: "rgba(0, 230, 0, 0.05)",
                },
              }}
            >
              View on YTS
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Download Options */}
      {movie.torrents && movie.torrents.length > 0 && (
        <Box mt={6}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={700}
            sx={{ color: "#00e600", mb: 4, fontSize: "1.5rem" }}
          >
            Tech specs
          </Typography>

          {/* Quality Tabs */}
          <Box
            display="flex"
            gap={0.5}
            mb={4}
            flexWrap="wrap"
            sx={{ borderBottom: "1px solid #333" }}
          >
            {movie.torrents.map((torrent, index) => (
              <Button
                key={index}
                variant="text"
                sx={{
                  color: "#888",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 2.5,
                  py: 1.5,
                  borderRadius: 0,
                  textTransform: "none",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "transparent",
                  },
                  "&.selected": {
                    color: "#00e600",
                    borderBottom: "2px solid #00e600",
                    bgcolor: "transparent",
                  },
                }}
                className={selectedTorrent === index ? "selected" : ""}
                onClick={() => setSelectedTorrent(index)}
              >
                {torrent.quality}.{torrent.type.toUpperCase()}
              </Button>
            ))}
          </Box>

          {/* Selected Download Details */}
          {movie.torrents[selectedTorrent] && (
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                borderRadius: 2,
                border: "1px solid #2a2a2a",
                p: 3.5,
                width: "100%",
              }}
            >
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                gap={4}
                alignItems="center"
              >
                {/* File Size */}
                <Box textAlign="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                    mb={2.5}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#00e600",
                        borderRadius: 0.5,
                        boxShadow: "0 0 8px rgba(0, 230, 0, 0.3)",
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#fff", fontSize: "1.1rem" }}
                    >
                      {movie.torrents[selectedTorrent].size}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<CloudDownload />}
                    fullWidth
                    sx={{
                      bgcolor: "#00e600",
                      color: "#000",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      borderRadius: 1.5,
                      py: 1.2,
                      textTransform: "none",
                      boxShadow: "0 2px 8px rgba(0, 230, 0, 0.2)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#00ff00",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 230, 0, 0.3)",
                      },
                    }}
                    onClick={() =>
                      window.open(movie.torrents[selectedTorrent].url, "_blank")
                    }
                  >
                    Download
                  </Button>
                </Box>

                {/* Quality */}
                <Box textAlign="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                    mb={2.5}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: "#00e600",
                        borderRadius: 0.5,
                        boxShadow: "0 0 6px rgba(0, 230, 0, 0.3)",
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#fff", fontSize: "1.1rem" }}
                    >
                      {movie.torrents[selectedTorrent].quality}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#bdbdbd", fontSize: "0.9rem" }}
                  >
                    {movie.torrents[selectedTorrent].seeds} seeds
                  </Typography>
                </Box>

                {/* Source */}
                <Box textAlign="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                    mb={2.5}
                  >
                    <Box
                      sx={{
                        width: 11,
                        height: 11,
                        bgcolor: "#00e600",
                        borderRadius: 0.5,
                        boxShadow: "0 0 7px rgba(0, 230, 0, 0.3)",
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#fff", fontSize: "1.1rem" }}
                    >
                      {movie.torrents[selectedTorrent].type}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#bdbdbd", fontSize: "0.9rem" }}
                  >
                    {movie.torrents[selectedTorrent].peers} peers
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};
