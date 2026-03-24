import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Trending Movies"
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingMoviesPage;