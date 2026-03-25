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

  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const {
    data: recData,
    isPending: recPending,
    isError: recIsError,
    error: recError,
  } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const recommendations = recData?.results?.slice(0, 6) || [];

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />

          <h2 style={{ marginTop: "2rem" }}>Recommended Movies</h2>

          {recPending && <Spinner />}
          {recIsError && <h1>{recError.message}</h1>}

          {!recPending && !recIsError && recommendations.length > 0 && (
            <MovieList
              movies={recommendations}
              action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
          )}

          {!recPending && !recIsError && recommendations.length === 0 && (
            <p>No recommendations found.</p>
          )}
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;