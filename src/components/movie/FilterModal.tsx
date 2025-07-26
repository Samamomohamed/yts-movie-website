import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Rating,
  IconButton,
  Backdrop,
} from "@mui/material";
import {
  Close,
  Search,
  FilterList,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { SearchParams } from "../../types/movie.types";
import { MINIMUM_RATINGS } from "../../utils/constants";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  currentParams: SearchParams;
  onSearch: (query: string) => void;
  onQualityChange: (quality: string) => void;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort_by: string) => void;
  onOrderChange: (order_by: string) => void;
  onRatingChange: (event: Event, value: number | number[]) => void;
  onRTRatingsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
}

const qualityOptions = ["All", "720p", "1080p", "2160p", "3D"];

const genreOptions = [
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

const sortOptions = [
  { value: "date_added", label: "Date Added" },
  { value: "year", label: "Year" },
  { value: "title", label: "Title" },
  { value: "rating", label: "Rating" },
  { value: "peers", label: "Peers" },
  { value: "seeds", label: "Seeds" },
  { value: "download_count", label: "Download Count" },
  { value: "like_count", label: "Like Count" },
];

const orderOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  currentParams,
  onSearch,
  onQualityChange,
  onGenreChange,
  onSortChange,
  onOrderChange,
  onRatingChange,
  onRTRatingsChange,
  onClearFilters,
}) => {
  const [searchQuery, setSearchQuery] = React.useState(
    currentParams.query_term || ""
  );
  const [rating, setRating] = React.useState(currentParams.minimum_rating || 0);

  // Sync state with current params when modal opens
  React.useEffect(() => {
    if (open) {
      setSearchQuery(currentParams.query_term || "");
      setRating(currentParams.minimum_rating || 0);
    }
  }, [open, currentParams.query_term, currentParams.minimum_rating]);

  const handleSearchSubmit = () => {
    // Apply search if there's a query
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
    onClose();
  };

  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    const newRating = value || 0;
    setRating(newRating);
    onRatingChange(event as unknown as Event, newRating);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "rgba(26, 26, 26, 0.97)",
          borderRadius: 4,
          border: "1px solid rgba(0, 230, 0, 0.08)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(16px)",
          position: "relative",
          overflow: "hidden",
          p: { xs: 1, sm: 2 },
          minHeight: 0,
          maxHeight: "90vh",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 1,
          pt: 3,
          position: "relative",
          minHeight: 0,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 6,
            top: 6,
            color: "#888",
            bgcolor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.10)" },
            p: 0.3,
          }}
        >
          <Close />
        </IconButton>
        {/* Header */}
        <Box textAlign="center" mb={1}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.5,
              py: 0.2,
              bgcolor: "rgba(0, 230, 0, 0.08)",
              border: "1px solid rgba(0, 230, 0, 0.15)",
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#00e600",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#00e600",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: 0.3,
              }}
            >
              FILTER MOVIES
            </Typography>
          </Box>
        </Box>
        {/* Search Input */}
        <Box mb={0.7}>
          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 0.2,
              fontWeight: 500,
              fontSize: "0.85rem",
            }}
          >
            Search
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter movie title, actor, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(42, 42, 42, 0.9)",
                borderColor: "rgba(68, 68, 68, 0.3)",
                color: "#fff",
                borderRadius: 1.2,
                minHeight: 32,
                fontSize: "0.92rem",
                "& fieldset": {
                  borderColor: "rgba(68, 68, 68, 0.3)",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                  borderWidth: "1.2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#888",
                  borderWidth: "1.2px",
                  boxShadow: "none",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "0.92rem",
                "&::placeholder": { color: "#888", opacity: 1 },
              },
            }}
          />
        </Box>
        {/* Quality Filter */}
        <Box mb={0.7}>
          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 0.2,
              fontWeight: 500,
              fontSize: "0.85rem",
            }}
          >
            Quality
          </Typography>
          <FormControl fullWidth>
            <Select
              value={currentParams.quality || "All"}
              onChange={(e) => {
                onQualityChange(e.target.value);
              }}
              displayEmpty
              sx={{
                bgcolor: "rgba(42, 42, 42, 0.9)",
                color: "#fff",
                borderRadius: 1.2,
                minHeight: 32,
                fontSize: "0.92rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(68, 68, 68, 0.3)",
                  borderWidth: "1px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666",
                  borderWidth: "1.2px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                  borderWidth: "1.2px",
                  boxShadow: "none",
                },
                "& .MuiSelect-icon": { color: "#bbb" },
              }}
            >
              {qualityOptions.map((quality) => (
                <MenuItem
                  key={quality}
                  value={quality}
                  sx={{ color: "#fff", fontSize: "0.92rem" }}
                >
                  {quality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Genre Filter */}
        <Box mb={0.7}>
          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 0.2,
              fontWeight: 500,
              fontSize: "0.85rem",
            }}
          >
            Genres
          </Typography>
          <FormControl fullWidth>
            <Select
              value={currentParams.genre || "All"}
              onChange={(e) => {
                onGenreChange(e.target.value);
              }}
              displayEmpty
              sx={{
                bgcolor: "rgba(42, 42, 42, 0.9)",
                color: "#fff",
                borderRadius: 1.2,
                minHeight: 32,
                fontSize: "0.92rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(68, 68, 68, 0.3)",
                  borderWidth: "1px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666",
                  borderWidth: "1.2px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                  borderWidth: "1.2px",
                  boxShadow: "none",
                },
                "& .MuiSelect-icon": { color: "#bbb" },
              }}
            >
              {genreOptions.map((genre) => (
                <MenuItem
                  key={genre}
                  value={genre}
                  sx={{ color: "#fff", fontSize: "0.92rem" }}
                >
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Rating Section */}
        <Box mb={0.7}>
          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 0.2,
              fontWeight: 500,
              fontSize: "0.85rem",
            }}
          >
            Minimum IMDb Rating
          </Typography>
          <Box
            sx={{
              bgcolor: "rgba(42, 42, 42, 0.9)",
              borderRadius: 1.2,
              p: 0.5,
              border: "1px solid rgba(68, 68, 68, 0.3)",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Rating
                value={rating}
                onChange={handleRatingChange}
                max={10}
                size="small"
                sx={{
                  fontSize: "1.1rem",
                  "& .MuiRating-iconFilled": { color: "#ffd700" },
                  "& .MuiRating-iconHover": {
                    color: "#ffd700",
                    transform: "scale(1.05)",
                  },
                  "& .MuiRating-iconEmpty": { color: "rgba(255, 215, 0, 0.3)" },
                }}
              />
              <Box
                sx={{
                  px: 0.7,
                  py: 0.1,
                  bgcolor: "rgba(255, 215, 0, 0.08)",
                  borderRadius: 1,
                  border: "1px solid rgba(255, 215, 0, 0.18)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ffd700",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {rating}/10
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Sort Options */}
        <Box mb={0.7}>
          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 0.2,
              fontWeight: 500,
              fontSize: "0.85rem",
            }}
          >
            Sort Options
          </Typography>
          <Box display="flex" gap={0.7}>
            <FormControl sx={{ flex: 1 }}>
              <Select
                value={currentParams.sort_by || "date_added"}
                onChange={(e) => {
                  onSortChange(e.target.value);
                }}
                startAdornment={<FilterList sx={{ color: "#bbb", mr: 1 }} />}
                displayEmpty
                sx={{
                  bgcolor: "rgba(42, 42, 42, 0.9)",
                  color: "#fff",
                  borderRadius: 1.2,
                  minHeight: 32,
                  fontSize: "0.92rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(68, 68, 68, 0.3)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#666",
                    borderWidth: "1.2px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888",
                    borderWidth: "1.2px",
                    boxShadow: "none",
                  },
                  "& .MuiSelect-icon": { color: "#bbb" },
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ color: "#fff", fontSize: "0.92rem" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <Select
                value={currentParams.order_by || "desc"}
                onChange={(e) => {
                  onOrderChange(e.target.value);
                }}
                displayEmpty
                sx={{
                  bgcolor: "rgba(42, 42, 42, 0.9)",
                  color: "#fff",
                  borderRadius: 1.2,
                  minHeight: 32,
                  fontSize: "0.92rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(68, 68, 68, 0.3)",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#666",
                    borderWidth: "1.2px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888",
                    borderWidth: "1.2px",
                    boxShadow: "none",
                  },
                  "& .MuiSelect-icon": { color: "#bbb" },
                }}
              >
                {orderOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ color: "#fff", fontSize: "0.92rem" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* Search Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearchSubmit}
          sx={{
            bgcolor: "#00e600",
            color: "#fff",
            py: 1,
            fontSize: "0.95rem",
            fontWeight: 600,
            textTransform: "uppercase",
            borderRadius: 1.2,
            letterSpacing: 0.5,
            mt: 1.2,
            boxShadow: "0 2px 8px rgba(0,230,0,0.08)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#00cc00",
              boxShadow: "0 4px 16px rgba(0,230,0,0.15)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Search Movies
        </Button>
      </DialogContent>
    </Dialog>
  );
};
