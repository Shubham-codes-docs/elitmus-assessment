import React from "react";
import { Container, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Headings from "../../components/UI/headings/Headings";
import Paragraph from "../../components/UI/paragraphs/Index";

const Index = () => {
  return (
    <Container maxWidth="lg">
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginBottom: "20px",
        }}
      >
        <Headings variant="h4" content="The Anime Hunter" />
        <Paragraph
          variant="subtitle2"
          content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem tempore ipsam tenetur, rerum suscipit quibusdam vitae ab similique ut eos voluptate, alias eaque harum consequuntur, distinctio consequatur accusantium voluptatibus."
        />
      </Stack>
      <Stack
        direction={"row"}
        gap={"25px"}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button variant="contained" size="large">
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="outlined" size="large">
          <Link to="/signup">Signup</Link>
        </Button>
      </Stack>
    </Container>
  );
};

export default Index;
