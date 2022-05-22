import React from "react";

import "./Header.css";
import logoSrc from "../../assets/logo.svg";
import { Button, Grid, Typography } from "@material-ui/core";

function Header({ authenticated, handleOpenLogin, handleLogout }) {
  authenticated = true;
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
        {authenticated && (
          <Grid container justify={"end"} spacing={4}>
            <Grid item>
              <Button
                color={"primary"}
                variant={"contained"}
                onClick={handleSubmitLogout}
              >
                Book Show
              </Button>
            </Grid>
            <Grid item>
              <Button
                color={"default"}
                variant={"contained"}
                onClick={handleSubmitLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      {!authenticated && (
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
  );
}

export default Header;
