import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const DoctorPetGrid = ({ petList, handleUpdateModalOpen, pageSize }) => {
  const columns = [
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
    {
      field: "update",
      headerName: "Update",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateModalOpen(params.row)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <DataGrid rows={petList} columns={columns} pageSize={pageSize} autoHeight />
  );
};

export default DoctorPetGrid;
