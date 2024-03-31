import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const OwnerPetGrid = ({ petList, pageSize }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Link to={`/owner/owner/pets/${params.row.id}`}>{params.row.name}</Link>
      ),
    },
    { field: "type", headerName: "Type", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "dob", headerName: "DOB", width: 200 },
  ];

  return (
    <DataGrid rows={petList} columns={columns} pageSize={pageSize} autoHeight />
  );
};

export default OwnerPetGrid;
