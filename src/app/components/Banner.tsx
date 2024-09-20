"use client";

import React, { useState } from "react";

interface BannerProps {
  title: string;
  description: string;
  backgroundImage: string;
  vote_average: number;
}

const Banner: React.FC<BannerProps> = ({
                                         title,
                                         description,
                                         backgroundImage,
                                         vote_average,
                                       }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const votePercentage = (vote_average / 10) * 100;

  return (
    <div
      className="h-96 bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-center">
        <div className="">
          <h1 className="text-4xl text-left font-bold">{title}</h1>
          <p className="mt-4 text-lg w-2/3">{description}</p>
        </div>
        <div className="flex items-center space-x-4 justify-end">
          <button
            className='p-2 rounded-full w-8'
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <div className="text-right w-8">
            <span className="text-lg font-bold">{votePercentage.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
