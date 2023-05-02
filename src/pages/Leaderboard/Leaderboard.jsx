import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
} from "@mui/material";
import { useUserData } from "../../store/user";
import Headings from "../../components/UI/headings/Headings";
import Paragraph from "../../components/UI/paragraphs/Index";

const Leaderboard = () => {
  const [report, setReport] = useState({});

  const { token } = useUserData((state) => ({
    token: state.token,
  }));

  const getData = async () => {
    const res = await fetch("http://localhost:5000/user/generate-leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setReport(data.userReports);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Headings variant="h4" content="LeaderBoard" size="3.2rem" />
      <Paragraph
        variant="h4"
        size="1.8rem"
        content="This is the leaderboard. You can find the top rankers of this tournament."
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Points</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.length > 0 &&
              report.map((r) => {
                return (
                  <TableRow
                    key={r.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {r.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {r.totalPoints.toFixed(2)}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {r.totalTime.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Leaderboard;
