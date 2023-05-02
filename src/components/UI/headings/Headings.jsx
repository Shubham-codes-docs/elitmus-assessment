import React from "react";
import { Typography } from "@mui/material";

const Headings = (props) => {
  return (
    <Typography
      variant={props.variant}
      sx={{ fontWeight: 700, fontSize: props.size || "4.8rem" }}
      align="center"
    >
      {props.content}
    </Typography>
  );
};

export default Headings;
