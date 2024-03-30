import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import loginApi from "../../../services/loginApi";
import { setAccessToken } from "../../../services/utils/axiosClient";
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
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Doctor Login
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
