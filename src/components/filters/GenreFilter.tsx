import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { MOVIE_GENRES } from "../../utils/constants";
import "./filters.css";

interface GenreFilterProps {
  value: string;
  onChange: (genre: string) => void;
  size?: "small" | "medium";
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  value,
  onChange,
  size = "small",
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size={size} className="filter-form-control">
      <InputLabel id="genre-filter-label" className="filter-label">
        Genre
      </InputLabel>
      <Select
        labelId="genre-filter-label"
        value={value}
        label="Genre"
        onChange={handleChange}
        className="filter-select"
      >
        {MOVIE_GENRES.map((genre) => (
          <MenuItem key={genre} value={genre} className="filter-menu-item">
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
