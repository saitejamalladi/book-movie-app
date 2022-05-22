import React, { useEffect, useState } from "react";
import {
  fetchArtistsService,
  fetchGenreService,
  movieFetchService,
} from "../../util/fetch";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function MovieList(props) {
  const { classes } = props;
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [artistsOptions, setAtistsOptions] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

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
        alert("Error fetching the movies" + error);
      }
    };
    setUpcomingMovies([]);
    setReleasedMovies([]);
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        let response = await fetchGenreService();
        setGenreOptions(response.genres.map((genre) => genre.genre));
      } catch (error) {
        alert("Error fetching the genres" + error);
      }
    };
    fetchGenres();
  }, []);
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        let response = await fetchArtistsService();
        setAtistsOptions(
          response.artists.map((artist) => {
            return artist.first_name + " " + artist.last_name;
          })
        );
      } catch (error) {
        alert("Error fetching the artists" + error);
      }
    };
    fetchArtists();
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
          <Box elevation={3} sx={{ padding: "16px", margin: "16px" }}>
            <Typography variant={"body1"} color={"primary"}>
              Find movies by:
            </Typography>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <TextField
                  id="movie-name"
                  label="Movie Name"
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 240 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Genres
                  </InputLabel>
                  <Select
                    labelId="genres"
                    value={genres}
                    multiple
                    variant={"standard"}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Genres</em>;
                      }
                      return selected.join(", ");
                    }}
                    onChange={(e) =>
                      setGenres(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                    MenuProps={MenuProps}
                  >
                    <MenuItem disabled value="">
                      <em>Genres</em>
                    </MenuItem>
                    {genreOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={genres.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 240 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Artists
                  </InputLabel>
                  <Select
                    labelId="artists"
                    value={artists}
                    multiple
                    variant={"standard"}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Artists</em>;
                      }
                      return selected.join(", ");
                    }}
                    onChange={(e) =>
                      setArtists(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                    MenuProps={MenuProps}
                  >
                    <MenuItem disabled value="">
                      <em>Artists</em>
                    </MenuItem>
                    {artistsOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox
                          checked={artistsOptions.indexOf(option) > -1}
                        />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button color={"primary"} variant={"contained"}>
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(withRouter(MovieList));
