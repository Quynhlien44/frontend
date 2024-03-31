import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import petApi from "../../../services/petApi";
import {
  CreateNewPetModal,
  PageHeader,
  OwnerPetGrid,
  CreatePetButton,
} from "../../../components";
import { useNavigate } from "react-router-dom";

const OwnerPets = () => {
  const [petList, setPetList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerId, setOwnerId] = useState(0);
  const navigate = useNavigate();

  // TODO: Fetch ownerId on component mount
  useEffect(() => {
    const getPets = async () => {
      try {
        const res = await petApi.getAll();
        if (res.length > 0) {
          setOwnerId(res[0].ownerId);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPets();
  }, []);

  // Fetch petList on component mount and when ownerId changes
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
        console.log("res.ownerId", res[0].ownerId);
      } catch (err) {
        console.error(err);
      }
    };
    getPets();
  }, [ownerId]);

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle adding a new pet
  const handleAddNewPet = async (values) => {
    try {
      const response = await petApi.create(values);
      const newPet = {
        id: response.pet.id,
        name: response.pet.name,
        type: response.pet.petType,
        status: response.pet.status,
        dob: response.pet.dob,
      };
      // Update petList with the new pet
      setPetList((prevPetList) => [...prevPetList, newPet]);
      navigate(`${response.pet.id}`);
      handleCloseCreateModal();
    } catch (error) {
      alert("Error creating pet, please try again!");
      console.error("Error adding new pet:", error);
    }
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
        ownerId={ownerId}
        handleAddNewPet={handleAddNewPet}
      />
    </React.Fragment>
  );
};

export default OwnerPets;
