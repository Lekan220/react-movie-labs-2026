import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [myReviews, setMyReviews] = useState( {} ) 
const [mustWatch, setMustWatch] = useState([]);
    const [favorites, setFavorites] = useState( [] )
const addToMustWatch = (movie) => {
  const updated = [...mustWatch, movie.id];
  setMustWatch(updated);
  console.log(updated);
};
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  

  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
 const addReview = (movie, review) => {
  setMyReviews((prevReviews) => {
    const movieReviews = prevReviews[movie.id] || [];
    return {
      ...prevReviews,
      [movie.id]: [...movieReviews, review],
    };
  });
};
  console.log(myReviews);
const handleAddToMustWatch = (e) => {
  e.preventDefault();
  context.addToMustWatch(movie);
};
   return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        myReviews,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
