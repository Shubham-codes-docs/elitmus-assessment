import React, { useState } from "react";
import { useUserData } from "../../store/user";
import { shallow } from "zustand/shallow";
import {
  TextField,
  Grid,
  FormGroup,
  Container,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Headings from "../../components/UI/headings/Headings";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //data from zustand store
  const { setToken } = useUserData(
    (state) => ({
      setToken: state.setToken,
    }),
    shallow
  );

  const onSubmit = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      setShowError(true);
      setLoading(false);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success === 1) {
        console.log(data);
        setLoading(false);
        setToken(data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        navigate("/home", { state: { questionId: data.lastQuestion } });
      } else {
        setShowError(true);
        setLoading(false);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    }
  };

  return (
    <form>
      <Headings variant="h4" content="LOG-IN" size="3.8rem" />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            margin: "auto",
          }}
        >
          <Grid item xs={12} md={12}>
            <FormGroup sx={{ color: "#fff" }}>
              <label htmlFor="email">Email</label>
              <TextField
                placeholder="Enter your Email"
                name="email"
                id="email"
                autoComplete="off"
                variant="standard"
                sx={{ color: "#fff" }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <TextField
                placeholder="Enter your password"
                name="password"
                id="password"
                type="password"
                variant="standard"
                inputProps={{
                  autoComplete: "Password",
                }}
                sx={{ color: "#fff" }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Alert severity="error" sx={{ display: showError ? "block" : "none" }}>
          Please enter valid fields
        </Alert>
        <Button onClick={onSubmit} disabled={loading && true}>
          {loading ? "Loading" : "Login"}
        </Button>
        <p>
          New here?<Link to="/signup"> Click here to create an account</Link>
        </p>
      </Container>
    </form>
  );
};

export default Login;
