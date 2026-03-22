import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";

import { MoviesContext } from "../../contexts/moviesContext";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 0, label: "Terrible" },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(3);

  const navigate = useNavigate();
  const context = useContext(MoviesContext);

  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
    setOpen(true);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h6">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              label="Author's name"
              autoFocus
              {...field}
            />
          )}
        />

        {errors.author && (
          <Typography variant="h6">{errors.author.message}</Typography>
        )}

        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              minRows={10}
              label="Review text"
              {...field}
            />
          )}
        />

        {errors.review && (
          <Typography variant="h6">{errors.review.message}</Typography>
        )}

        <Controller
          name="rating"
          control={control}
          render={({ field: { onChange } }) => (
            <TextField
              select
              label="Rating Select"
              value={rating}
              onChange={(e) => {
                handleRatingChange(e);
                onChange(e);
              }}
              helperText="Don't forget your rating"
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box>
          <Button type="submit" variant="contained" sx={styles.submit}>
            Submit
          </Button>

          <Button
            type="reset"
            variant="contained"
            color="secondary"
            onClick={() =>
              reset({
                author: "",
                review: "",
              })
            }
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;