import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";
import petApi from "../../services/petApi";
import { PageHeader } from "../../components";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Pet = () => {
  const [petList, setPetList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [showOnlyAlive, setShowOnlyAlive] = useState(false);

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

  const filteredPetList = showOnlyAlive
    ? petList.filter((pet) => pet.status === "alive")
    : petList;

  return (
    <React.Fragment>
      <PageHeader title="Pets List" />
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        marginBottom={2}
      >
        <FormControlLabel
          control={
            <Checkbox checked={showOnlyAlive} onChange={handleCheckboxChange} />
          }
          label="Show Only Alive Pets"
        />
      </Grid>

      <DataGrid
        rows={filteredPetList}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "name", headerName: "Name", width: 150 },
          { field: "type", headerName: "Type", width: 150 },
          { field: "status", headerName: "Status", width: 200 },
          { field: "dob", headerName: "DOB", width: 200 },
          {
            field: "details",
            headerName: "Details",
            width: 150,
            renderCell: (params) => (
              <Link to={`/doctor/doctor/pets/${params.row.id}`}>
                <ArrowOutwardIcon />
              </Link>
            ),
          },
        ]}
        pageSize={pageSize}
        autoHeight
      />
    </React.Fragment>
  );
};

export default Pet;
