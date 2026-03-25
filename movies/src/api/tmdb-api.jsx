const apiKey = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Helper to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  return response.json();
};

// Get all movies
export const getMovies = async () => {
  const response = await fetch(
    `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
  );
  return handleResponse(response);
};

// Get single movie
export const getMovie = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `${baseUrl}/movie/${id}?api_key=${apiKey}`
  );
  return handleResponse(response);
};

// Get genres
export const getGenres = async () => {
  const response = await fetch(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  return handleResponse(response);
};

// Get movie images
export const getMovieImages = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `${baseUrl}/movie/${id}/images?api_key=${apiKey}`
  );
  return handleResponse(response);
};

// Get movie reviews
export const getMovieReviews = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `${baseUrl}/movie/${id}/reviews?api_key=${apiKey}`
  );
  return handleResponse(response);
};

// Trending movies
export const getTrendingMovies = async () => {
  const response = await fetch(
    `${baseUrl}/trending/movie/day?api_key=${apiKey}`
  );
  return handleResponse(response);
};

// Upcoming movies
export const getUpcomingMovies = async () => {
  const response = await fetch(
    `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  return handleResponse(response);
};

// Recommendations
export const getMovieRecommendations = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  const response = await fetch(
    `${baseUrl}/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  );
  return handleResponse(response);
};