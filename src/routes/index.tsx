import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';

/**
 * Main application routes
 * Handles all page routing and 404 fallback
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}