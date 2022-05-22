import React, { useEffect, useState } from "react";
import { movieFetchService } from "../../util/fetch";
import {
  Button,
  Card,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";
import { withStyles } from "@material-ui/core/styles";
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
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridList2: {
    height: 450,
    cursor: "pointer",
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function MovieList(props) {
  const { classes } = props;
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let upcomingResponse = await movieFetchService("PUBLISHED");
        setUpcomingMovies(
          upcomingResponse.movies.sort(
            (a, b) => a.release_date - b.release_date
          )
        );
        let releasedResponse = await movieFetchService("RELEASED");
        setReleasedMovies(releasedResponse.movies);
      } catch (error) {
        alert("Error fetching the doctors" + error);
      }
    };
    setUpcomingMovies([]);
    setReleasedMovies([]);
    fetchMovies();
  }, []);
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={6}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={movie.poster_url}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar
              title={movie.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <GridList cellHeight={350} cols={4} className={classes.gridList2}>
            {releasedMovies.map((movie) => (
              <GridListTile
                key={movie.poster_url}
                onClick={() => props.history.push(`/movie/${movie.id}`)}
              >
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={<span>Release Date: {movie.release_date}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item xs={"auto"}>
          <Card sx={{ minWidth: 275, minHeight: 275 }}>sdajskjdhka</Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(withRouter(MovieList));
