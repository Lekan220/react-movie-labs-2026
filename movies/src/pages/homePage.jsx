import React from "react";
import Grid from "@mui/material/Grid";

const HomePage = (props) => {
  const movies = props.movies;
    
  return (
  <Grid container>
      <Grid size={14}>
          <h1> HomePage </h1>
      </Grid>
    </Grid>
  );
};
export default homePage;
