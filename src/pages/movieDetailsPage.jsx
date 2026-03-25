import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MoviePage = () => {
  const { id } = useParams();

  // 🎬 Movie details
  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
    enabled: !!id, // 🔥 prevents queryKey error
  });

  // 🎯 Recommendations
  const {
    data: recData,
    isPending: recPending,
    isError: recIsError,
    error: recError,
  } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
    enabled: !!id, // 🔥 prevents queryKey error
  });

  // ⏳ Loading states
  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  if (recPending) return <Spinner />;
  if (recIsError) return <h1>{recError.message}</h1>;

  const recommendations = recData?.results || [];

  return (
    <>
      <PageTemplate movie={movie}>
        <MovieDetails movie={movie} />
      </PageTemplate>

      <h3 style={{ marginTop: "2rem" }}>Recommended Movies</h3>
      <MovieList
        movies={recommendations}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </>
  );
};

export default MoviePage;