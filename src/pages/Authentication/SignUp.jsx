import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Grid,
  FormGroup,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Headings from "../../components/UI/headings/Headings";

const Forms = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
    if (email === "" || password === "" || name === "") {
      setShowError(true);
      setErrorMsg("Invalid fields");
      setLoading(false);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else if (password !== cpassword) {
      setErrorMsg("Passwords do not match!");
    } else {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (data.success === 1) {
        setLoading(false);
        navigate("/login");
      } else {
        setShowError(true);
        setErrorMsg(data.msg);
        setLoading(false);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    }
  };

  return (
    <form noValidate>
      <Container maxWidth="lg">
        <Headings varaint="h4" content="SIGN-UP" size="3.8rem" />
        <Grid
          container
          spacing={2}
          sx={{
            margin: "auto",
          }}
        >
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <TextField
                placeholder="Enter your name"
                name="name"
                id="name"
                autoComplete="off"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <TextField
                placeholder="Enter your email"
                name="email"
                id="email"
                autoComplete="off"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} md={6}>
            <FormGroup>
              <label htmlFor="cpassword">Confirm Password</label>
              <TextField
                placeholder="Confirm your password"
                name="cpassword"
                id="cpassword"
                type="password"
                autoComplete="off"
                variant="standard"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Alert severity="error" sx={{ display: showError ? "block" : "none" }}>
          {errorMsg}
        </Alert>
        <Button onClick={onSubmit} disabled={loading && true}>
          {loading ? "Loading" : "SignUp"}
        </Button>
        <p>
          Already have an account?<Link to="/login"> Click here to login</Link>
        </p>
      </Container>
    </form>
  );
};

export default Forms;
