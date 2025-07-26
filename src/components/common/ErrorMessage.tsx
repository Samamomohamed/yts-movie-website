import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import "./common.css";

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
}) => {
  return (
    <Box className="error-container">
      <Alert
        severity="error"
        className="error-alert"
        action={
          onRetry && (
            <Button
              className="error-retry-button"
              onClick={onRetry}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle className="error-title">Error</AlertTitle>
        <span className="error-message">{error}</span>
      </Alert>
    </Box>
  );
};
