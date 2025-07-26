import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./common.css";

interface LoadingProps {
  message?: string;
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = 40,
}) => {
  return (
    <Box className="loading-container">
      <CircularProgress size={size} />
      <Typography className="loading-message">{message}</Typography>
    </Box>
  );
};
