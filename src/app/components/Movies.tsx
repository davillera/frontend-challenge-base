"use client"

import React, { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MoviesProps {
  initialMovies: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ initialMovies }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(2);

  const fetchMoreMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Unexpected API response');
      }

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch more movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  return (
    <div className="bg-lightgray">
      <h1 className="font-bold text-xl">Popular</h1>
      <div className="grid grid-cols-4 gap-4 p-8 overflow-auto">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="pb-4 rounded-lg w-full bg-gray">
              <img
                className="w-full h-64 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                <p className="text-white">{movie.release_date}</p>
                <div className="flex items-center space-x-4 p-2">
                  <p className="text-white">Rating: {Math.round(movie.vote_average * 10)}%</p>
                  <button>❤️</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Peliculas No disponibles</p>
        )}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-yellow w-auto text-white rounded-lg"
            onClick={fetchMoreMovies}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar más pelicculas'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
