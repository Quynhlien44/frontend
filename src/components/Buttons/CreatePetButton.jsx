import React from "react";
import { Button } from "@mui/material";

const CreatePetButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Create a New Pet
    </Button>
  );
};

export default CreatePetButton;
