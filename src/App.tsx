import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { BrowseMoviesPage, CategoriesPage } from "./pages/BrowseMoviesPage";
import { TrendingPage } from "./pages/TrendingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseMoviesPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          {/* Redirect old paths */}
          <Route path="/movies" element={<BrowseMoviesPage />} />
          <Route path="/search" element={<BrowseMoviesPage />} />
          {/* Catch all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
