import React, { useState, useEffect } from "react";
import { Card, Tabs, Tab, TextField, Stack, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useUserData } from "../../store/user";
import Swal from "sweetalert2";
import Headings from "../../components/UI/headings/Headings";
import Paragraph from "../../components/UI/paragraphs/Index";
import HintsPanel from "./Hints";
import Counter from "../../components/counter/Counter";
import { questions } from "../../assets/data/questions";
import classes from "./game.module.css";

const Game = () => {
  const [tabValue, setTabValue] = useState(0);
  const [answer, setAnswer] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [hintVisits, setHintVisits] = useState({});
  const [question, setQuestion] = useState([]);
  const [points, setPoints] = useState(0);
  const [questionStatus, setQuestionStatus] = useState(false);
  const [incorrectAns, setIncorrectAns] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const { token, setHints, setStoredIncorrectAns } = useUserData(
    (state) => ({
      token: state.token,
      setHints: state.setHints,
      setStoredIncorrectAns: state.setIncorrectAns,
    }),
    shallow
  );

  const getData = async () => {
    const res = await fetch("http://localhost:5000/user/get-question-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ questionId: params.id }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === 1) {
      if (data.hints === 1) {
        setHintVisits((prevState) => {
          return {
            ...prevState,
            one: true,
          };
        });
      } else if (data.hints === 2) {
        setHintVisits((prevState) => {
          return {
            ...prevState,
            one: true,
            two: true,
          };
        });
      } else if (data.hints === 3) {
        setHintVisits((prevState) => {
          return {
            ...prevState,
            one: true,
            two: true,
            three: true,
          };
        });
      }
      setHintCount(data.hints);
      setIncorrectAns(data.incorrectAns);
      setQuestionStatus(data.questionStatus);
    }
  };

  useEffect(() => {
    const selectedQuestion = questions.filter((q) => {
      return q.id == params.id;
    });

    getData();

    setQuestion(selectedQuestion[0]);
  }, [params]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const tabChangeHandler = (e, value) => {
    setTabValue(value);
  };

  const hintCountUpdateHandler = async (hint, value) => {
    if (!hintVisits[hint]) {
      setHintCount((prevState) => {
        return prevState + 1;
      });
      setHintVisits((prevState) => {
        return {
          ...prevState,
          [hint]: true,
        };
      });
      setPoints((prevState) => {
        return prevState - value;
      });
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;
      await setHints(hintCount, params.id, true, elapsedTime);
    } else {
      console.log(hintCount);
      console.log("Visited");
    }
  };

  const allyProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const submitHandler = async () => {
    if (answer !== question.answer) {
      setIncorrectAns((prevState) => prevState + 1);
      setPoints((prevState) => {
        return prevState - 1;
      });
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;
      await setStoredIncorrectAns(incorrectAns, params.id, true, elapsedTime);
      Swal.fire({
        title: "Incorrect Answer",
        text: "Incorrect Answer!Please try again",
        icon: "error",
      });
    } else {
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;

      const submissionData = {
        questionId: params.id,
        points: points + question?.points,
        hintsUsed: hintCount,
        timeTaken: elapsedTime,
        incorrectAnswers: incorrectAns,
        status: true,
      };
      const res = await fetch("http://localhost:5000/user/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ questionDetails: submissionData }),
      });
      const data = await res.json();

      if (data.success === 1) {
        Swal.fire({
          title: "Correct Answer",
          text: `This is the right answer.You get ${question?.points} points`,
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "Next",
        }).then(() => {
          if (params.id != 6) {
            navigate(`/game/${+params.id + 1}`);
            navigate(0);
          } else {
            navigate(`/results`);
          }
        });
        setAnswer("");
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: `${data.msg}`,
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <Headings variant="h5" content={`Question ${params.id}`} size="3.2rem" />
      <Card variant="outlined" sx={{ padding: "15px", margin: "2rem" }}>
        <Paragraph variant="body" content={question?.question} size="1.4rem" />
      </Card>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Tabs
          value={tabValue}
          onChange={tabChangeHandler}
          sx={{ margin: "auto auto" }}
        >
          <Tab
            label="Initial Clue"
            {...allyProps(0)}
            sx={{ color: "#fff" }}
          ></Tab>
          <Tab
            label="Hint 1"
            {...allyProps(1)}
            sx={{ color: "#fff" }}
            onClick={hintCountUpdateHandler.bind(null, "one", 5)}
          ></Tab>
          <Tab
            label="Hint 2"
            {...allyProps(2)}
            sx={{ color: "#fff" }}
            onClick={hintCountUpdateHandler.bind(null, "two", 10)}
            disabled={hintVisits["one"] ? false : true}
          ></Tab>
          <Tab
            label="Hint 3"
            {...allyProps(3)}
            sx={{ color: "#fff" }}
            onClick={hintCountUpdateHandler.bind(null, "three", 20)}
            disabled={hintVisits["two"] ? false : true}
          ></Tab>
        </Tabs>
        <HintsPanel value={tabValue} index={0}>
          {question?.clue?.type === "text" ? (
            <span>{question?.clue?.text}</span>
          ) : question?.clue?.type === "image" ? (
            <img
              src={question?.clue?.text}
              alt="clue"
              className={classes["hint-image"]}
              id={params.id == 6 && classes["hidden-hint-image"]}
            />
          ) : (
            <a href={question?.clue?.text}>Clue Link</a>
          )}
        </HintsPanel>
        <HintsPanel value={tabValue} index={1}>
          {question?.hint1}
        </HintsPanel>
        <HintsPanel value={tabValue} index={2}>
          {question?.hint2}
        </HintsPanel>
        <HintsPanel value={tabValue} index={3}>
          {question?.hint3}
        </HintsPanel>
        <div>
          <label htmlFor="answer">Your Answer:</label>
          <br />
          <TextField
            name="answer"
            value={answer}
            id="answer"
            sx={{
              margin: "20px 0",
              borderColor: "#fff",
            }}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            variant="standard"
          />
        </div>
        <Card className={classes["incorrect-card"]}>
          <p>Incorrect Answers</p>
          <span>{incorrectAns}/5</span>
        </Card>
        <Button
          variant="contained"
          onClick={submitHandler}
          disabled={questionStatus}
        >
          {questionStatus ? "Answered" : "Submit"}
        </Button>
      </Stack>
      <Counter />
    </div>
  );
};

export default Game;
