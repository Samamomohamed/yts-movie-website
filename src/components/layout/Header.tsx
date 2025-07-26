import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  InputBase,
  alpha,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { movieRequests } from "../../requests/movieRequests";
import { Movie } from "../../types/movie.types";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  // Fetch suggestions on input
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(!!value);
    setHighlighted(-1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!value) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await movieRequests.searchMovies(value, { limit: 6 });
        setSuggestions(res.data.movies || []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 250);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlighted((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && highlighted >= 0) {
      handleSuggestionClick(suggestions[highlighted]);
    }
  };

  // Navigate to movie details
  const handleSuggestionClick = (movie: Movie) => {
    setShowSuggestions(false);
    setSearchValue("");
    setSuggestions([]);
    navigate(`/movie/${movie.id}`);
  };

  // Hide suggestions on blur
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSearchValue("");
      setSuggestions([]);
    }, 120);
  };

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Trending", path: "/trending" },
    { label: "Browse Movies", path: "/browse" },
    { label: "Categories", path: "/categories" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "#232323", minHeight: 56 }}
    >
      <Toolbar sx={{ minHeight: 56, px: { xs: 1, sm: 3 } }}>
        {/* Logo and tagline */}
        <Box display="flex" alignItems="center" gap={1} sx={{ mr: 2 }}>
          <Typography
            variant="h5"
            fontWeight={900}
            sx={{ color: "#00e600", letterSpacing: 1 }}
          >
            YTS
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#bdbdbd", fontWeight: 400, ml: 0.5 }}
          >
            HD movies at the smallest file size.
          </Typography>
        </Box>

        {/* Search Bar - Desktop */}
        {!isMobile && (
          <Box
            sx={{
              flexGrow: 1,
              mx: 4,
              maxWidth: 400,
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", width: "100%" }}>
              <InputBase
                inputRef={inputRef}
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(!!searchValue)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Search for a movie..."
                sx={{
                  bgcolor: "transparent",
                  border: "1px solid #444",
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  color: "#fff",
                  width: "100%",
                  fontSize: 14,
                  pl: 4,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <SearchIcon
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                  fontSize: 20,
                }}
              />
              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 38,
                    zIndex: 20,
                    bgcolor: "#232323",
                    border: "1px solid #333",
                    borderRadius: 2,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.7)",
                    mt: 1,
                    p: 0.5,
                  }}
                >
                  {loading ? (
                    <Typography
                      sx={{ color: "#bdbdbd", px: 2, py: 1, fontSize: 14 }}
                    >
                      Loading...
                    </Typography>
                  ) : suggestions.length === 0 ? (
                    <Typography
                      sx={{ color: "#bdbdbd", px: 2, py: 1, fontSize: 14 }}
                    >
                      No movies found.
                    </Typography>
                  ) : (
                    suggestions.map((movie, idx) => (
                      <Box
                        key={movie.id}
                        onMouseDown={() => handleSuggestionClick(movie)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          px: 1.2,
                          py: 0.7,
                          cursor: "pointer",
                          borderRadius: 1.5,
                          bgcolor:
                            highlighted === idx
                              ? "rgba(0,230,0,0.08)"
                              : "transparent",
                          transition: "background 0.15s",
                          "&:hover": {
                            bgcolor: "rgba(0,230,0,0.13)",
                          },
                        }}
                        onMouseEnter={() => setHighlighted(idx)}
                      >
                        <Box
                          component="img"
                          src={movie.small_cover_image}
                          alt={movie.title}
                          sx={{
                            width: 36,
                            height: 52,
                            objectFit: "cover",
                            borderRadius: 1,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            mr: 1,
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 500,
                              fontSize: 14,
                              lineHeight: 1.2,
                              mb: 0.2,
                              maxWidth: 180,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {movie.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#bdbdbd",
                              fontSize: 12,
                              fontWeight: 400,
                            }}
                          >
                            {movie.year}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Navigation - Desktop */}
        {!isMobile ? (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ ml: "auto", mr: 2 }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  fontWeight: 500,
                  color: "#bdbdbd",
                  fontSize: 14,
                  px: 1.5,
                  minWidth: 0,
                  letterSpacing: 0.2,
                  bgcolor: "transparent",
                  textTransform: "none",
                  ...(isActive(item.path) && {
                    color: "#00e600",
                    fontWeight: 700,
                  }),
                  "&:hover": {
                    color: "#00e600",
                    bgcolor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Box sx={{ display: "flex", gap: 2, ml: 4 }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 500,
                  color: "#bdbdbd",
                  fontSize: 14,
                  minWidth: 0,
                  textTransform: "none",
                }}
                onClick={() => navigate("/404")}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 500,
                  color: "#bdbdbd",
                  fontSize: 14,
                  minWidth: 0,
                  textTransform: "none",
                }}
                onClick={() => navigate("/404")}
              >
                Register
              </Button>
            </Box>
          </Box>
        ) : (
          /* Mobile Menu */
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={handleMenuOpen} edge="end">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: 500,
                    color: "#bdbdbd",
                    fontSize: 14,
                    minWidth: 0,
                    textTransform: "none",
                  }}
                  fullWidth
                >
                  Login
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: 500,
                    color: "#bdbdbd",
                    fontSize: 14,
                    minWidth: 0,
                    textTransform: "none",
                  }}
                  fullWidth
                >
                  Register
                </Button>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
