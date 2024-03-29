import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, FormControlLabel, Checkbox, Button } from "@mui/material";
import petApi from "../../../services/petApi";
import { CreateNewPetModal, PageHeader } from "../../../components";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const DoctorPets = () => {
  const [petList, setPetList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [showOnlyAlive, setShowOnlyAlive] = useState(false);
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
        console.log(err);
      }
    };
    getPets();
  }, []);

  const handleCheckboxChange = () => {
    setShowOnlyAlive((prevState) => !prevState);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <FormControlLabel
          control={
            <Checkbox checked={showOnlyAlive} onChange={handleCheckboxChange} />
          }
          label="Show Only Alive Pets"
        />
        {/* Button to Create New Pet */}
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Create a New Pet
        </Button>
      </Grid>

      <DataGrid
        rows={filteredPetList}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          {
            field: "name",
            headerName: "Name",
            width: 200,
            renderCell: (params) => (
              <Link to={`/doctor/doctor/pets/${params.row.id}`}>
                {params.row.name}
              </Link>
            ),
          },
          { field: "type", headerName: "Type", width: 200 },
          { field: "status", headerName: "Status", width: 200 },
          { field: "dob", headerName: "DOB", width: 200 },
        ]}
        pageSize={pageSize}
        autoHeight
      />

      {/* Modal for Creating New Pet */}
      <CreateNewPetModal isOpen={isModalOpen} handleClose={handleCloseModal} />
    </React.Fragment>
  );
};

export default DoctorPets;
