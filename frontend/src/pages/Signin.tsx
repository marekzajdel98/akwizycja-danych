import React, { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAlertsStore } from "../+state/alerts-store";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useAlertsStore();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/signin", {
        email: email,
        password: password,
      });
      console.log("User signed in:", response.data);
      // Store the token in local storage
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
      window.location.reload();
      // Redirect or perform other actions after sign-in
    } catch (error) {
      console.error("There was an error!", error.response);
      showAlert({ message: "Invalid email or password", level: "error" });
    }
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Sign in
        </Typography>
        <form style={{ width: "100%" }}>
          <TextField
            required
            id="email_address"
            label="Email address"
            name="email"
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "16px", width: "100%" }}
          />
          <TextField
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "16px", width: "100%" }}
          />
          <CardActions style={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={onLogin} size="medium">
              Login
            </Button>
          </CardActions>
          <CardActions style={{ justifyContent: "center" }}>
            <Typography
              variant="body2"
              component="p"
              className="text-sm text-center"
            >
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </Typography>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
