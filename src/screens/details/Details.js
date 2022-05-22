import React, { useEffect, useState } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import {
  Box,
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Loader from "../../common/loader/Loader";
import { Rating } from "@material-ui/lab";

import YouTube from "react-youtube";
import { withStyles } from "@material-ui/core/styles";
import { movieDetailsFetchService } from "../../util/fetch";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
    cursor: "pointer",
  },
});

const Details = (props) => {
  const { classes } = props;
  const [rating, setRating] = useState(null);
  const [movie, setMovie] = useState(null);
  const movieId = props.match.params.id;
  const [authenticated, setAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      try {
        let movie = await movieDetailsFetchService(movieId);
        setMovie(movie);
      } catch (error) {
        alert("Error fetching the movie details" + error);
      }
    };
    setMovie(null);
    if (movieId) fetchMovieDetails(movieId);
  }, [movieId]);
  return (
    <React.Fragment>
      <Header
        authenticated={authenticated}
        handleOpenLogin={handleOpenLogin}
        handleLogout={handleLogout}
        movieId={movie && movie.id}
      />
      {movie ? (
        <React.Fragment>
          <Box
            sx={{
              textTransform: "none",
              marginTop: "8px",
              marginLeft: "24px",
              marginBottom: "24px",
              height: "24px",
            }}
          >
            <Button
              onClick={() => props.history.push("/")}
              variant={"standard"}
              startIcon={<ArrowBackIos />}
            >
              Back to Home
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={2}>
              <img
                src={movie.poster_url}
                width={"100%"}
                height={"auto"}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={7}>
              <Typography variant={"h2"}>{movie.title}</Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Genre:{" "}
                </Box>
                {movie.genres.join(", ")}
              </Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Duration:{" "}
                </Box>
                {movie.duration}
              </Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Release Date:{" "}
                </Box>
                {movie.release_date}
              </Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Rating:{" "}
                </Box>
                {movie.critics_rating}
              </Typography>
              <Typography component={"div"} paragraph>
                <Box
                  sx={{
                    display: "inline",
                    marginTop: "16px",
                    marginBottom: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Plot:{" "}
                </Box>
                ({<a href={movie.wiki_url}>Wiki Link </a>}){movie.storyline}
              </Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Trailer:{" "}
                </Box>
              </Typography>
              <Box
                sx={{
                  fontWeight: "bold",
                }}
              >
                <YouTube
                  videoId={movie.trailer_url.substring(
                    movie.trailer_url.indexOf("v=") + 2
                  )}
                  width="100%"
                />
                {movie.trailer_url.substring(
                  movie.trailer_url.lastIndexOf("v=")
                )}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography component={"div"}>
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Rating:{" "}
                </Box>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Typography>
              <Typography component={"div"}>
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Artists:{" "}
                </Box>
                <GridList className={classes.gridList} cols={2}>
                  {movie.artists.map((artist) => (
                    <GridListTile key={artist.profile_url}>
                      <img
                        src={artist.profile_url}
                        alt={`${artist.first_name} ${artist.last_name}`}
                      />
                      <GridListTileBar
                        title={`${artist.first_name} ${artist.last_name}`}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};
export default withStyles(styles)(withRouter(Details));
