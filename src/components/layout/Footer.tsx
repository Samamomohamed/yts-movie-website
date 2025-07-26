import React from "react";
import {
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { GitHub, Twitter, YouTube } from "@mui/icons-material";
import "./layout.css";

export const Footer: React.FC = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-container">
          {/* Brand */}
          <Box className="footer-brand footer-section">
            <Typography className="footer-title" variant="subtitle1">
              YTS Movies
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: 13 }}
            >
              Your source for high-quality movies at the smallest file sizes.
            </Typography>
          </Box>

          {/* Browse */}
          <Box className="footer-section">
            <Typography className="footer-subtitle" variant="subtitle2">
              Browse
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Link href="/browse" className="footer-link" underline="hover">
                All Movies
              </Link>
              <Link href="/trending" className="footer-link" underline="hover">
                Trending
              </Link>
              <Link
                href="/categories"
                className="footer-link"
                underline="hover"
              >
                Categories
              </Link>
            </Box>
          </Box>

          {/* Quality */}
          <Box className="footer-section">
            <Typography className="footer-subtitle" variant="subtitle2">
              Quality
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Link
                href="/browse?quality=720p"
                className="footer-link"
                underline="hover"
              >
                720p Movies
              </Link>
              <Link
                href="/browse?quality=1080p"
                className="footer-link"
                underline="hover"
              >
                1080p Movies
              </Link>
              <Link
                href="/browse?quality=4K"
                className="footer-link"
                underline="hover"
              >
                4K Movies
              </Link>
            </Box>
          </Box>

          {/* Connect */}
          <Box className="footer-section">
            <Typography className="footer-subtitle" variant="subtitle2">
              Connect
            </Typography>
            <Box className="footer-icons">
              <IconButton color="primary" size="small" sx={{ p: 0.7 }}>
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ p: 0.7 }}>
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ p: 0.7 }}>
                <YouTube fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider className="footer-divider" />

        <Box className="footer-bottom">
          <Typography className="footer-copyright" variant="caption">
            © 2025 YTS Movies. All rights reserved.
          </Typography>
          <Box className="footer-bottom-links">
            <Link href="#" className="footer-bottom-link" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" className="footer-bottom-link" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" className="footer-bottom-link" underline="hover">
              DMCA
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
