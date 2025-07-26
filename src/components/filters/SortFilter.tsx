import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { SORT_OPTIONS, ORDER_OPTIONS } from "../../utils/constants";
import "./filters.css";

interface SortFilterProps {
  sortBy: string;
  orderBy: string;
  onSortChange: (sortBy: string) => void;
  onOrderChange: (orderBy: string) => void;
  size?: "small" | "medium";
}

export const SortFilter: React.FC<SortFilterProps> = ({
  sortBy,
  orderBy,
  onSortChange,
  onOrderChange,
  size = "small",
}) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    onOrderChange(event.target.value);
  };

  return (
    <Box className="filter-box">
      <FormControl size={size} className="filter-form-control">
        <InputLabel id="sort-filter-label" className="filter-label">
          Sort By
        </InputLabel>
        <Select
          labelId="sort-filter-label"
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange}
          className="filter-select"
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="filter-menu-item"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size={size} className="filter-form-control order">
        <InputLabel id="order-filter-label" className="filter-label">
          Order
        </InputLabel>
        <Select
          labelId="order-filter-label"
          value={orderBy}
          label="Order"
          onChange={handleOrderChange}
          className="filter-select"
        >
          {ORDER_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="filter-menu-item"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
