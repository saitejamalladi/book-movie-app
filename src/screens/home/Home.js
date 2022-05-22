import React, { useState } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import MovieList from "../movieList/MovieList";
import { Box, Tab, Typography } from "@material-ui/core";
import CustomModal from "../../common/customModal/CustomModal";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Login from "../login/Login";
import Register from "../register/Register";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [openLogin, setOpenLogin] = React.useState(false);
  const [loginTab, setLoginTab] = React.useState("login");

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  const handleLogin = () => {
    setAuthenticated(true);
    setOpenLogin(false);
  };
  return (
    <React.Fragment>
      <Header
        authenticated={authenticated}
        handleOpenLogin={handleOpenLogin}
        handleLogout={handleLogout}
      />
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
      <CustomModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        header="Authentication"
      >
        <TabContext value={loginTab}>
          <Box sx={{ width: "100%" }}>
            <TabList
              onChange={(event, newTab) => {
                setLoginTab(newTab);
              }}
              indicatorColor="secondary"
              variant="fullWidth"
            >
              <Tab label="LOGIN" value="login" />
              <Tab label="REGISTER" value="register" />
            </TabList>
            <TabPanel value="login">
              <Login handleLogin={handleLogin} />
            </TabPanel>
            <TabPanel value="register">
              <Register />
            </TabPanel>
          </Box>
        </TabContext>
      </CustomModal>
      <MovieList />
    </React.Fragment>
  );
};
export default Home;
