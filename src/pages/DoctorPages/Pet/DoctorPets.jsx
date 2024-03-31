import React, { useEffect, useState } from "react";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";
import petApi from "../../../services/petApi";
import {
  UpdateAPetModal,
  CreateNewPetModal,
  PageHeader,
  DoctorPetGrid,
  CreatePetButton,
} from "../../../components";

const DoctorPets = () => {
  const [petList, setPetList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [showOnlyAlive, setShowOnlyAlive] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const getPets = async () => {
      try {
        const res = await petApi.getAll();
        const transformedPetList = res.map((pet) => ({
          id: pet.id,
          name: pet.name,
          type: pet.petType,
          status: pet.status,
          dob: pet.dob,
        }));
        setPetList(transformedPetList);
      } catch (err) {
        console.error(err);
      }
    };
    getPets();
  }, [petList]);

  const handleCheckboxChange = () => {
    setShowOnlyAlive((prevState) => !prevState);
  };

  const handleUpdateModalOpen = (pet) => {
    setSelectedPet(pet);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdatePet = async (updatedPet) => {
    try {
      const response = await petApi.update(selectedPet.id, updatedPet);
      const updatePetList = petList.map((pet) =>
        pet.id === selectedPet.id ? { ...response, id: selectedPet.id } : pet
      );
      setPetList(updatePetList);
      handleUpdateModalClose();
    } catch (err) {
      console.error(`Error updating pet ${updatedPet.name}`, err);
    }
  };

  const filteredPetList = showOnlyAlive
    ? petList.filter((pet) => pet.status === "alive")
    : petList;

  return (
    <React.Fragment>
      <PageHeader title="Pets List" />

      {/* Grid for Checkbox and Button */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        {/* Alive Check box */}
        <FormControlLabel
          control={
            <Checkbox checked={showOnlyAlive} onChange={handleCheckboxChange} />
          }
          label="Show Only Alive Pets"
        />
      </Grid>

      <DoctorPetGrid
        petList={filteredPetList}
        handleUpdateModalOpen={handleUpdateModalOpen}
        pageSize={pageSize}
      />

      {/* Modal for Updating a Pet */}
      <UpdateAPetModal
        isOpen={isUpdateModalOpen}
        handleClose={handleUpdateModalClose}
        pet={selectedPet}
        handleUpdate={handleUpdatePet}
      />
    </React.Fragment>
  );
};

export default DoctorPets;
