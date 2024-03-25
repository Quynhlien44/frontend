import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import bgImage from '../assets/img/login-bg.jpg';
import PetsIcon from '@mui/icons-material/Pets';


const ClinicLayout = () => {
    const navigate = useNavigate();


    const DoctorButtonHandler = () => {
        navigate('/doctor');
    }

    const OwnerButtonHandler = () => {
        navigate('/owner');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                height: '100vh',
                background: `url(${bgImage}) right / cover no-repeat`,
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                }}
            >
                <Box
                    sx={{
                        dispay: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        margin: 'auto',
                        padding: '5rem 1rem',
                        height: '100%',
                        width: '100%',
                        maxWidth: '400px',
                        '& .MuiTextField-root': { mb: 5 },
                    }}
                >
                    <Typography variant="h5" textAlign="center" mb="4rem" fontWeight="700">
                        <PetsIcon sx={{ color: 'green', marginRight: '10px' }} />
                        PET CLINIC
                    </Typography>
                    <LoadingButton
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ marginTop: '1rem' }}
                        onClick={DoctorButtonHandler}
                    >
                        Doctor
                    </LoadingButton>
                    <LoadingButton
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ marginTop: '1rem' }}
                        onClick={OwnerButtonHandler}
                    >
                        Owner
                    </LoadingButton>
                </Box>
            </Card>
        </Box>
    );
};

export default ClinicLayout;