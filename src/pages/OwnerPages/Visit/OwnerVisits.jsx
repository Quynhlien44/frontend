import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import visitApi from "../../../services/visitApi";
import { PageHeader } from "../../../components";

const OwnerVisit = () => {
  const [visitList, setVisitList] = useState([]);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const res = await visitApi.getAll();
        const transformedVisitList = res.map((visit) => ({
          id: visit.id,
          petId: visit.petId,
          date: visit.date,
          comment: visit.comment,
        }));
        setVisitList(transformedVisitList);
      } catch (err) {
        console.log(err);
      }
    };
    getVisits();
  }, [visitList]);

  return (
    <React.Fragment>
      <PageHeader title="Visits List Of All Pets" />
      <DataGrid
        rows={visitList}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "petId", headerName: "PetID", width: 150 },
          { field: "date", headerName: "Visit Date", width: 200 },
          { field: "comment", headerName: "Comment", width: 200 },
        ]}
        autoHeight
      />
    </React.Fragment>
  );
};

export default OwnerVisit;
