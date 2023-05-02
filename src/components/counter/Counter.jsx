import React, { useEffect, useState } from "react";
import { Stack, Divider, Card } from "@mui/material";

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHours(parseInt(seconds / 3600));
    if (seconds > 60) {
      setSeconds(0);
      setMinutes((prevState) => prevState + 1);
    }
    if (minutes > 60) {
      setMinutes(0);
      setHours((prevState) => prevState + 1);
    }
  }, [seconds]);

  return (
    <Card
      sx={{
        width: "20%",
        padding: "20px",
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
    >
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        direction={"row-reverse"}
        justifyContent={"space-between"}
        sx={{ fontSize: "1.2rem" }}
      >
        <div>Seconds:{seconds}</div>
        <div>Minutes:{minutes}</div>
        <div>Hours:{hours}</div>
      </Stack>
    </Card>
  );
};

export default Counter;
