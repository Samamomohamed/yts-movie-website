import React from "react";
import { Box, Pagination as MuiPagination, Typography } from "@mui/material";
import "./common.css";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <Box className="pagination-container">
      <Typography className="pagination-info">
        Showing {startItem}-{endItem} of {totalCount} movies
      </Typography>
      <Box className="pagination-controls">
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
          className="pagination-button"
        />
      </Box>
    </Box>
  );
};
