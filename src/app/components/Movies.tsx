"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MoviesProps {
  initialMovies: Movie[];
  searchResults?: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ initialMovies, searchResults }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getMoreMovies = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
        : `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Respuesta inesperada de la API");
      }

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        if (searchQuery) {
          setMovies((prevMovies) => [...data.results]);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      alert("Error al obtener las películas");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  const getFavoritesIds = async (movieId: number) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    if (!accessToken) {
      console.error("Usuario no autenticado");
      return;
    }

    try {
      const response = await fetch(`${BACKEND}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ movieId, userId }),
      });

      if (!response.ok) throw new Error("Fallo al añadir a favoritos");

      await response.json();
      alert("Película añadida a favoritos con éxito");
    } catch (error) {
      alert("Error al añadir la película a favoritos");
      console.error("Error al añadir a favoritos:", error);
    }
  };

  return (
    <div className="bg-lightgray">
      <h1 className="font-bold text-xl">Popular</h1>
      <div className="grid grid-cols-4 gap-4 p-8 overflow-auto">
        {(searchResults && searchResults.length > 0 ? searchResults : movies).map((movie) => (
          <div key={movie.id} className="pb-4 rounded-lg w-full bg-gray">
            <Link href={`/movies/${movie.id}`} className="block">
              <img
                className="w-full h-64 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
              <div className="m-4">
                <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                <p className="text-white">{movie.release_date}</p>
                <div className="flex items-center space-x-4 p-2">
                  <p className="text-white">Rating: {Math.round(movie.vote_average * 10)}%</p>
                  <button onClick={() => getFavoritesIds(movie.id)}>❤️</button>
                </div>
              </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-yellow w-auto text-white rounded-lg"
            onClick={getMoreMovies}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cargar más películas"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
