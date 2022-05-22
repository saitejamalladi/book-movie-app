import React from "react";

import "./Header.css";
import logoSrc from "../../assets/logo.svg";
import { Button, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

function Header({
  authenticated,
  handleOpenLogin,
  handleLogout,
  movieId,
  history,
}) {
  const handleSubmitLogout = async () => {
    handleLogout();
  };
  return (
    <Grid
      container
      className={"HeaderContainer"}
      spacing={2}
      justify={"space-between"}
    >
      <Grid item>
        <Typography>
          <img className={"rotating"} src={logoSrc} alt={"Logo"} />
        </Typography>
      </Grid>
      <Grid item>
        <Grid container justify={"end"} spacing={2}>
          {movieId && (
            <Grid item>
              <Button
                color={"primary"}
                variant={"contained"}
                onClick={() => history.push(`/bookshow/${movieId}`)}
              >
                Book Show
              </Button>
            </Grid>
          )}
          {authenticated ? (
            <Grid item>
              <Button
                color={"default"}
                variant={"contained"}
                onClick={handleSubmitLogout}
              >
                Logout
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                color={"default"}
                variant={"contained"}
                onClick={handleOpenLogin}
              >
                Login
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(Header);
