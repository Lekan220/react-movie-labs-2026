import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TopRatedMoviesPage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["top-rated"],
    queryFn: getMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = [...(data.results || [])]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 20);

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;