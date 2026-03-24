import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useState, useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import TextField from "@mui/material/TextField";
import AddToPlaylistIcon from "../components/cardIcons/AddToPlaylistIcon";
const HomePage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results || [];

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optional: favorites logic
  const favorites = filteredMovies.filter((m) => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const addToFavorites = (movieId) => true;

  return (
    <div>
      {/* Search bar */}
      <TextField
        label="Search movies..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Movie list */}
      <PageTemplate
        title="Discover Movies"
        movies={filteredMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
        
      />

      {filteredMovies.length === 0 && (
        <p>No movies found matching your search.</p>
      )}
    </div>
  );
};
export default HomePage;

