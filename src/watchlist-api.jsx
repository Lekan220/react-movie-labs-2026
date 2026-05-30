const BASE_URL = "http://localhost:8080/api/watchlist";

export const addToWatchlist = async (movie) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

  return res.json();
};

export const getWatchlist = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  return res.json();
};

export const deleteWatchlistItem = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};