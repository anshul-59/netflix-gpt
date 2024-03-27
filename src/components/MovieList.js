import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div className="px-6 bg-black">
      <h1 className="text-3xl py-4 font-bold text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {/* Add a null check before mapping over movies */}
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
