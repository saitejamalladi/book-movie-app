import React, { useState } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Loader from "../../common/loader/Loader";
const Details = (props) => {
  const [movie, setMovie] = useState({
    id: "009ae262-a234-11e8-b475-720006ceb890",
    title: "The Godfather",
    storyline:
      "A chilling portrait of the Corleone familys rise and near fall from power in America along with balancing the story of the Sicilian clans ugly crime business in which they are engaged.",
    genres: ["Drama", "Crime"],
    duration: 177,
    poster_url:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    trailer_url: "https://www.youtube.com/watch/?v=sY1S34973zA",
    wiki_url: "https://en.wikipedia.org/wiki/The_Godfather",
    release_date: "1972-03-15",
    censor_board_rating: "A",
    rating: 9.2,
    status: "RELEASED",
    artists: [
      {
        id: "f114b346-a237-11e8-9077-720006ceb890",
        first_name: "Marlon",
        last_name: "Brando",
        role_type: "ACTOR",
        profile_description:
          "Marlon Brando Jr. was an American actor and film director. He is credited with bringing realism to film acting and helping to popularize the Stanislavski system of acting having studied with Stella Adler in the 1940s. Regarded for his cultural influence on 20th century film, Brandos Academy Award-winning performances include that of Terry Malloy in On the Waterfront (1954) and Don Vito Corleone in The Godfather (1972). Brando was an activist for many causes, notably the civil rights movement and various Native American movements.",
        profile_url:
          "https://upload.wikimedia.org/wikipedia/commons/e/e5/Marlon_Brando_%28cropped%29.jpg",
        wiki_url: "https://en.wikipedia.org/wiki/Marlon_Brando",
      },
      {
        id: "359f7e8a-a23b-11e8-9077-720006ceb890",
        first_name: "Al",
        last_name: "Pacino",
        role_type: "ACTOR",
        profile_description:
          "Alfredo James Pacino is an American actor and filmmaker. Pacino has had a career spanning over five decades, during which time he has received numerous accolades and honors both competitive and honorary, among them an Academy Award, two Tony Awards, two Primetime Emmy Awards, a British Academy Film Award, four Golden Globe Awards, the Lifetime Achievement Award from the American Film Institute, the Golden Globe Cecil B. DeMille Award, and the National Medal of Arts. He is also one of few performers to have won a competitive Oscar, an Emmy, and a Tony Award for acting, dubbed the Triple Crown of Acting.",
        profile_url:
          "https://upload.wikimedia.org/wikipedia/commons/9/98/Al_Pacino.jpg",
        wiki_url: "https://en.wikipedia.org/wiki/Al_Pacino",
      },
    ],
  });

  return (
    <React.Fragment>
      <Header />
      {movie ? (
        <React.Fragment>
          <Button
            onClick={() => props.history.push("/")}
            variant={"standard"}
            startIcon={<ArrowBackIos />}
            sx={{
              textTransform: "none",
              marginTop: "8px",
              marginLeft: "24px",
              marginBottom: "24px",
              height: "24px",
            }}
          >
            Back to Home
          </Button>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <img
                src={movie.poster_url}
                width={"100%"}
                height={"auto"}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant={"h2"}>{movie.title}</Typography>
              <Typography variant={"div"} sx={{ fontWeight: "bold" }}>
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
              <Typography variant={"div"} sx={{ fontWeight: "bold" }}>
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
              <Typography variant={"div"} sx={{ fontWeight: "bold" }}>
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
              <Typography variant={"div"} sx={{ fontWeight: "bold" }}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Rating:{" "}
                </Box>
                {movie.rating}
              </Typography>
              <Typography variant={"div"} paragraph sx={{ fontWeight: "bold" }}>
                <Box
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Plot:{" "}
                </Box>
                {movie.storyline}
              </Typography>
              <Typography variant={"div"} sx={{ fontWeight: "bold" }}>
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Trailer:{" "}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};
export default Details;
