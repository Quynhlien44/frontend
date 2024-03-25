import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid} from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import visitApi from '../services/visitApi';
import { PageHeader } from '../components';
import { useNavigate } from 'react-router-dom';

const Visit = () => {
  const [visitList, setVisitList] = useState([]);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const res = await visitApi.getAll();
        const transformedVisitList = res.map(visit => ({
          id: visit.id,
          petId: visit.petId,
          date: visit.date,
          comment: visit.comment
        }));
        setVisitList(transformedVisitList);
      } catch(err) {
        console.log(err);
      }
    };
    getVisits();
  }, []);

  const navigate = useNavigate();

  const VisitCreateButtonHandler = () => {
    navigate('/doctor/doctor/visits/create');
  }

  return (
    <React.Fragment>
      <PageHeader title='Visits List'/>
      <DataGrid
        rows={visitList}
        columns={[
          { field: 'id', headerName: 'ID', width: 100 },
          { field: 'petId', headerName: 'PetID', width: 150 },
          { field: 'date', headerName: 'Visit Date', width: 200 },
          { field: 'comment', headerName: 'Comment', width: 200 },
        ]}
        autoHeight
      />
            <Grid container justifyContent="flex" alignItems="right" marginBottom={2}>
        <LoadingButton
          variant="contained"
          fullWidth
          size="small"
          sx={{ marginTop: '1rem' }}
          onClick={VisitCreateButtonHandler}
        >
          Create
        </LoadingButton>
      </Grid>
    </React.Fragment>
  )
}

export default Visit;