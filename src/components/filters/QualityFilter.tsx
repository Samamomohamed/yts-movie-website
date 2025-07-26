import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { MOVIE_QUALITIES } from "../../utils/constants";
import "./filters.css";

interface QualityFilterProps {
  value: string;
  onChange: (quality: string) => void;
  size?: "small" | "medium";
}

export const QualityFilter: React.FC<QualityFilterProps> = ({
  value,
  onChange,
  size = "small",
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size={size} className="filter-form-control">
      <InputLabel id="quality-filter-label" className="filter-label">
        Quality
      </InputLabel>
      <Select
        labelId="quality-filter-label"
        value={value}
        label="Quality"
        onChange={handleChange}
        className="filter-select"
      >
        {MOVIE_QUALITIES.map((quality) => (
          <MenuItem
            key={quality.value}
            value={quality.value}
            className="filter-menu-item"
          >
            {quality.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
