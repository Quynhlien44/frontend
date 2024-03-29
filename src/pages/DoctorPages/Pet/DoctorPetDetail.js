import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import petApi from "../../../services/petApi";
import userApi from "../../../services/userApi";
import { Typography, Paper, Grid, CircularProgress } from "@mui/material";

const DoctorPetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetById = async () => {
      try {
        const response = await petApi.getOne(id);

        setPet(response);
        setLoading(false);

        if (response && response.ownerId) {
          const ownerResponse = await userApi.getUser();
          // Find the owner with the matching ID
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
    </div>
  );
};

export default DoctorPetDetail;
