import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import petApi from "../../../services/petApi";

import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { OwnerAddVisitModalById } from "../../../components";
import { useNavigate } from "react-router-dom";

const OwnerPetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetById = async () => {
      try {
        const response = await petApi.getOne(id);

        setPet(response);
        setLoading(false);

        console.log("Owner Id: ", response.ownerId);
        setOwner(response.ownerId);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPetById();
  }, [id]);

  const handleOpenAddVisitModal = () => {
    setIsAddVisitModalOpen(true);
  };

  const handleCloseAddVisitModal = () => {
    setIsAddVisitModalOpen(false);
    
  };

  const getOwnerNameById = (ownerId) => {
    switch (ownerId) {
      case 1:
        return "Lisa";
      case 2:
        return "John";
      case 3:
        return "Sophia";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Typography variant="h5" color="error">
          Pet not found!
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pet Detail
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {pet.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Type:</strong> {pet.petType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Status:</strong> {pet.status}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>DOB:</strong> {pet.dob}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Owner:</strong> {getOwnerNameById(owner)} (ID: {owner})
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* "Book a Visit" Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddVisitModal}
        style={{ marginBottom: 20 }}
      >
        Book a Visit
      </Button>

      {/* Add Visit Modal */}
      <OwnerAddVisitModalById
        isOpen={isAddVisitModalOpen}
        handleClose={handleCloseAddVisitModal}
        petId={pet.id}
      />
    </div>
  );
};

export default OwnerPetDetail;
