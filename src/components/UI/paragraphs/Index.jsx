import React from "react";
import { Typography } from "@mui/material";

const Index = (props) => {
  return (
    <Typography
      variant={props.variant}
      sx={{ fontWeight: 400, fontSize: props.size || "1.8rem" }}
      align="center"
    >
      {props.content}
    </Typography>
  );
};

export default Index;
