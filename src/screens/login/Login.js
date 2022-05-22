import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      localStorage.setItem("token", "token");
      handleLogin();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction={"column"}
        className={"BrandContainer"}
        spacing={2}
      >
        {error && (
          <Grid item>
            <Alert mt={2} mb={1} severity="error">
              {error}
            </Alert>
          </Grid>
        )}
        {submitting && (
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <CircularProgress />
            </Box>
          </Grid>
        )}
        <Grid item>
          <TextField
            required
            id="email"
            label="Email"
            type={"email"}
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              required
              id="password"
              label="Password"
              type={"password"}
              disabled={submitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            color={"primary"}
            variant={"contained"}
            type={"submit"}
            disabled={submitting}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
