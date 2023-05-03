import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Stack, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserData } from "../../store/user";

const IndividualDetails = () => {
  const params = useParams();
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useUserData((state) => ({
    token: state.token,
  }));

  const getData = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://giddy-leg-warmers-bull.cyclic.app/user/get-individual-details/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setIsLoading(false);
    setReport(data.userReport);
  };

  useEffect(() => {
    getData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
  }));

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Item>Name: {report?.name}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>Total Points: {report?.totalPoints}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>Total Time: {report?.totalTime?.toFixed(2)}</Item>
      </Grid>
      <Grid item xs={12}>
        {report?.questions?.map((question) => {
          return (
            <Container key={question.questionId}>
              <Item style={{ marginBottom: "10px" }}>
                <Stack direction={"column"}>
                  <h5 style={{ fontSize: "1.8rem" }}>
                    {" "}
                    Question Number: {question.questionId}
                  </h5>
                  <Stack
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    direction={"row"}
                  >
                    <h6 style={{ fontSize: "1.2rem" }}>
                      Hints Used: {question.hintsUsed}
                    </h6>
                    <h6 style={{ fontSize: "1.2rem" }}>
                      Incorrect Answers: {question.incorrectAnswers}
                    </h6>
                    <h6 style={{ fontSize: "1.2rem" }}>
                      Points Scored:{question.points}
                    </h6>
                    <h6 style={{ fontSize: "1.2rem" }}>
                      Time Taken:{question.timeTaken}
                    </h6>
                  </Stack>
                </Stack>
              </Item>
            </Container>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default IndividualDetails;
