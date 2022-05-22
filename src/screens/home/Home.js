import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import MovieList from "../movieList/MovieList";
import { Box, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#ff9999",
          padding: "8px",
          fontSize: "1rem",
        }}
      >
        <Typography component={"span"}>Upcoming Movies</Typography>
      </Box>
      <MovieList />
    </React.Fragment>
  );
};
export default Home;
