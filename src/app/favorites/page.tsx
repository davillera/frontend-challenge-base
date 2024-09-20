"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { router } from "next/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



const FavoritesPage = () => {
  const [favoritesId, setFavoritesId] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken") || "";

    let userId: string;
    if (!accessToken) {
      router.push("/");
    } else {
      userId = sessionStorage.getItem("userId") || "";
    }

    const getFavoritesMoviesId = async () => {
      try {
        const response = await fetch(`${BACKEND}/favorites?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (!response.ok) throw new Error('Fallo al obtener las películas');
        const data = await response.json();
        const movieIds = Array.isArray(data) ? data.map(fav => fav.movieId) : [];
        setFavoritesId(movieIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setFavoritesId([]);
      }
    };

    getFavoritesMoviesId();
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken") || "";

    const getFavoriteMoviesDetails = async () => {
      const movieDetailsPromises = favoritesId.map(async (id) => {
        try {
          const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            }
          });
          if (!response.ok) throw new Error('Fallo al obtener los detalles de la película');
          return await response.json();
        } catch (error) {
          console.error(`Error fetching movie details for ID ${id}:`, error);
          return null;
        }
      });

      const movieDetails = await Promise.all(movieDetailsPromises);
      setFavorites(movieDetails.filter(movie => movie !== null));
    };

    if (favoritesId.length > 0) {
      getFavoriteMoviesDetails();
    }
  }, [favoritesId]);

  const removeFavorite = async (movieId: number) => {
    const accessToken = sessionStorage.getItem("accessToken") || "";
    const userId = sessionStorage.getItem("userId") || "";

    try {
      const response = await fetch(`${BACKEND}/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId, movieId }),
      });

      if (!response.ok) throw new Error('Failed to remove from favorites');
      setFavorites(favorites.filter(movie => movie.id !== movieId));
      setFavoritesId(favoritesId.filter(id => id !== movieId));
      alert("Película eliminada con éxito");
    } catch (error) {
      alert("Error al eliminar la película");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-lightgray">
      <h1 className="font-bold text-xl">Favorites</h1>

      <Link href="/" className="mt-4 px-4 py-2 bg-yellow text-white rounded-lg">
        👈Home
      </Link>

      {favorites.length === 0 ? (
        <p className="mt-4">No favorite movies found.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-8">
          {favorites.map((movie) => (
            <div key={movie.id} className="pb-4 rounded-lg w-full bg-white shadow-md">
              <img
                className="w-full h-64 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="m-4">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>Rating: {Math.round(movie.vote_average * 10)}%</p>

                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="text-2xl mt-2"
                  aria-label="Remove from favorites"
                >
                  🤍
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
