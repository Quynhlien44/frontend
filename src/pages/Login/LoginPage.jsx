import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import loginApi from "../../services/loginApi";
import { setAccessToken } from "../../services/utils/axiosClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginApi.login({ email, password });
      setAccessToken(response.access_token);
      if (email === "doctor@pets.com" && password === "Pet1234") {
        navigate("/doctor");
      } else if (
        (email === "owner1@test.com" && password === "qwerty") ||
        (email === "owner2@woof.net" && password === "Bark!") ||
        (email === "owner3@abc.org" && password === "_Dog2023")
      ) {
        navigate("/owner");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Error logging in", err);
      alert("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          borderRadius: 8,
          boxShadow: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
