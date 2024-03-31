import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import petApi from "../../../services/petApi";
import userApi from "../../../services/userApi";
import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { DoctorAddVisitModalById } from "../../../components";

const DoctorPetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false);

  useEffect(() => {
    const fetchPetById = async () => {
      try {
        const response = await petApi.getOne(id);

        setPet(response);
        setLoading(false);

        if (response && response.ownerId) {
          const ownerResponse = await userApi.getUser();
          const owner = ownerResponse.find(
            (user) => user.id === response.ownerId
          );

          setOwner(owner);
        }
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
            {owner ? (
              <Typography variant="body1">
                <strong>Owner:</strong> {owner.name} (ID: {owner.id})
              </Typography>
            ) : (
              <Typography variant="body1">Owner not found</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Doctor's Only Comment */}
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h5" gutterBottom>
          Doctor's Only Comment
        </Typography>
        <Typography variant="body1">{pet.doctorsComment}</Typography>
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
      <DoctorAddVisitModalById
        isOpen={isAddVisitModalOpen}
        handleClose={handleCloseAddVisitModal}
        petId={pet.id}
      />
    </div>
  );
};

export default DoctorPetDetail;
