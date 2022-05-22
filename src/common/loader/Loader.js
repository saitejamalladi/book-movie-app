import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

function Loader(props) {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        minHeight: "300px",
      }}
    >
      <CircularProgress size={"6rem"} />
    </Box>
  );
}

export default Loader;
