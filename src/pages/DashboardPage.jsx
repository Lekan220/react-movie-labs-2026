import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const StatCard = ({ title, value }) => (
  <Card variant="outlined" sx={{ height: "100%" }}>
    <CardContent>
      <Typography variant="h6" component="p" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3" component="p">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { favorites, mustWatch, myReviews } = useContext(MoviesContext);

  const reviewCount = Object.keys(myReviews).length;

  const averageRating =
    reviewCount > 0
      ? (
          Object.values(myReviews).reduce((sum, review) => {
            return sum + Number(review.rating || 0);
          }, 0) / reviewCount
        ).toFixed(1)
      : "N/A";

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        A quick summary of your movie activity.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Favorites" value={favorites.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Must Watch" value={mustWatch.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Reviews" value={reviewCount} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Average Rating" value={averageRating} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;