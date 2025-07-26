import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minHeight="60vh"
      >
        {/* 404 Number */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
            fontWeight: 700,
            color: "#00e600",
            lineHeight: 0.9,
            mb: 3,
            opacity: 0.9,
          }}
        >
          404
        </Typography>

        {/* Error Message */}
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 600,
            mb: 3,
            fontSize: { xs: "1.3rem", sm: "1.6rem" },
          }}
        >
          Oops! Page not found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#bdbdbd",
            mb: 5,
            maxWidth: 450,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            lineHeight: 1.7,
            opacity: 0.8,
          }}
        >
          The page you're looking for doesn't exist or has been moved. No
          worries though - you can always explore our amazing collection of
          movies!
        </Typography>

        {/* Action Buttons */}
        <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              bgcolor: "#00e600",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.95rem",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 230, 0, 0.2)",
              "&:hover": {
                bgcolor: "#00ff00",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0, 230, 0, 0.3)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              borderColor: "#666",
              color: "#bdbdbd",
              fontWeight: 500,
              fontSize: "0.95rem",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                borderColor: "#00e600",
                color: "#00e600",
                bgcolor: "rgba(0, 230, 0, 0.03)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Subtle Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "15%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(0, 230, 0, 0.05)",
            filter: "blur(30px)",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "25%",
            right: "15%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(0, 230, 0, 0.04)",
            filter: "blur(35px)",
            zIndex: -1,
          }}
        />
      </Box>
    </Container>
  );
};
