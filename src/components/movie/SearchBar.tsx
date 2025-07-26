import React, { useState, useCallback } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import "./movie.css";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search movies...",
  autoFocus = false,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (onSearch) {
        onSearch(searchQuery);
      } else if (searchQuery.trim()) {
        navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
      }
    }, 300),
    [onSearch, navigate]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/browse?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="search-bar-form">
      <TextField
        fullWidth
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        variant="outlined"
        size="small"
        className="search-bar-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} edge="end">
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
