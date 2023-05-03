import React from "react";
import { Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Headings from "../../components/UI/headings/Headings";
import Paragraph from "../../components/UI/paragraphs/Index";

const Home = () => {
  const { state } = useLocation();
  const { questionId } = state;

  return (
    <div>
      <Headings variant="h4" content="About the game" size="3.2rem" />
      <Paragraph
        variant="h4"
        size="1.8rem"
        content="The objective of this game is to find the one true big bad villain of the anime world. Read the rules to have a clear understanding of the game. "
      />
      <ul>
        <li>There are 6 rounds in total.</li>
        <li>Each round will have a single question and three hints.</li>
        <li>
          The player should try to use the minimum number of hints for the
          maximum points.Using hints lead to a deduction in points. Using the
          first hint leads to -5, the second hint reduces -10 points and the
          third hint leads to -20 points.
        </li>
        <li>
          Once you use a hint you can refer to it as many times as you want.
          This would not lead to deduction of points.
        </li>
        <li>
          The faster you answer the questions, the more points will be awarded
          to you.
        </li>
        <li>
          The leaderboard will be made keeping all the above points into
          consideration.
        </li>
        <li>
          You can answer a single question incorrectly a maximum of 5 times.
          After this all your progress will be lost and the time will resume
          from the same moment.
        </li>
        <li>
          Every incorrect answer will lead to a deduction of -1 point from the
          designated answer for the question.
        </li>
        <li>
          For the best experience this game should be played in laptops or
          desktops.
        </li>
      </ul>
      <Stack>
        <Button sx={{ margin: "auto auto" }} variant="contained">
          {console.log(questionId)}
          <Link to={+questionId < 6 ? `/game/${questionId}` : `/results`}>
            Begin
          </Link>
        </Button>
      </Stack>
    </div>
  );
};

export default Home;
