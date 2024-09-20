// app/movies/[id]/page.tsx

import React from 'react';
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const MovieDetail = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  const movie = await res.json();

  return (
    <div className="bg-gray min-h-screen p-4">
      <Link href="/" className="p-2 m-4 bg-yellow text-white rounded-lg">
        👈 Atrás
      </Link>
      <div
        className="relative w-full h-60 md:h-96 my-4"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex flex-col items-center text-white p-8 relative z-10">
          <div className="flex flex-col md:flex-row w-full max-w-5xl">
            <img
              className="w-full md:w-1/3 rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="md:ml-8 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-white mt-2">{movie.release_date}</p>
              <p className="mt-4">{movie.overview}</p>
              <div className="flex items-center mt-4">
                <span className="text-xl font-bold">Rating: {Math.round(movie.vote_average * 10)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MovieDetail;
