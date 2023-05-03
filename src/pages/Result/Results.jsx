import React, { useEffect, useState } from "react";
import { useUserData } from "../../store/user";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import {
  Scoreboard,
  AccessTimeFilled,
  HourglassEmpty,
  HourglassFull,
  Person,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/UI/headings/Headings";
import Paragraph from "../../components/UI/paragraphs/Index";
import classes from "./results.module.css";

const Results = () => {
  const [report, setReport] = useState({});
  const navigate = useNavigate();

  const { token } = useUserData((state) => ({
    token: state.token,
  }));

  const getData = async () => {
    const res = await fetch("http://localhost:5000/user/generate-report", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setReport(data.userReport);
  };

  useEffect(() => {
    getData();
  }, []);

  const resetHandler = async () => {
    const res = await fetch("http://localhost:5000/user/reset-game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success == 1) {
      Swal.fire({
        title: "Reset Game?",
        text: `Are you sure you want to reset the game?`,
        icon: "question",
        showCloseButton: true,
        confirmButtonText: "Next",
      }).then(() => {
        navigate("/home", { state: { questionId: 1 } });
      });
    }
  };

  return (
    <>
      <Heading variant="h4" content="Results" size="3.2rem" />
      <Paragraph
        variant="h4"
        size="1.8rem"
        content="Congratulations on successfully completing the game. It was no easy quiz and needed careful looking to find the answers.Below you will find your performance details. Your global rank would be visible on the leaderboard. "
      />
      <div className={classes["results-data"]}>
        <Heading variant="h6" content="Stats" size="2.4rem" />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "rgba(14, 25, 8, 0.8)" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Name: "
              secondary={report.name}
              secondaryTypographyProps={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Scoreboard />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Points: "
              secondary={report.totalPoints}
              secondaryTypographyProps={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeFilled />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Time Taken:"
              secondary={`${report?.totalTime?.toFixed(2)} seconds`}
              secondaryTypographyProps={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HourglassEmpty />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Fastest time to answer a question:"
              secondary={`${report?.fastestTime?.toFixed(2)} seconds`}
              secondaryTypographyProps={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HourglassFull />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Slowest time to answer a question:"
              secondary={`${report?.slowestTime?.toFixed(2)} seconds`}
              secondaryTypographyProps={{ color: "#fff" }}
            />
          </ListItem>
        </List>
        <Button
          variant="contained"
          onClick={resetHandler}
          sx={{ marginTop: "10px" }}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default Results;
