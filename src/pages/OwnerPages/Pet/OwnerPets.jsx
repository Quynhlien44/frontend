import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import petApi from "../../../services/petApi";
import {
  CreateNewPetModal,
  PageHeader,
  OwnerPetGrid,
  CreatePetButton,
} from "../../../components";

const OwnerPets = () => {
  const [petList, setPetList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

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
        {/* Button to Create New Pet */}
        <CreatePetButton onClick={handleOpenCreateModal} />
      </Grid>

      <OwnerPetGrid petList={petList} pageSize={pageSize} />

      {/* Modal for Creating New Pet */}
      <CreateNewPetModal
        isOpen={isModalOpen}
        handleClose={handleCloseCreateModal}
      />
    </React.Fragment>
  );
};

export default OwnerPets;
