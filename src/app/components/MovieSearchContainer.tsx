"use client";

import React, { useState } from 'react';
import Movies from './Movies';
import Search from './Search';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const MovieSearchContainer: React.FC<{ initialMovies: any[] }> = ({ initialMovies }) => {
  const [searchResults, setSearchResults] = useState(initialMovies);

  const handleSearch = async (query: string) => {
    const res = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    setSearchResults(data.results || []);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <Search onSearch={handleSearch} />
      </div>
      <div className="w-3/4">
        <Movies initialMovies={initialMovies} searchResults={searchResults} />
      </div>
    </div>
  );
};

export default MovieSearchContainer;
